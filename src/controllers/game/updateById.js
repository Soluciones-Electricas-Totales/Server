import Game from "../../models/Game.js";

const updateById = async (req, res) => {
  const { id } = req.params;
  const { playerId, nick, score } = req.body;

  const game = await Game.findById(id).populate("form");

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }

  const playerIndex = game.leaderboard.findIndex(player => player._id.toString() === playerId);

  if (playerIndex !== -1) {
    // Actualizar el score y/o nick del jugador existente
    if (score !== undefined) {
      game.leaderboard[playerIndex].score = score;
    }
    if (nick !== undefined) {
      game.leaderboard[playerIndex].nick = nick;
    }
  } else {
    return res.status(404).json({ message: "Player not found" });
  }

  await game.save();

  // Ordenar el leaderboard por score
  const sortedLeaderboard = game.leaderboard.sort((a, b) => b.score - a.score);

  // Notificar a los jugadores en el leaderboard que el juego ha actualizado
  const io = req.io;
  io.to(game.leaderboard.map(player => player.email)).emit('updateLeaderboard', { gameId: id, leaderboard: sortedLeaderboard });

  res.status(200).json({ game });
};

export default updateById;