import Purchase from '../../models/Purchase.js';
import Product from '../../models/Product.js';

const createPurchase = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id; // Assuming JWT auth

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        const purchase = await Purchase.create({
            user: userId,
            product: productId,
            status: 'unused',
            purchasePrice: product.price
        });

        res.status(201).json({
            success: true,
            data: purchase
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export default createPurchase;