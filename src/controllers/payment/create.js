import Payment from '../../models/Payment.js';
import Purchase from '../../models/Purchase.js';

const createPayment = async (req, res) => {
    try {
        const { purchaseId, paymentGateway, gatewayData, amount, currency } = req.body;

        // Verificar que la compra exista
        const purchase = await Purchase.findById(purchaseId);
        if (!purchase) {
            return res.status(404).json({
                success: false,
                error: 'Compra no encontrada'
            });
        }

        const payment = await Payment.create({
            purchase: purchaseId,
            paymentGateway,
            gatewayData,
            amount,
            currency: currency || 'USD',
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            data: payment
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export default createPayment;