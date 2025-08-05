import Installation from '../../models/Installation.js';

const getInstallations = async (req, res) => {
    try {
        // 1. Parsear parámetros de consulta
        const {
            page = 1,
            limit = 10,
            sort = '-createdAt',
            status,
            organization,
            near, // formato: "longitud,latitud,radioEnMetros"
            search
        } = req.query;

        // 2. Crear objeto de consulta base
        let query = {};

        // 3. Aplicar filtros
        if (status) {
            query.status = status;
        }

        if (organization && mongoose.Types.ObjectId.isValid(organization)) {
            query.organization = organization;
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // 4. Filtro geográfico (cercanía)
        if (near) {
            const [lng, lat, radius] = near.split(',').map(parseFloat);

            if (!isNaN(lng) && !isNaN(lat) && !isNaN(radius)) {
                query.location = {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [lng, lat]
                        },
                        $maxDistance: radius
                    }
                };
            }
        }

        // 5. Ejecutar consulta con paginación
        const installations = await Installation.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            //.populate('owner', 'name email')
            .populate('organization', 'name');
        //.populate('products', 'name price');

        // 6. Obtener conteo total para paginación
        const total = await Installation.countDocuments(query);

        // 7. Enviar respuesta
        res.json({
            success: true,
            count: installations.length,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: installations
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export default getInstallations;