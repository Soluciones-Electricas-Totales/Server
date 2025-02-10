import Form from '../../models/Form.js';

const getByUserId = async (req, res) => {
    const { userId } = req.params;

    const forms = await Form.find({ userId: userId }).populate('questions');

    res.status(200).json({ forms });
};

export default getByUserId;