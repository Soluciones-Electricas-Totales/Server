import Organization from '../../models/Organization.js';

const getOrganizationsByUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const organizations = await Organization.find({ owner: userId })
            .sort('-createdAt');

        res.json({
            success: true,
            count: organizations.length,
            data: organizations
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch organizations',
            error: error.message
        });
    }
};

export default getOrganizationsByUser;