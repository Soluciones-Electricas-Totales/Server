import Installation from '../../models/Installation.js';

const updateInstallation = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const installation = await Installation.findByIdAndUpdate(
            id,
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!installation) {
            return res.status(404).json({
                success: false,
                error: 'Instalación no encontrada'
            });
        }

        res.json({
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

export default updateInstallation;