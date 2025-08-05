import Activation from "../models/Activation.js";

export const updateActivationStatus = async (activationId, status) => {
    const activation = await Activation.findByIdAndUpdate(
        activationId,
        { status },
        { new: true }
    );

    if (!activation) {
        throw new Error('Activacion no encontrada');
    }

    return activation;
};