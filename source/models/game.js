const Player = require('./player.js');

class Game {
  constructor() {
    this.players = [];
    this.numberOfPlayers = 2;
    this.roles = ["creator", "joiner"];
  }
  hasPlayersJoined() {
    return this.players.length == this.numberOfPlayers;
  }
  getRelaventPlayer(role) {
    return this.players.find(player => {
      return player.getRole() == role;
    });
  }
  getPlayerName(role) {
    let player = this.getRelaventPlayer(role);
    return player.getName();
  }
  validateRole(role) {
    return this.roles.includes(role);
  }
  addPlayer(playerName, role) {
    let validRole = this.validateRole(role);
    if(validRole) {
      let player = new Player(playerName, role);
      this.players.push(player);
    }
  }
}

module.exports = Game;
