import Form from "../../models/Form.js";

const createForm = async (req, res) => {
  const name = req.body.name
  const userId = req.body.userId
  const questions = req.body.questions

  const form = await (await Form.create({
    name,
    userId,
    questions,
  })).populate("questions");

  res.status(201).json({ form: form });
};

export default createForm;
