import { updateStationStatus } from '../../lib/updateStationStatus.js';

export const setInUse = async (req, res) => {
    try {
        const { stationId } = req.body;
        const inUse = res.locals.inUse; // { inUse: true } o { inUse: false }

        const station = await updateStationStatus(stationId, inUse);

        res.status(200).json({
            message: `Estación ${station.inUse ? 'en uso' : 'liberada'}`,
            station
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la estación', details: error.message });
    }
};