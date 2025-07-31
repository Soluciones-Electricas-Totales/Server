import Product from '../../models/Product.js';

const createProduct = async (req, res, next) => {
    try {
        const { name, description, time, price } = req.body;
        const { id } = req.params; // ID de la organización|instalacion
        const product = await Product.create({
            name,
            description: description || null, // Si no viene, se guarda como null
            belongsTo: {
                id: id,
                type: res.locals.setBelongsTo
            },
            time,
            price
        });

        res.locals.product = product;
        next();

        /*res.status(201).json({ // eliminado porque la unica forma de crear products es desde la organizacion o desde la instalacion
            success: true,
            message: 'Product creado exitosamente',
            data: product
        });*/

    } catch (error) {
        if (error.code === 11000) { // Error de duplicado (nombre único)
            return res.status(400).json({
                success: false,
                message: 'El nombre del product ya existe'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error al crear product',
            error: error.message
        });
    }
};

export default createProduct;