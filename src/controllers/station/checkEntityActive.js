import Station from '../../models/Station.js';

const checkStationInstallationAndOrganizationActive = async (req, res, next) => {
    try {
        const { stationId } = req.body;

        if (!stationId) {
            return res.status(400).json({ message: 'Se requiere el ID de la estación.' });
        }

        const station = await Station.findById(stationId).populate({
            path: 'installation',
            populate: {
                path: 'organization',
                model: 'Organization'
            }
        });

        if (!station) {
            return res.status(404).json({ message: 'Estación no encontrada.' });
        }

        const installation = station.installation;
        const organization = installation?.organization;

        if (installation?.status !== 'active') {
            return res.status(403).json({ message: 'La instalación está inactiva.' });
        }

        if (!organization || organization.status !== 'active') {
            return res.status(403).json({ message: 'La organización asociada está inactiva o no encontrada.' });
        }
        res.locals.station = station
        // Si todo está bien, pasa al siguiente middleware o controlador
        next();
    } catch (error) {
        console.error('Error en checkStationInstallationAndOrganizationActive:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export default checkStationInstallationAndOrganizationActive;
