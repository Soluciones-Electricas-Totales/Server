import Station from '../../models/Station.js';

const getStationByID = async (req, res) => {
    try {
        const { stationID } = req.params;

        const stations = await Station.findById(stationID)
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

export default getStationByID;