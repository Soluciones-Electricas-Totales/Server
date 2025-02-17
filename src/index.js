import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import createRawData from "./controllers/raw-data/create.js";
import { uploader } from "./lib/fileUtil.js";
import getAllRawData from "./controllers/raw-data/getAll.js";
import getAllQuestions from "./controllers/question/getAll.js";
import getAllForms from "./controllers/form/getAll.js";
import createQuestion from "./controllers/question/create.js";
import createForm from "./controllers/form/create.js";
import deleteAll from "./controllers/form/deleteAll.js";
import getById from "./controllers/form/getById.js";
import getByUserId from "./controllers/form/getByUserId.js";
import deleteFormById from "./controllers/form/deleteById.js";
import { createGame, getGameById, updateById, startGame, finishGame } from "./controllers/game/index.js";
import {socketioMiddleware, catchErrors} from "./decorators/index.js";
dotenv.config();

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  methods: '*',
}));
// parse application/json
app.use(bodyParser.json());

// MongoDB connection string (replace with your own or use the environment variable)
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error(`mongoURI is undefined`)
  process.exit(1);
}
// socket
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


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
app.get('/forms/:id', catchErrors(getById));
app.get("/forms/user/:userId", catchErrors(getByUserId));
app.post("/form", catchErrors(createForm));
app.delete("/form", catchErrors(deleteAll));
app.delete('/forms/:id', catchErrors(deleteFormById));

// Games
// app.use('/game', socketioMiddleware(io));
app.post("/game", catchErrors(createGame));
app.get("/game/:id", catchErrors(getGameById));
app.patch("/game/:id", catchErrors(updateById));
app.patch("/game/:id/start", catchErrors(startGame));
app.patch("/game/:id/finish", catchErrors(finishGame));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
