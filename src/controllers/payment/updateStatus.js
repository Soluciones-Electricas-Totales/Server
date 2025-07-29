import Payment from '../../models/Payment.js';

const updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, gatewayData } = req.body;

        const updateFields = { status };
        if (gatewayData) updateFields.gatewayData = gatewayData;
        if (status === 'paid') updateFields.processedAt = new Date();

        const payment = await Payment.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true }
        ).populate('purchase');

        if (!payment) {
            return res.status(404).json({
                success: false,
                error: 'Pago no encontrado'
            });
        }

        res.json({
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

export default updatePaymentStatus;