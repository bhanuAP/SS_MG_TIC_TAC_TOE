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
    res.cookie('invalidGameId','Enter your name to create new game');
    res.redirect('/land');
  }
};

module.exports = {
  serveWaitingPage: [validateGameId,serveWaitingPage]
};
