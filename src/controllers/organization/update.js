import Organization from '../../models/Organization.js';

const updateOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const userId = req.user._id;

        // Verify ownership before update
        const organization = await Organization.findOneAndUpdate(
            { _id: id, owner: userId },
            updates,
            { new: true, runValidators: true }
        );

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: 'Organization not found or you are not the owner'
            });
        }

        res.json({
            success: true,
            message: 'Organization updated successfully',
            data: organization
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update organization',
            error: error.message
        });
    }
};

export default updateOrganization;