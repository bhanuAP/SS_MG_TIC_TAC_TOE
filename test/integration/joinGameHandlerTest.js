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

  describe("## /game/join",()=>{
    it("should redirect to the landing page for invalid gameId",done=>{
      request(app)
      .post("/game/join")
      .send("gameId=TICTACTOE12345")
      .expect(302)
      .redirectsTo('/land')
      .end(done);
    });
    it("should get the joinGame option directly fo invalidGameId cookie",done=>{
      request(app)
      .post("/game/join")
      .send("gameId=TICTACTOE12345")
      .expect(302)
      .redirectsTo('/land')
      .end(()=>{
        request(app)
        .get("/land")
        .set('cookie',['invalidGameId=Enter validate Game ID to join game'])
        .expect(200)
        .end(done);
      });
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
  describe("## GET /game/TICTACTOE1234/join",()=>{
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
      let message = 'Enter%20validate%20Game%20ID%20to%20join%20game';
      request(app)
      .get("/game/TICTACTOE12345/join")
      .expect(302)
      .cookie.include('invalidGameId',message)
      .end(done);
    });
  });
  describe("## POST /game/TICTACTOE1234/join",()=>{
    it("should redirect to landingPage for invalid name",done=>{
      request(app)
      .post("/game/TICTACTOE12345/join")
      .send("gameJoiner=Teja")
      .expect(302)
      .redirectsTo('/land')
      .end(done);
    });
    it("should redirect to the enrolling form page for invalid name",done=>{
      request(app)
      .post("/game/TICTACTOE1234/join")
      .send("gameJoiner=")
      .expect(302)
      .redirectsTo('/game/TICTACTOE1234/join')
      .end(done);
    });
    it("should add player to game and redirect to board page for valid name",done=>{
      request(app)
      .post("/game/TICTACTOE1234/join")
      .send("gameJoiner=Teja")
      .expect(302)
      .redirectsTo('/game/TICTACTOE1234')
      .end(done);
    });
    it("should redirect to the enroll form if both player names are same",done=>{
      request(app)
      .post("/game/TICTACTOE1234/join")
      .send("gameJoiner=Bhanu")
      .cookie.include("invalidName",encodeURI("Enter valid name"))
      .expect(302)
      .redirectsTo('/game/TICTACTOE1234/join')
      .end(done);
    });
    it("should block the extra player to join game",done=>{
      request(app)
      .post("/game/TICTACTOE1234/join")
      .send("gameJoiner=Teja")
      .expect(302)
      .redirectsTo('/game/TICTACTOE1234')
      .end(()=>{
        request(app)
        .post("/game/TICTACTOE1234/join")
        .send("gameJoiner=Varma")
        .expect(302)
        .redirectsTo('/game/TICTACTOE1234/join')
        .end(done);
      });
    });
  });
});
