const Player = require('./player.js');

class Game {
  constructor() {
    this.players = [];
  }
  addPlayer(playerName) {
    this.players.push(new Player(playerName));
  }
};

module.exports = Game;
