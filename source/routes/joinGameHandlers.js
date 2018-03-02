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

const addPlayerToGame = function(req,res) {
  let player = req.body['gameJoiner'];
  let {gameId} = req.params;
  let game = req.app.games[gameId];
  let playerId = req.app.gameIdGenerator();
  game.addPlayer(player,playerId);
  let gameCookie = req.cookies[gameId];
  res.cookie(gameId,gameCookie+`joiner=${playerId}`);
  res.redirect(`/game/${gameId}/${playerId}`);
};

const varifyPlayerName = function(req,res,next) {
  let gameJoinerName = req.body['gameJoiner'];
  let {gameId} = req.params;
  let game = req.app.games[gameId];
  let players = game.getPlayers();
  let gameCreatorName = players[0].getName();
  let playerNamesEqual = gameCreatorName == gameJoinerName;
  if(!playerNamesEqual && players.length <= 1) {
    next();
  } else {
    res.cookie("invalidName","Enter valid name");
    res.redirect(`/game/${gameId}/join`);
  }
};

const getPlayers = function(cookie) {
  let returnObject = {};
  let players = cookie.split(';');
  let creator = players[0].split('=');
  let joiner = players[1].split('=');
  returnObject[creator[0]] = creator[1];
  returnObject[joiner[0]] = joiner[1];
  return returnObject;
};

const sendPlayerToBoardPage  = function(req,res,next) {
  let playerName = req.body['gameJoiner'];
  let {gameId} = req.params;
  let gameCookie = req.cookies[gameId]
  players = getPlayers(gameCookie);
  if(!players.joiner) {
    next();
  }
  else {
    res.setCookie('extraPlayer','Both players are already joined');
    res.redirect('/land');
    res.end();
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
  validateGameIdForJoiner,
  serveEnrollingForm: [validateGameId,serveEnrollingForm],
  addPlayerToGame: [
    validateGameId,
    verifyPlayer,
    sendPlayerToBoardPage,
    varifyPlayerName,
    addPlayerToGame
  ]
};
