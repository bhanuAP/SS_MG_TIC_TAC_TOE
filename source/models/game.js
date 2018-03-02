const Player = require('./player.js');

class Game {
  constructor() {
    this.players = [];
    this.numberOfPlayers = 2;
  }
  getPlayers() {
    return this.players;
  }
  addPlayer(name,Id) {
    this.players.push(new Player(name,Id));
  }
  hasPlayersJoined() {
    return this.players.length == this.numberOfPlayers;
  }
  getPlayer(playerName) {
    return this.players.some(player=>{
      return player.getName() == playerName;
    });
  }
  getPlayerName(id) {
    let player = this.players.filter(player=>{
      return player.getId() == id;
    });
    return player[0].name;
  };
};

module.exports = Game;
