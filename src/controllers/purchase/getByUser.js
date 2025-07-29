import Purchase from '../../models/Purchase.js';

const getUserPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({ user: req.user._id })
            .populate('product')
            .sort('-purchaseDate');

        res.json({
            success: true,
            count: purchases.length,
            data: purchases
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export default getUserPurchases;