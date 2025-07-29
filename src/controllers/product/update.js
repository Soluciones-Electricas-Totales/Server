import Product from '../../models/Product.js';

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const producto = await Product.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true } // Devuelve el documento actualizado y valida
        );

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Producto actualizado',
            data: producto
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar producto',
            error: error.message
        });
    }
};

export default updateProduct;