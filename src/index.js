import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from "cors";

import createRawData from "./controllers/raw-data/create.js";
import { uploader } from "./lib/fileUtil.js";
import getAllRawData from "./controllers/raw-data/getAll.js";
import getAllQuestions from "./controllers/question/getAll.js";
import getAllForms from "./controllers/form/getAll.js";
import catchErrors from "./decorators/catchErrors.js";
import createQuestion from "./controllers/question/create.js";
import createForm from "./controllers/form/create.js";
import deleteAll from "./controllers/form/deleteAll.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  methods: '*',
}));
// parse application/json
app.use(bodyParser.json());

// MongoDB connection string (replace with your own or use the environment variable)
const mongoURI = process.env.MONGO_URI;
if(!mongoURI) {
  console.error(`mongoURI is undefined`)
  process.exit(1);
}

mongoose
  .connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Raw Info
app.get("/raw-data", catchErrors(getAllRawData));
app.post("/raw-data", uploader.single("text"), catchErrors(createRawData));

// Questions
app.post("/question", catchErrors(createQuestion));
app.get("/question", catchErrors(getAllQuestions));

// Forms:
app.get("/form", catchErrors(getAllForms));
app.post("/form", catchErrors(createForm));
app.delete("/form", catchErrors(deleteAll));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
