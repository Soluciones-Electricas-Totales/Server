import Organization from '../../models/Organization.js';

const getProductsByOrganization = async (req, res) => {
    try {
        const { organizationId } = req.params;
        console.log(organizationId);

        const organization = await Organization.findById(organizationId)
            .populate({
                path: 'products',
                select: 'name description price time createdAt', // Campos a incluir
                options: { sort: { createdAt: -1 } } // Ordenar por fecha descendente
            });
        console.log(organization);

        const isOwner = req.user._id.equals(organization.owner);

        if (!organization) {
            return res.status(404).json({
                success: false,
                error: 'Organización no encontrada'
            });
        }

        if (!isOwner) {
            return res.status(403).json({
                success: false,
                error: 'unauthorized'
            });
        }
        console.log("llega");

        res.json({
            success: true,
            count: organization.products.length,
            data: organization.products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener products',
            error: error.message
        });
    }
};

export default getProductsByOrganization;