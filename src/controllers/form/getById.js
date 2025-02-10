import Form from '../../models/Form.js';

const getById = async (req, res) => {
    const { id } = req.params;

    const form = await Form.findById(id).populate('questions');
    res.status(200).json({ form });
};

export default getById;