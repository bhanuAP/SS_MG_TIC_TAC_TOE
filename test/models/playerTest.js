const Player = require('../../source/models/player.js');
const assert = require('chai').assert;

describe("# Player",()=>{
  describe("# player.getName",()=>{
    it("should get the name of the player",()=>{
      let name = "Bhanu";
      let role = "creator";
      let player = new Player(name, role);
      assert.equal(player.getName(), name);
    });
    it("should not get the role of the player",()=>{
      let name = "Bhanu";
      let role = "creator";
      let player = new Player(name, role);
      assert.notEqual(player.getName(), role);
    });
  });
  describe("# player.getRole",()=>{
    it("should get the role of the player",()=>{
      let name = "Bhanu";
      let role = "creator";
      let player = new Player(name, role);
      assert.equal(player.getRole(), role);
    });
    it("should not get the name of the player",()=>{
      let name = "Bhanu";
      let role = "creator";
      let player = new Player(name, role);
      assert.notEqual(player.getRole(), name);
    });
  });
});
