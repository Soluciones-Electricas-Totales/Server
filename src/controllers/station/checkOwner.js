import Station from "../../models/Station.js";

export const checkStationOwner = async (req, res, next) => {
    try {
        const { stationId } = req.params;
        const ownerId = req.user._id;

        // Buscar la estación y poblar la instalación con el owner
        const station = await Station.findById(stationId)
            .populate({
                path: 'installation',
                select: 'owner'
            });
        console.log(station);

        if (!station) {
            return res.status(404).json({
                success: false,
                message: 'Estación no encontrada'
            });
        }

        // Verificar si el usuario es el dueño de la instalación
        if (station.installation.owner.toString() !== ownerId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para eliminar esta estación'
            });
        }

        // Agregar la estación al request para uso posterior
        req.station = station;
        next();

    } catch (error) {
        console.error('Error en checkStationOwner:', error);
        res.status(500).json({
            success: false,
            message: 'Error del servidor al verificar permisos'
        });
    }
};