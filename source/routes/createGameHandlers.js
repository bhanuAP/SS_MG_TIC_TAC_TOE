const Game = require('../models/game.js');

const serveLandingPage = function(req,res) {
  let fs = req.app.fs;
  let landingPage = fs.readFileSync('./templates/landingPage.html','utf8');
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

const joinGameCreator = function(req,res) {
  let game = new Game();
  let player = req.body['gameCreator'];
  let randomNumber = req.app.uniqueNumberGen();
  game.addPlayer(player, "creator");
  let gameId = `TICTACTOE${randomNumber}`;
  req.app.games[gameId] = game;
  let cookie = "0" + gameId;
  res.cookie('game', cookie);
  res.redirect(`/game/${gameId}/shareGameId`);
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
  createGame: [verifyPlayerName, joinGameCreator]
};
