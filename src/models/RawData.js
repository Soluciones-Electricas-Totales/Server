import mongoose from "mongoose";

const rawDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: false,
    },
  ],
});

const RawData = mongoose.model("RawData", rawDataSchema);

export default RawData;
