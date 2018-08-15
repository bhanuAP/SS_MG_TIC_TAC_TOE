class Player {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
  getName() {
    return this.name;
  }
  getRole() {
    return this.role;
  }
}

module.exports = Player;
