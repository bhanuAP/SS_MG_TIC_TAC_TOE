const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const logRequest = require('./source/utils/logger.js');
const createGameHandlers = require('./source/routes/createGameHandlers.js');
const joinGameHandlers = require('./source/routes/joinGameHandlers.js');

const app = express();

app.fs = fs;
app.games = {};

app.gameIdGenerator = ()=> {
  return `TICTACTOE${new Date().getTime()}`;
};

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(logRequest);

app.get(['/','/land'],createGameHandlers.serveLandingPage);
app.post('/game/joinGameCreator',createGameHandlers.createGame);
app.get('/game/:gameId/shareGameId',createGameHandlers.serveSharingGamePage);
app.get('/game/:gameId/wait',joinGameHandlers.serveWaitingPage);

app.use(express.static('public'));
module.exports = app;
