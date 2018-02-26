const Player = require('./player.js');

class Game {
  constructor() {
    this.players = [];
    this.numberOfPlayers = 2;
  }
  getPlayers() {
    return this.players;
  }
  addPlayer(playerName) {
    this.players.push(new Player(playerName));
  }
  hasPlayersJoined() {
    return this.players.length == this.numberOfPlayers;
  }
  getPlayer(playerName) {
    return this.players.some(player=>{
      return player.getName() == playerName;
    });
  }
};

module.exports = Game;
