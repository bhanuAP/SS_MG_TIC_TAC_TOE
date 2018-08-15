const serveGamePage = function(req,res) {
  let {gameId} = req.params;
  let game = req.app.games[gameId];
  res.json({
    start : game.hasPlayersJoined(),
    link : `/game/${gameId}`
  });
};

const serveBoardPage = function(req,res) {
  let {gameId} = req.params;
  let playersRole = {'0': "creator", '1': "joiner"};
  let board = req.app.fs.readFileSync('./templates/board.html','utf8');
  let game = req.app.games[gameId];
  let cookie = req.cookies.game;
  let playerRoleCode = cookie.split("TICTACTOE")[0];
  let playerRole = playersRole[playerRoleCode];
  let playerName = game.getPlayerName(playerRole);

  board = board.replace('{{playerName}}', playerName);
  res.type('html');
  res.send(board);
};

module.exports = {
  serveGamePage,
  serveBoardPage: [serveBoardPage]
};
