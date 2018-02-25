const serveGamePage = function(req,res) {
  let {gameId} = req.params;
  let game = req.app.games[gameId];
  res.json({
    start : game.hasPlayersJoined(),
    link : `/game/${gameId}`
  });
};

const serveEnrollingForm = function(req,res) {
  let {gameId} = req.params;
  let enrollingForm =
  req.app.fs.readFileSync('./templates/enrollingForm.html','utf8');
  enrollingForm = enrollingForm.replace('{{ID}}',gameId)
  .replace("{{invalidName}}",req.cookies.invalidName||'');
  res.type('html');
  res.send(enrollingForm);
}

const validateGameIdForJoiner = function(req,res) {
  let gameId = req.body['gameId'];
  if(req.app.games[gameId]) {
    res.redirect(`/game/${gameId}/join`);
    res.end();
  } else {
    res.cookie('invalidGameId','Enter validate Game ID to join game');
    res.redirect('/land');
  }
};

const validateGameId = function(req,res,next) {
  let {gameId} = req.params;
  if(req.app.games[gameId]) {
    next();
  } else {
    res.cookie('invalidGameId','Enter validate Game ID to join game');
    res.redirect('/land');
  }
};

module.exports = {
  serveGamePage,
  validateGameIdForJoiner,
  serveEnrollingForm: [validateGameId,serveEnrollingForm]
}
