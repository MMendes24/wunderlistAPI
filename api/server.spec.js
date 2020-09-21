const request = require("supertest")

const server = require("./server")

const db = require("../database/dbconfig")

let token = ""

describe("user-router", () => {
  describe("post register", () => {
    beforeEach(async () => {
      await db("users").truncate()
    })

    it("should return 201 with correct user credentials", () => {
      return request(server)
        .post("/api/users/register")
        .send({
          username: "one",
          password: "one111",
          name: "jacobff",
          email: "jacobff@abc.com",
          role: 1,
        })
        .then((res) => {
          expect(res.status).toBe(201)
        })
    })
  })

  it("should added user to the db", () => {
    return request(server)
      .post("/api/users/register")
      .send({
        username: "two",
        password: "two222",
        name: "jacobff2",
        email: "jacobff2@abc.com",
        role: 1,
      })
      .then((res) => {
        expect(res.body.data.username).toBe("two")
      })
  })

  describe("login", () => {
    it("user should be able to login", () => {
      return request(server)
        .post("/api/users/login")
        .send({ username: "one", password: "one111" })
        .then((res) => {
          expect(res.status).toBe(200)
        })
    })
    it("user should be able to login", () => {
      return request(server)
        .post("/api/users/login")
        .send({ username: "one", password: "one111" })
        .then((res) => {
          expect(res.body.message).toBe("welcome back")
          token = res.body.token
        })
    })
  })

  describe("get users list", () => {
    it("should not be able to get users without token", () => {
      return request(server)
        .get("/api/users")
        .then((res) => {
          expect(res.status).toBe(401)
        })
    })
    it("should be able to get users with token", () => {
      return request(server)
        .get("/api/users")
        .set({ Authorization: token })
        .then((res) => {
          expect(res.status).toBe(200)
        })
    })
  })
})
