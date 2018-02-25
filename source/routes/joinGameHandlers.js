const serveWaitingPage = function(req,res) {
  let {gameId} = req.params;
  let waitingPage =
  req.app.fs.readFileSync('./templates/waitingPage.html','utf8');
  waitingPage = waitingPage.replace('{{gameId}}',gameId);
  res.type('html');
  res.write(waitingPage);
}

module.exports = {
  serveWaitingPage
}
