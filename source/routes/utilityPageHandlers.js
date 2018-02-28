const serveSharingPage = function(req,res) {
  let {gameId} = req.params;
  let {playerId} = req.params;
  let sharingPage =
  req.app.fs.readFileSync('./templates/shareGameId.html','utf8');
  sharingPage =
  sharingPage.replace('{{gameId}}',gameId).replace('{{gameId}}',gameId)
  .replace('{{playerId}}',playerId);
  res.type('html')
  res.send(sharingPage);
};

const serveWaitingPage = function(req,res) {
  let {gameId} = req.params;
  let waitingPage =
  req.app.fs.readFileSync('./templates/waitingPage.html','utf8');
  waitingPage = waitingPage.replace('{{gameId}}',gameId);
  res.type('html');
  res.write(waitingPage);
  res.end();
};

const validateGameId = function(req,res,next) {
  let {gameId} = req.params;
  if(req.app.games[gameId]) {
    next();
  } else {
    res.cookie('createGame','Enter your name to create new game');
    res.redirect('/land');
  }
};

module.exports = {
  serveSharingPage: [validateGameId,serveSharingPage],
  serveWaitingPage: [validateGameId,serveWaitingPage]
}
