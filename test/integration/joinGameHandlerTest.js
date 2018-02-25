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

  describe("## /game/TICTACTOE1234/hasPlayerJoined",()=>{
    it("should get true if all players are joined",done=>{
      request(app)
      .get('/game/TICTACTOE1234/hasPlayerJoined')
      .expect('{"start":false,"link":"/game/TICTACTOE1234"}')
      .end(done);
    });
  });
  describe("## /game/join",()=>{
    it("should get the landing page for invalid game ID",done=>{
      request(app)
      .post("/game/join")
      .send("gameId=TICTACTOE12345")
      .expect(302)
      .redirectsTo('/land')
      .end(done);
    });
    it("should get the enrlling form for valid game ID",done=>{
      request(app)
      .post("/game/join")
      .send("gameId=TICTACTOE1234")
      .expect(302)
      .redirectsTo('/game/TICTACTOE1234/join')
      .end(done);
    });
  });
  describe("## /game/TICTACTOE1234/join",()=>{
    it("should get the enrolling form for the user",done=>{
      request(app)
      .get("/game/TICTACTOE1234/join")
      .expect(200)
      .expect(/TIC TAC TOE/)
      .expect(/<title>Enrolling Form/)
      .expect(/Name/)
      .end(done);
    });
    it("should redirect to the landing page fot invalid gameId",done=>{
      request(app)
      .get("/game/TICTACTOE12345/join")
      .expect(302)
      .cookie.include('invalidGameId','Enter%20validate%20Game%20ID%20to%20join%20game')
      .end(done);
    });
  });
});
