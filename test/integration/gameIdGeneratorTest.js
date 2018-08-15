const assert = require('chai').assert;
const app = require('../../app.js');

describe('#uniqueNumberGen',()=>{
  it('should generate an id for game',()=>{
    let id = app.uniqueNumberGen();
    assert.closeTo(id,new Date().getTime(), 500);
  });
});
