const assert = require('chai').assert;
const app = require('../../app.js');

describe('#uniqueNumberGernerator',()=>{
  it('should generate an id for game',()=>{
    let id = app.uniqueNumberGernerator();
    assert.closeTo(id,new Date().getTime(), 500);
  });
});
