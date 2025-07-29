import Activation from '../../models/Activation.js';

const startActivation = async (req, res) => {
    try {
        const { purchaseId, stationId } = req.body;

        const activation = await Activation.create({
            purchase: purchaseId,
            station: stationId
            // startTime y status se asignan automáticamente
        });

        res.status(201).json({
            success: true,
            data: activation
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export default startActivation;