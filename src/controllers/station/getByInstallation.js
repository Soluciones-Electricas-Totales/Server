import Station from '../../models/Station.js';

const getStationsByInstallation = async (req, res) => {
    try {
        const { installationId } = req.params;

        const stations = await Station.find({ installation: installationId })
            .sort('-createdAt')
            .populate('installation');

        res.json({
            success: true,
            count: stations.length,
            data: stations
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export default getStationsByInstallation;