const Player = require('./player.js');

class Game {
  constructor() {
    this.players = [];
    this.numberOfPlayers = 2;
  }
  addPlayer(playerName) {
    this.players.push(new Player(playerName));
  }
  hasPlayersJoined() {
    return this.players == this.numberOfPlayers;
  }
};

module.exports = Game;
