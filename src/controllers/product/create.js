import Product from '../../models/Product.js';

const createProduct = async (req, res) => {
    try {
        const { name, description, time, price } = req.body;

        const producto = await Product.create({
            name,
            description: description || null, // Si no viene, se guarda como null
            time,
            price
        });

        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente',
            data: producto
        });

    } catch (error) {
        if (error.code === 11000) { // Error de duplicado (nombre único)
            return res.status(400).json({
                success: false,
                message: 'El nombre del producto ya existe'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error al crear producto',
            error: error.message
        });
    }
};

export default createProduct;