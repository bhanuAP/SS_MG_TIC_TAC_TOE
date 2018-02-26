const serveGamePage = function(req,res) {
  let {gameId} = req.params;
  let game = req.app.games[gameId];
  res.json({
    start : game.hasPlayersJoined(),
    link : `/game/${gameId}`
  });
};

const serveBoardPage = function(req,res) {
  let board = req.app.fs.readFileSync('./templates/board.html','utf8');
  res.type('html');
  res.send(board);
}

const printCookies = function(req,res,next) {
  console.log(`cookies are here ${req.cookies}`);
  next();
}

module.exports = {
  serveGamePage,
  serveBoardPage: [serveBoardPage]
}
