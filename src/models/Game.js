import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    nick: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        default: 0
    }
});

const gameSchema = new mongoose.Schema({
    isRunning: { type: Boolean, default: false },
    leaderboard: [playerSchema],
    form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
