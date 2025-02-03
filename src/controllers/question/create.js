import RawData from "../../models/RawData.js";
import Question from "../../models/Question.js";

const createQuestion = async (req, res) => {
  const rawDataId = req.body.rawDataId;
  let questions = req.body.questions;
  // const options = req.body.options;

  const rawData = await RawData.findById(rawDataId);

  // if (!rawData) {
  //   res.status(404).json({ message: "RawData not found." });
  //   return
  // }

  questions = questions.map((question) => ({
    ...question,
    rawData: rawData?._id ?? undefined,
  }));

  const questionsResult = await Question.insertMany(questions);

  if (rawData) {
    await RawData.findByIdAndUpdate(rawDataId, {
      $push: { questions: questionsResult.map(({ _id }) => _id) },
    });
  }

  res.status(201).json({ questions: questionsResult });
};

export default createQuestion;
