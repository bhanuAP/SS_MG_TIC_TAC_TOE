const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../app.js');
const gameIdGen = app.gameIdGenerator;

describe("# App",()=>{
  beforeEach(() => {
    app.gameIdGenerator = () => {
      return "TICTACTOE1234";
    };
  });

  after(() => {
    app.gameIdGenerator = gameIdGen;
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
        .cookie.include("InavalidName","Enter%20valid%20name")
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
});
