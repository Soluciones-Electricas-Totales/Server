import Form from "../../models/Form.js";

const deleteAll = async (req, res) => {
  await Form.deleteMany({});
  res.status(201).json({});
};

export default deleteAll;
