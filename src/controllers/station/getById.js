import Station from '../../models/Station.js';

const getStationByID = async (req, res) => {
    try {
        const { stationID } = req.params;

        const stations = await Station.findById(stationID)
            .populate('installation');

        if (!stations) {
            return res.status(404).json({
                success: false,
                message: 'Estacion no encontrada'
            });
        }

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