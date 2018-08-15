const serveEnrollingForm = function(req,res) {
  let {gameId} = req.params;
  let enrollingForm =
  req.app.fs.readFileSync('./templates/enrollingForm.html','utf8');
  enrollingForm = enrollingForm.replace('{{ID}}',gameId)
    .replace('{{ID}}',gameId)
    .replace("{{invalidName}}",req.cookies.invalidName||'');
  res.clearCookie('invalidName');
  res.type('html');
  res.send(enrollingForm);
};

const validateGameId = function(req,res) {
  let gameId = req.body['gameId'];
  if(req.app.games[gameId]) {
    res.redirect(`/game/${gameId}/join`);
    res.end();
  } else {
    res.cookie('invalidGameId','Enter validate Game ID to join game');
    res.redirect('/land');
  }
};

const verifyGameId = function(req,res,next) {
  let {gameId} = req.params;
  if(req.app.games[gameId]) {
    next();
  } else {
    res.cookie('invalidGameId','Enter validate Game ID to join game');
    res.redirect('/land');
  }
};

const addPlayerToGame = function(req,res) {
  let player = req.body['gameJoiner'];
  let {gameId} = req.params;
  let game = req.app.games[gameId];
  let cookie = "1" + gameId;
  res.cookie('game', cookie);
  game.addPlayer(player, "joiner");
  res.redirect(`/game/${gameId}`);
};

const verifyPlayerName = function(req,res,next) {
  let gameJoinerName = req.body['gameJoiner'];
  let {gameId} = req.params;
  let game = req.app.games[gameId];
  let creatorRole = "creator";
  let gameCreatorName = game.getPlayerName(creatorRole);
  let playerNamesEqual = gameCreatorName == gameJoinerName;
  if(!playerNamesEqual) {
    next();
  } else {
    res.cookie("invalidName","Enter valid name");
    res.redirect(`/game/${gameId}/join`);
  }
};

const verifyPlayersCount = function(req,res,next) {
  let playerName = req.body['gameJoiner'];
  let {gameId} = req.params;
  let game = req.app.games[gameId];
  if(req.cookies.game) {
    res.redirect(`/game/${gameId}/wait`);
    res.end();
  } else {
    next();
  }
};

const verifyPlayer = function(req,res,next) {
  let playerName = req.body['gameJoiner'];
  let {gameId} = req.params;
  if(playerName) {
    next();
  } else {
    res.cookie("invalidName","Enter valid name");
    res.redirect(`/game/${gameId}/join`);
  }
};

module.exports = {
  validateGameId,
  serveEnrollingForm: [verifyGameId,serveEnrollingForm],
  addPlayerToGame: [
    verifyGameId,
    verifyPlayer,
    verifyPlayersCount,
    verifyPlayerName,
    addPlayerToGame
  ]
};
