const Game = require('../models/game.js');

const serveLandingPage = function(req,res) {
  landingPage = req.app.fs.readFileSync('./templates/landingPage.html','utf8');
  landingPage = landingPage.replace('{{default}}',"create")
  .replace('{{INVALIDNAME}}',req.cookies.inavalidName||"")
  .replace('{{EnterName}}',req.cookies.invalidGameId||"");
  res.clearCookie('inavalidName');
  res.clearCookie('invalidGameId');
  res.type('html');
  res.send(landingPage);
};

const createGameAndJoinCreator = function(req,res) {
  let player = req.body['gameCreator'];
  let game = new Game();
  let gameId = req.app.gameIdGenerator();
  game.addPlayer(player);
  req.app.games[gameId] = game;
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
