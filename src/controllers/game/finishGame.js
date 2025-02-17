import Game from "../../models/Game.js";

const finishGame = async (req, res) => {
  const { id } = req.params;

  const game = await Game.findByIdAndUpdate(
    id,
    { isRunning: false },
    { new: true }
  ).populate("form");

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }

  // Notificar a los jugadores en el leaderboard que el juego ha finalizado
  const io = req.io;
  io.to(game.leaderboard).emit('gameStatus', { gameId: id });

  res.status(200).json({ game });
};

export default finishGame;