const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../app.js');
const gameIdGen = app.gameIdGenerator;
let games=app.games;

describe("# App",()=>{
  beforeEach(() => {
    app.gameIdGenerator = () => {
      return "TICTACTOE1234";
    };
  });
  before(()=>{
    app.games = {};
  })

  after(() => {
    app.gameIdGenerator = gameIdGen;
    app.games = games;
  });
  describe("## GET /",()=>{
    it("should get the landing page of the game for /",done=>{
      request(app)
      .get("/")
      .expect(/Create Game/)
      .expect(/Join Game/)
      .expect(/Enter Your Name/)
      .expect(/Enter Game Id/)
      .end(done);
    });
  });
  describe("## GET /land",()=>{
    it("should get the landing page of the game for /land",done=>{
      request(app)
      .get("/land")
      .expect(/Create Game/)
      .expect(/Join Game/)
      .expect(/Enter Your Name/)
      .expect(/Enter Game Id/)
      .end(done);
    });
    it("should get the landing page of the game",done=>{
      request(app)
      .get("/")
      .expect(/Create Game/)
      .expect(/Join Game/)
      .expect(/Enter Your Name/)
      .expect(/Enter Game Id/)
      .end(()=>{
        request(app)
        .post("/game/joinGameCreator")
        .send("gameCreator=Bhanu")
        .redirectsTo("/game/TICTACTOE1234/shareGameId")
        .end(done);
      });
    });
    it("should redirect to the landing page for invalid Name",done=>{
      request(app)
      .get("/")
      .expect(/Create Game/)
      .end(()=>{
        request(app)
        .post("/game/joinGameCreator")
        .send("playerName=")
        .expect(302)
        .cookie.include("inavalidName","Enter%20valid%20name")
        .redirectsTo("/land")
        .end(done);
      })
    });
  });
  describe("## /game/joinGameCreator",()=>{
    it("should redirect to shareGameId page if the name is valid",done=>{
      request(app)
      .post("/game/joinGameCreator")
      .send("gameCreator=Bhanu")
      .redirectsTo("/game/TICTACTOE1234/shareGameId")
      .end(done);
    });
  });
  describe("## GET /game/TICTACTOE1234/shareGameId",()=>{
    it("should get the share gameId page",done=>{
      request(app)
      .get("/game/TICTACTOE1234/shareGameId")
      .expect(200)
      .expect(/Share Game Id/)
      .expect(/Game Id:/)
      .expect(/TICTACTOE1234/)
      .end(done);
    });
  });


  describe("## GET /game/TICTACTOE1234/wait",()=>{
    beforeEach(done=>{
      request(app)
      .get("/")
      .send("gameCreator=Bhanu")
      .end(done);
    });
    describe("### GET /game/TICTACTOE1234/shareGameId",()=>{
      it("should get the shareGameId page for valid gameGameId",done=>{
        request(app)
        .get("/game/TICTACTOE1234/shareGameId")
        .expect(200)
        .expect(/Share Game Id/)
        .expect(/Game Id:/)
        .expect(/TICTACTOE1234/)
        .end(done);
      });
      it("should get the landing page for invalid gameId",done=>{
        request(app)
        .get("/game/TICTACTOE12345/shareGameId")
        .expect(302)
        .redirectsTo("/land")
        .end(()=>{
          request(app)
          .get('/')
          .expect(200)
          .expect(/Create Game/)
          .expect(/Join Game/)
          .expect(/Enter Your Name/)
          .expect(/Enter Game Id/)
          .end(done);
        });
      });
    });
    describe("### GET /game/TICTACTOE1234/wait",()=>{
      it("should get the waiting page of the game",done=>{
        request(app)
        .get('/game/TICTACTOE1234/wait')
        .expect(/TIC TAC TOE/)
        .expect(/Please Wait.../)
        .expect(/please wait until your co-player joins the game TICTACTOE1234/)
        .end(done);
      });
      it("should redict to the landing page fot invalid game Id",done=>{
        request(app)
        request(app)
        .get('/game/TICTACTOE12345/wait')
        .expect(302)
        .redirectsTo("/land")
        .cookie.include('invalidGameId','Enter%20your%20name%20to%20create%20new%20game')
        .end(done);
      });
    });
  });
});
