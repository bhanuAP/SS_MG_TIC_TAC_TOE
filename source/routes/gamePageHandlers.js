const serveGamePage = function(req,res) {
  let {gameId} = req.params;
  let {playerId} = req.params;
  let game = req.app.games[gameId];
  res.json({
    start : game.hasPlayersJoined(),
    link : `/game/${gameId}/${playerId}`
  });
};

const getPlayerName = function(req) {
  let {gameId} = req.params;
  let {playerId} = req.params;
  let game = req.app.games[gameId];
  return game.getPlayerName(playerId);
};

const serveBoardPage = function(req,res) {
  let board = req.app.fs.readFileSync('./templates/board.html','utf8');
  board = board.replace('{{playerName}}',getPlayerName(req));
  res.type('html');
  res.send(board);
};

module.exports = {
  serveGamePage,
  serveBoardPage: [serveBoardPage]
};
