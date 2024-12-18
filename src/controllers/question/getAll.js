import Question from '../../models/Question.js';

const getAll = async (req, res) => {
  const questions = await Question.find();
  res.status(200).json({ questions });
};

export default getAll;
