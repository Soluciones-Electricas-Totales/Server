import Installation from '../../models/Installation.js';

const createInstallation = async (req, res) => {
    try {
        const { name, coordinates } = req.body;
        const organizationId = req.params.organizationId;
        const ownerId = req.user._id;

        const installation = await Installation.create({
            name,
            organization: organizationId,
            owner: ownerId,
            location: {
                type: 'Point',
                coordinates
            }
        });

        res.status(201).json({
            success: true,
            data: installation
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export default createInstallation;