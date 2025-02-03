import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  rawData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RawData",
    required: false,
  },
  options: [
    {
      text: {
        type: String,
        required: true,
      },
      isAnswer: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const QuestionSchema = mongoose.model("Question", questionSchema);

export default QuestionSchema;
