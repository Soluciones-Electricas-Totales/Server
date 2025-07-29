import Station from '../../models/Station.js';

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const station = await Station.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!station) {
            return res.status(404).json({
                success: false,
                error: 'Estación no encontrada'
            });
        }

        res.json({
            success: true,
            data: station
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export default updateStatus;