class Player {
  constructor(name) {
    this.name = name;
  }
  get playerName() {
    return this.name;
  }
};

module.exports = Player;
