import Payment from "../models/Payment.js";

export const updatePaymentStatus = async (paymentId, newStatus, gatewayResponse) => {
    const updatedPayment = await Payment.findByIdAndUpdate(
        paymentId,
        {
            $set: {
                status: newStatus,
                gatewayData: gatewayResponse,
                processedAt: new Date() // Fecha/hora actual
            }
        },
        { new: true }
    );

    if (!updatedPayment) {
        throw new Error('error actualizando no encontrada');
    }

    return updatedPayment;
};
