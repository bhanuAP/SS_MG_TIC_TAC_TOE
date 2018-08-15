const Game = require('../../source/models/game.js');
const assert = require('chai').assert;

describe("# Game",()=>{
  let game;
  beforeEach(()=>{
    game = new Game();
  });
  describe("# game.hasPlayersJoined",()=>{
    it("should return false if both the players are not joined",()=>{
      assert.isNotOk(game.hasPlayersJoined());
      game.addPlayer("Bhanu", "creatorRole");
      assert.isNotOk(game.hasPlayersJoined());
    });
    it("should return true if both players are joined",()=>{
      game.addPlayer("Bhanu", "creator");
      game.addPlayer("Teja", "joiner");
      assert.isOk(game.hasPlayersJoined());
    });
  });
  describe("# game.getRelaventPlayer",()=>{
    it("should get the player related to given role",()=>{
      let creatorRoleId = "creator";
      let joinerRoleId = "joiner";
      let creator = "Bhanu";
      let joiner = "Teja";
      game.addPlayer(creator, creatorRoleId);
      game.addPlayer(joiner, joinerRoleId);

      let player = game.getRelaventPlayer(creatorRoleId);
      let expectedPlayerName = player.getName();
      assert.equal(expectedPlayerName, creator);
    });
    it("should not get the player related to given role",()=>{
      let creatorRoleId = "creator";
      let joinerRoleId = "joiner";
      let creator = "Bhanu";
      let joiner = "Teja";
      game.addPlayer(creator, creatorRoleId);
      game.addPlayer(joiner, joinerRoleId);

      let player = game.getRelaventPlayer(creatorRoleId);
      let expectedPlayerName = player.getName();
      assert.notEqual(expectedPlayerName, joiner);
    });
  });
  describe("# game.getPlayerName",()=>{
    it("should get the player name related to given role",()=>{
      let creatorRoleId = "creator";
      let joinerRoleId = "joiner";
      let creator = "Bhanu";
      let joiner = "Teja";
      game.addPlayer(creator, creatorRoleId);
      game.addPlayer(joiner, joinerRoleId);

      let expectedPlayerName = game.getPlayerName(joinerRoleId);
      assert.equal(expectedPlayerName, joiner);
    });
    it("should not get the player name which is not related to role",()=>{
      let creatorRoleId = "creator";
      let joinerRoleId = "joiner";
      let creator = "Bhanu";
      let joiner = "Teja";
      game.addPlayer(creator, creatorRoleId);
      game.addPlayer(joiner, joinerRoleId);

      let expectedPlayerName = game.getPlayerName(joinerRoleId);
      assert.notEqual(expectedPlayerName, creator);
    });
  });
  describe("# game.validateRole",()=>{
    it("should return true for valid game role",()=>{
      let role = "creator";
      let validatedRole = game.validateRole(role);
      assert.isOk(validatedRole);
    });
    it("should return false for invalid game role",()=>{
      let role = "invalidRole";
      let validatedRole = game.validateRole(role);
      assert.isNotOk(validatedRole);
    });
  });
  describe("# game.addPlayer",()=>{
    it("should add player with valid role to game",()=>{
      let creatorRoleId = "creator";
      let creator = "Bhanu";
      game.addPlayer(creator, creatorRoleId);
      let expectedPlayerName = game.getPlayerName(creatorRoleId);
      assert.equal(expectedPlayerName, creator);
    });
    it("should not add player with valid role to game",()=>{
      let role = "invalidRole";
      let joinerRoleId = "joiner";
      let creator = "Bhanu";
      let joiner = "Teja";
      game.addPlayer(creator, role);
      game.addPlayer(joiner, joinerRoleId);
      assert.isNotOk(game.hasPlayersJoined());
    });
  });
});
