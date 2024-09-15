/** @format */
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index"); // Adjust this path as needed

// Use chai-http plugin
chai.use(chaiHttp);

// Assertions
const should = chai.should();

describe("User register API", function () {
  let userData = {
    name: "Avijit",
    username: "avijit_dev" + Math.floor(Math.random() * 1000),
    email: "avijit" + Math.floor(Math.random() * 1000) + "@example.com",
    password: "123",
  };

  // Test cases for successful registration
  it("Should register successfully new user", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/register")
      .send(userData)
      .end((error, res) => {
        res.should.have.status(201);
        res.body.should.have.an("object");
        res.body.should.have.property("status").eql(201);
        res.body.should.have.property("token");
        res.body.should.have.property("user");
        done();
      });
  });
});
