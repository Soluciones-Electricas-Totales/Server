import Form from "../../models/Form.js";

const createForm = async (req, res) => {
  const name = req.body.name
  const questions = req.body.questions

  const form = await Form.create({
    name,
    questions,
  });


  res.status(201).json({ form });
};

export default createForm;
