import Product from '../../models/Product.js';
import Organization from '../../models/Organization.js';
import Installation from '../../models/Installation.js';

const checkEntityActive = async (req, res, next) => {
    try {
        const { productId } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Producto no encontrado'
            });
        }

        const { type, id } = product.belongsTo;

        if (type === 'Organization') {
            const organization = await Organization.findById(id);
            if (!organization) {
                return res.status(404).json({
                    success: false,
                    error: 'Organización no encontrada'
                });
            }
            if (organization.status !== 'active') {
                return res.status(403).json({
                    success: false,
                    error: 'La organización está inactiva'
                });
            }
        }

        else if (type === 'Installation') {
            const installation = await Installation.findById(id);
            if (!installation) {
                return res.status(404).json({
                    success: false,
                    error: 'Instalación no encontrada'
                });
            }
            if (installation.status !== 'active') {
                return res.status(403).json({
                    success: false,
                    error: 'La instalación está inactiva'
                });
            }

            const org = await Organization.findById(installation.organization); // Suponiendo que Installation tiene un campo organization
            if (!org) {
                return res.status(404).json({
                    success: false,
                    error: 'La organización asociada a la instalación no existe'
                });
            }
            if (org.status !== 'active') {
                return res.status(403).json({
                    success: false,
                    error: 'La organización asociada a la instalación está inactiva'
                });
            }
        }

        else {
            return res.status(400).json({
                success: false,
                error: 'Tipo de entidad en belongsTo no válido'
            });
        }

        next(); // Todo bien, continuar
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error al verificar estado de la entidad',
            details: error.message
        });
    }
};

export default checkEntityActive;
