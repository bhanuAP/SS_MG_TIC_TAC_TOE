const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const logRequest = require('./source/utils/logger.js');
const createGameHandlers = require('./source/routes/createGameHandlers.js');
const joinGameHandlers = require('./source/routes/joinGameHandlers.js');
const utilityPageHandlers = require('./source/routes/utilityPageHandlers.js');

const app = express();

app.fs = fs;
app.games = {};

app.uniqueNumberGernerator = ()=> {
  return new Date().getTime();
};

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(logRequest);

app.get(['/','/land'],createGameHandlers.serveLandingPage);
app.post('/game/joinGameCreator',createGameHandlers.createGame);
app.get('/game/:gameId/shareGameId',utilityPageHandlers.serveSharingPage);
app.get('/game/:gameId/wait',utilityPageHandlers.serveWaitingPage);
app.get('/game/:gameId/hasPlayerJoined',joinGameHandlers.serveGamePage);
app.post('/game/join',joinGameHandlers.validateGameIdForJoiner);
app.get('/game/:gameId/join',joinGameHandlers.serveEnrollingForm);

app.use(express.static('public'));
module.exports = app;
