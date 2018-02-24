const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../app.js');
const gameIdGen = app.gameIdGen;


describe("# App",()=>{
  beforeEach(() => {
    app.gameIdGenerator = () => {
      return 1234;
    };
  });

  after(() => {
    app.gameIdGenerator = gameIdGen;
  });
  describe("## GET /",()=>{
    it("should get the landing page of the games",done=>{
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
    it("should get the landing page of the games",done=>{
      request(app)
      .get("/land")
      .expect(/Create Game/)
      .expect(/Join Game/)
      .expect(/Enter Your Name/)
      .expect(/Enter Game Id/)
      .end(done);
    });
    it("should get the landing page of the games",done=>{
      request(app)
      .get("/")
      .expect(/Create Game/)
      .expect(/Join Game/)
      .expect(/Enter Your Name/)
      .expect(/Enter Game Id/)
      .end(()=>{
        request(app)
        .post("/game/joinGameCreator")
        .send("playerName=Bhanu")
        .redirectsTo("/game/1234/shareGameId")
        .end(done);
      });
    });
  });
});
