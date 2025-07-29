import Product from '../../models/Product.js';

const getProducts = async (req, res) => {
    try {
        const { limite = 100, desde = 0 } = req.query;

        const [total, products] = await Promise.all([
            Product.countDocuments(),
            Product.find()
                .skip(Number(desde))
                .limit(Number(limite))
                .select('-__v') // Excluye el campo __v
        ]);

        res.json({
            success: true,
            total,
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener products',
            error: error.message
        });
    }
};

export default getProducts;