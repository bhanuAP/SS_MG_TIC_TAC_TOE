const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../app.js');
const gameIdGen = app.uniqueNumberGernerator;
let games=app.games;

describe("# App",()=>{
  beforeEach(done => {
    app.uniqueNumberGernerator = () => {
      return 1234;
    };
    request(app)
    .post("/game/joinGameCreator")
    .send("gameCreator=Bhanu")
    .end(done);
  });
  before(()=>{
    app.games = {};
  })

  after(() => {
    app.uniqueNumberGernerator = gameIdGen;
    app.games = games;
  });
  describe("## GET /game/TICTACTOE1234/hasPlayerJoined",()=>{
    it("should get true if all players are joined",done=>{
      request(app)
      .get('/game/TICTACTOE1234/hasPlayerJoined')
      .expect('{"start":false,"link":"/game/TICTACTOE1234"}')
      .end(done);
    });
  });
  describe("## GET /game/TICTACTOE1234",()=>{
    it("should get the board page",done=>{
      request(app)
      .get("/game/TICTACTOE1234")
      .expect(200)
      .expect(/TIC TAC TOE/)
      .end(done);
    });
  });
});
