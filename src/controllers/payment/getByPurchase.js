import Payment from '../../models/Payment.js';

const getPaymentsByPurchase = async (req, res) => {
    try {
        const { purchaseId } = req.params;

        const payments = await Payment.find({ purchase: purchaseId })
            .sort('-createdAt')
            .lean(); // Usar lean() para mejor performance

        res.json({
            success: true,
            count: payments.length,
            data: payments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export default getPaymentsByPurchase;