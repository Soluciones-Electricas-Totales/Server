import Installation from '../../models/Installation.js';

const getInstallationsByOrganization = async (req, res) => {
    try {
        const { organizationId } = req.params;
        const ownerId = req.user._id;
        
        const installations = await Installation.find({
            organization: organizationId,
            owner: ownerId
        }).sort('-createdAt');

        res.json({
            success: true,
            count: installations.length,
            data: installations
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export default getInstallationsByOrganization;