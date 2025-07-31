import Station from '../../models/Station.js';

export const checkStationInUse = async (req, res, next) => {
    try {
        const { stationId } = req.body;

        const station = await Station.findById(stationId);
        if (!station) {
            return res.status(404).json({ error: 'Estación no encontrada' });
        }

        if (station.inUse) {
            return res.status(400).json({ error: 'La estación ya está en uso' });
        }

        // Si está libre, continúa con el siguiente middleware/ruta
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar la estación', details: error.message });
    }
};