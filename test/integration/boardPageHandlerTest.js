const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../app.js');
const gameIdGen = app.gameIdGenerator;
let games = app.games;
let number = 0;

describe("# App",()=>{
  beforeEach(done => {
    app.gameIdGenerator = ()=>{
      return ++number;
    }
    number = 0;
    request(app)
    .post("/game/joinGameCreator")
    .send("gameCreator=Bhanu")
    .end(done);
  });
  before(()=>{
    app.games = {};
  })

  after(() => {
    app.gameIdGenerator = gameIdGen;
    app.games = games;
  });
  describe("## GET /game/TICTACTOE1/2/hasPlayerJoined",()=>{
    it("should get true if all players are joined",done=>{
      request(app)
      .get('/game/TICTACTOE1/2/hasPlayerJoined')
      .expect('{"start":false,"link":"/game/TICTACTOE1"}')
      .end(done);
    });
  });
  describe("## GET /game/TICTACTOE1/2",()=>{
    it("should get the board page",done=>{
      request(app)
      .get("/game/TICTACTOE1/2")
      .expect(200)
      .expect(/TIC TAC TOE/)
      .end(done);
    });
  });
});
