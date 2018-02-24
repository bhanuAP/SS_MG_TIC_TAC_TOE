const Game = require('../models/game.js');

const serveLandingPage = function(req,res) {
  landingPage = req.app.fs.readFileSync('./templates/landingPage.html','utf8');
  landingPage = landingPage.replace('{{default}}',"create");
  res.type('html');
  res.send(landingPage);
}

const verifyPlayerName = function(req,res,next) {
  let playerName = req.body['playerName'];
  if(!playerName) {
    res.cookie("InavalidName","Enter valid name");
    res.redirect('/land');
  } else {
    next();
  }
}

const createGameAndJoinCreator = function(req,res) {
  let player = req.body['playerName'];
  let game = new Game();
  let gameId = req.app.gameIdGenerator();
  game.addPlayer(player);
  req.app.games[gameId] = game;
  res.redirect(`/game/${gameId}/shareGameId`);
}

module.exports = {
  serveLandingPage,
  createGame: [verifyPlayerName,createGameAndJoinCreator]
}
