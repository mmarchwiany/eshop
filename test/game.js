let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Games", () => {
  describe("/GET game", () => {
    it("it should by default get 10 games", done => {
      chai
        .request(server)
        .get("/games")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.meta.page.should.be.eql(0);
          res.body.meta.page_size.should.be.eql(10);
          res.body.games.length.should.be.eql(10);
          done();
        });
    });
    it("it should get 5 games", done => {
      chai
        .request(server)
        .get("/games?page_size=5")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.meta.page.should.be.eql(0);
          res.body.meta.page_size.should.be.eql(5);
          res.body.games.length.should.be.eql(5);
          done();
        });
    });
    it("it should get 401 response if page_size = 0", done => {
      chai
        .request(server)
        .get("/games?page_size=0")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
