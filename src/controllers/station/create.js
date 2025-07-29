import Station from '../../models/Station.js';

const createStation = async (req, res) => {
    try {
        const { installationId } = req.body;

        const station = await Station.create({
            installation: installationId
            // Status se asigna automáticamente como 'active'
        });

        res.status(201).json({
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

export default createStation;