import RawData from "../../models/RawData.js";
import Question from "../../models/Question.js";

const createQuestion = async (req, res) => {
  const rawDataId = req.body.rawDataId;
  const options = req.body.options;
  const text = req.body.text;

  const rawData = await RawData.findById(rawDataId);

  if (!rawData) {
    res.status(404).json({ message: "RawData not found." });
    return
  }

  const question = await Question.create({
    text,
    options,
    rawData: rawData._id
  });

  await RawData.findByIdAndUpdate(rawDataId, {
    $push: { questions: question._id },
  });

  res.status(201).json({ question });
};

export default createQuestion;
