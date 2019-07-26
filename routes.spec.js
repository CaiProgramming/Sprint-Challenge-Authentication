const request = require("supertest");
const server = require("./api/server.js");

describe("GET jokes", () => {
  it("should return 401 with no jwt", () => {
    return request(server)
      .get("/api/jokes")
      .then(res => {
        expect(res.status).toBe(401);
      });
  });
});
describe("GET jokes", () => {
  it("should return JSON DATA", () => {
    return request(server)
      .get("/api/jokes")
      .then(res => {
        expect(res.type).toMatch(/json/);
        expect(res.type).toBe("application/json");
      });
  });
});
//////////////////////////////////////////////////
describe("post user", () => {
  it("should return 201 created if user isnt in database", () => {
    return request(server)
      .post("/api/register")
      .send({ username: "bobby", password: "password" })
      .set("Accept", "application/json")
      .then(res => {
        expect(res.status).toBe(201);
      });
  });
});
describe("post user", () => {
  it("should return JSON DATA", () => {
    return request(server)
      .post("/api/register")
      .send({ username: "bob", password: "password" })
      .set("Accept", "application/json")
      .then(res => {
        expect(res.type).toMatch(/json/);
        expect(res.type).toBe("application/json");
      });
  });
});
