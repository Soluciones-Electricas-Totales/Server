import mongoose from 'mongoose';
import Organization from '../../models/Organization.js';
import Installation from '../../models/Installation.js';

const softDeleteProduct = async (req, res, next) => {

    //try {
    //const { productId } = req.params;
    console.log("llega");


    const product = req.product;
    if (!product) {

        return res.status(404).json({
            success: false,
            message: 'Producto no encontrado'
        });
    }

    if (product.deleted) {

        return res.status(400).json({
            success: false,
            message: 'El producto ya ha sido eliminado'
        });
    }
    console.log(product);
    console.log("llega1");
    // Realizar soft delete


    console.log("llega2");

    let relationResult;
    if (product.belongsTo.type === 'Organization') {
        relationResult = await Organization.findByIdAndUpdate(
            product.belongsTo.id,
            { $pull: { products: product._id } }
        );
    } else if (product.belongsTo.type === 'Installation') {
        console.log("llega20");
        console.log(product);

        relationResult = await Installation.findByIdAndUpdate(
            product.belongsTo.id,
            { $pull: { products: product._id } }
        );
    }
    console.log("llega3");

    if (!relationResult) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar product',
            error: error.message
        });
    }

    product.deleted = true;
    const result = await product.save();
    console.log(result);

    if (!result) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar product',
            error: error.message
        });
    }

    res.json({
        success: true,
        message: 'Producto eliminado exitosamente',
        data: {
            id: product._id,
            name: product.name,
            deleted: product.deleted
        }
    });

    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: 'Error al eliminar product',
    //         error: error.message
    //     });
    // }
};

export default softDeleteProduct;