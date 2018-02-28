const Game = require('../models/game.js');

const serveLandingPage = function(req,res) {
  landingPage = req.app.fs.readFileSync('./templates/landingPage.html','utf8');
  landingPage = landingPage
  .replace('{{default}}',req.cookies.invalidGameId ? 'join' : 'create')
  .replace('{{INVALIDNAME}}',req.cookies.invalidName||"")
  .replace('{{CREATEGAME}}',req.cookies.createGame||"")
  .replace('{{INVALIDGAMEID}}',req.cookies.invalidGameId||"");
  res.clearCookie('invalidName');
  res.clearCookie('createGame');
  res.clearCookie('invalidGameId');
  res.type('html');
  res.send(landingPage);
};

const createGameAndJoinCreator = function(req,res) {
  let player = req.body['gameCreator'];
  let game = new Game();
  let gameId = req.app.gameIdGenerator();
  gameId = `TICTACTOE${gameId}`;
  let playerId = req.app.gameIdGenerator();
  game.addPlayer(player,playerId);
  req.app.games[gameId] = game;
  res.cookie(gameId,`creator:${playerId};`);
  res.redirect(`/game/${gameId}/${playerId}/shareGameId`);
};

const verifyPlayerName = function(req,res,next) {
  let playerName = req.body['gameCreator'];
  if(!playerName) {
    res.cookie("invalidName","Enter valid name");
    res.redirect('/land');
  } else {
    next();
  }
};

module.exports = {
  serveLandingPage,
  createGame: [verifyPlayerName,createGameAndJoinCreator]
};
