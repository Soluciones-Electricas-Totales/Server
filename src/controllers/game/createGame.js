
import Game from "../../models/Game.js";

const createGame = async (req, res) => {
  const {leaderboard, form } = req.body;

  const game = await Game.create({
    leaderboard,
    form,
  });

  res.status(201).json({ game });
};

export default createGame;