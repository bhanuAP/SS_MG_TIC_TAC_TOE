const Player = require('../../source/models/player.js');
const assert = require('chai').assert;

describe("# Player",()=>{
  let player;
  beforeEach(()=>{
    player = new Player("Bhanu");
  });
  describe("# player.Name",()=>{
    it("should get the player name of the player",()=>{
      assert.equal(player.getName(),"Bhanu");
    })
  });
});
