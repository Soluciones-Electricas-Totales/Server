import Station from '../../models/Station.js';

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, inUse } = req.body;

        // Validar que al menos uno de los campos esté presente
        if (status === undefined && inUse === undefined) {
            return res.status(400).json({
                success: false,
                error: 'Se requiere al menos un campo para actualizar (status o inUse)'
            });
        }

        const updateFields = {};
        if (status !== undefined) updateFields.status = status;
        if (inUse !== undefined) updateFields.inUse = inUse;

        const station = await Station.findByIdAndUpdate(
            id,
            updateFields,
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