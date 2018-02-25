const Game = require('../models/game.js');

const serveLandingPage = function(req,res) {
  landingPage = req.app.fs.readFileSync('./templates/landingPage.html','utf8');
  landingPage = landingPage
  .replace('{{default}}',req.cookies.invalidGameId ? 'join' : 'create')
  .replace('{{INVALIDNAME}}',req.cookies.inavalidName||"")
  .replace('{{CREATEGAME}}',req.cookies.createGame||"")
  .replace('{{INVALIDGAMEID}}',req.cookies.invalidGameId||"");
  res.clearCookie('inavalidName');
  res.clearCookie('createGame');
  res.clearCookie('invalidGameId');
  res.type('html');
  res.send(landingPage);
};

const createGameAndJoinCreator = function(req,res) {
  let player = req.body['gameCreator'];
  let game = new Game();
  let gameId = req.app.uniqueNumberGernerator();
  gameId = `TICTACTOE${gameId}`;
  game.addPlayer(player);
  req.app.games[gameId] = game;
  res.cookie('player',player);
  res.redirect(`/game/${gameId}/shareGameId`);
};

const verifyPlayerName = function(req,res,next) {
  let playerName = req.body['gameCreator'];
  if(!playerName) {
    res.cookie("inavalidName","Enter valid name");
    res.redirect('/land');
  } else {
    next();
  }
};

module.exports = {
  serveLandingPage,
  createGame: [verifyPlayerName,createGameAndJoinCreator]
};
