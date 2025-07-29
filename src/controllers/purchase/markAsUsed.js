import Purchase from '../../models/Purchase.js';

const markAsUsed = async (req, res) => {
    try {
        const { id } = req.params;

        const purchase = await Purchase.findById(id);

        if (!purchase) {
            return res.status(404).json({ success: false, error: 'Purchase not found' });
        }

        purchase.usageDate = new Date();
        purchase.status = 'used';
        await purchase.save();

        if (!purchase) {
            return res.status(404).json({ success: false, error: 'Purchase not found' });
        }

        res.json({ success: true, data: purchase });

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export default markAsUsed;