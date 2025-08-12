import Payment from '../../models/Payment.js';
import mongoose from 'mongoose';

const checkPaymentStatus = async (req, res, next) => {
    try {
        const { purchaseId } = req.body;

        if (!purchaseId || !mongoose.Types.ObjectId.isValid(purchaseId)) {
            return res.status(400).json({
                success: false,
                message: 'ID de compra no válido o faltante'
            });
        }

        const payment = await Payment.findOne({ purchase: purchaseId });

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró ningún pago asociado a esta compra'
            });
        }

        if (payment.status === 'approved') {
            next();
        } else {
            return res.status(400).json({
                success: false,
                message: `El pago no está aprobado.`,
                payment
            });
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export default checkPaymentStatus;