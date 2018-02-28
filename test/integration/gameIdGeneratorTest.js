const assert = require('chai').assert;
const app = require('../../app.js');

describe('#gameIdGenerator',()=>{
  it('should generate an id for game',()=>{
    let id = app.gameIdGenerator();
    assert.closeTo(id,new Date().getTime(), 500);
  });
});
