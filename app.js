const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const createGameHandlers = require('./src/routes/createGameHandlers.js');

const app = express();

app.fs = fs;
app.games = {};

app.idGenerator = ()=>{
  return new Date().getTime();
};

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());


app.use(express.static('public'));
module.exports = app;
