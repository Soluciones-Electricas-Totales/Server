import Form from '../../models/Form.js';

const getAll = async (req, res) => {
  const forms = await Form.find();
  res.status(200).json({ forms });
};

export default getAll;
