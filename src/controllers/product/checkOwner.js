import Installation from "../../models/Installation.js";
import Organization from "../../models/Organization.js";
import Product from "../../models/Product.js";

export const checkProductOwner = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const ownerId = req.user._id;

        // Buscar la estación y poblar la instalación con el owner
        const product = await Product.findById(productId)

        console.log(product);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Estación no encontrada'
            });
        }

        let ownerEntity;

        if (product.belongsTo.type === "Installation") {
            ownerEntity = await Installation.findById(product.belongsTo.id);
        } else if (product.belongsTo.type === "Organization") {
            ownerEntity = await Organization.findById(product.belongsTo.id);
        } else {
            return res.status(500).json({
                success: false,
                message: 'Error del servidor al verificar permisos'
            });
        }

        if (!ownerEntity) {
            return res.status(404).json({
                success: false,
                message: 'Entidad no encontrada'
            });
        }

        // Verificar si el usuario es el dueño
        if (ownerEntity.owner.toString() !== ownerId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para eliminar esta estación'
            });
        }
        console.log(product);
        console.log(ownerEntity);


        // Agregar la estación al request para uso posterior
        req.product = product;
        next();

    } catch (error) {
        console.error('Error en checkProductOwner:', error);
        res.status(500).json({
            success: false,
            message: 'Error del servidor al verificar permisos'
        });
    }
};