import Game from "../../models/Game.js";

const getGameById = async (req, res) => {
  const { id } = req.params;

  const game = await Game.findById(id).populate("form");

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  
  // Ordenar el leaderboard por score
  const sortedLeaderboard = game.leaderboard.sort((a, b) => b.score - a.score);

  const io = req.io;
  io.to(game.leaderboard.map(player => player.email)).emit('updateLeaderboard', { gameId: id, leaderboard: sortedLeaderboard });

  res.status(200).json({ game });
};

export default getGameById;
