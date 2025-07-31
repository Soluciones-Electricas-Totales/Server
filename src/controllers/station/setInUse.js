import Station from '../../models/Station.js';

export const setInUse = async (req, res) => {
    try {
        const { stationId } = req.body;
        const inUse = res.locals.inUse; // { inUse: true } o { inUse: false }

        const station = await Station.findByIdAndUpdate(
            stationId,
            { inUse },
            { new: true } // Devuelve el documento actualizado
        );

        if (!station) {
            return res.status(404).json({ error: 'Estación no encontrada' });
        }

        res.status(200).json({
            message: `Estación ${station.inUse ? 'en uso' : 'liberada'}`,
            station
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la estación', details: error.message });
    }
};