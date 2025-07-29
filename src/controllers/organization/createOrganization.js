import Organization from '../../models/Organization.js';

const createOrganization = async (req, res) => {
    try {
        const { name } = req.body;
        const ownerId = req.user._id; // From JWT auth

        const organization = await Organization.create({
            name,
            owner: ownerId,
            status: 'active'
        });

        res.status(201).json({
            success: true,
            message: 'Organization created successfully',
            data: organization
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create organization',
            error: error.message
        });
    }
};

export default createOrganization;