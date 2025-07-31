import Organization from '../../models/Organization.js';

const addProductToOrganization = async (req, res) => {
    try {
        const { id } = req.params; // ID de la organización
        const product = res.locals.product;
        const userId = req.user._id;

        const organization = await Organization.findOneAndUpdate(
            { _id: id, owner: userId },
            { $addToSet: { products: product._id } }, // evita duplicados
            { new: true }
        ).populate('products');

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: 'Organización no encontrada o no eres el propietario'
            });
        }

        res.json({
            success: true,
            message: 'Productos agregados correctamente',
            data: organization
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al agregar productos a la organización',
            error: error.message
        });
    }
};

export default addProductToOrganization;
