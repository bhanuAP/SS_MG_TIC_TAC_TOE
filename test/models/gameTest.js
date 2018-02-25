const Game = require('../../source/models/game.js');
const assert = require('chai').assert;

describe("# Game",()=>{
  let game;
  beforeEach(()=>{
    game = new Game();
  });
  describe("# game.addPlayer",()=>{
    it("should get the players in game",()=>{
      assert.equal(game.getPlayers().length,0);
      assert.notEqual(game.getPlayers().length,1);
      game.addPlayer("Bhanu");
      assert.equal(game.getPlayers().length,1);
      assert.notEqual(game.getPlayers().length,0);
    });
  });
  describe("# game.hasPlayersJoined",()=>{
    it("should return false if both the players are not joined",()=>{
      assert.isNotOk(game.hasPlayersJoined());
      game.addPlayer("Bhanu");
      assert.isNotOk(game.hasPlayersJoined());
    });
    it("should return true if both players are joined",()=>{
      game.addPlayer("Bhanu");
      game.addPlayer("Teja");
      assert.isOk(game.hasPlayersJoined());
    });
  });
});
