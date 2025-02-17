import Game from "../../models/Game.js";

const createGame = async (req, res) => {
  const { leaderboard, form, title, description, isRunning } = req.body;

  try {
    const players = leaderboard.map(player => ({
      email: player.email,
      nick: player.nick,
      score: player.score || 0
    }));

    const game = await Game.create({
      leaderboard: players,
      form,
      title,
      description,
      isRunning: isRunning || false,
    });

    res.status(201).json({ game });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default createGame;