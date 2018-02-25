const serveGamePage = function(req,res) {
  let {gameId} = req.params;
  let game = req.app.games[gameId];
  res.json({
    start : game.hasPlayersJoined(),
    link : `/game/${gameId}`
  });
}

module.exports = {
  serveGamePage
}
