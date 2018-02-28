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
  game.addPlayer(player);
  // let creator = `creator=${req.cookies.player};`;
  // let joiner = `joiner=${player}`;
  gameIdCookie = req.cookies[gameId];
  console.log(`${req.cookies[gameId]};joiner=${player}`);
  // res.cookie(gameId,`${req.cookie.gameId};joiner=${player}`);
  // res.cookie('player',creator+joiner);
  res.redirect(`/game/${gameId}`);
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

const sendPlayerToBoardPage  = function(req,res,next) {
  // main thing happens here
  console.log(JSON.stringify(req.cookies));
  let playerName = req.body['gameJoiner'];
  let {gameId} = req.params;
  let game = req.app.games[gameId];
  let player = game.getPlayer(req.cookies.player);
  if(!player) {
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
