import Station from '../../models/Station.js';

const deleteStation = async (req, res) => {
    try {
        const { stationId } = req.params;
        const station = req.station;

        if (!station) {
            return res.status(404).json({
                success: false,
                message: 'Estación no encontrada o no tienes permisos'
            });
        }

        if (station.inUse) {
            return res.status(400).json({
                success: false,
                message: 'No se puede eliminar una estación en uso'
            });
        }

        const response = await Station.findByIdAndDelete(stationId);

        if (!response) {
            return res.status(500).json({
                success: false,
                message: 'Error'
            });
        }
        res.json({
            success: true,
            message: 'Estación eliminada exitosamente'
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export default deleteStation;