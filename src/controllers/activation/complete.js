import Activation from '../../models/Activation.js';

const completeActivation = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        /*const activation = await Activation.findByIdAndUpdate(
            id,
            {
                endTime: Date.now(),
                status: status
            },
            { new: true, runValidators: true }
        ).populate('purchase station');*/

        const activation = await Activation.findById(id);
        if (!activation) {
            return res.status(404).json({
                success: false,
                error: 'Activación no encontrada'
            });
        }

        activation.endTime = Date.now();
        activation.status = status;
        await activation.save();

        if (!activation) {
            return res.status(404).json({
                success: false,
                error: 'Activación no encontrada'
            });
        }

        res.json({
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

export default completeActivation;