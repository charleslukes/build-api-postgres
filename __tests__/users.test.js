process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const admin = require("../controllers/admin");
const bcrypt = require("bcrypt");

let auth = {};

beforeAll(async () => {
  await db.query(
    `CREATE TABLE users (id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, 
    isAdmin TEXT DEFAULT false)`
  );
});

beforeEach(async () => {
  const hashedPassword = await bcrypt.hash("secret", 10);
  await db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    ["Williams", hashedPassword]
  );

  await admin("Mary", "1234abc");

  const response = await request(app)
    .post("/api/users/login")
    .send({
      username: "Mary",
      password: "1234abc"
    });

  const response2 = await request(app)
    .post("/api/users/login")
    .send({
      username: "Williams",
      password: "secret"
    });

  auth.adminToken = response.body.token;
  auth.userToken = response2.body.token;
});

afterEach(async () => {
  await db.query("DELETE FROM users");
});

afterAll(async () => {
  await db.query("DROP TABLE users");
  db.end();
});

//login
describe("GET /api/users", () => {
  test("It responds with the users in the db", async () => {
    const response = await request(app)
      .get("/api/users/")
      .set("authorization", auth.adminToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("username");
  });
});

describe("GET /api/users/:id", () => {
  test("It responds with a specify user", async () => {
    const response = await request(app)
      .get("/api/users/1")
      .set("authorization", auth.adminToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /api/users/", () => {
  test("It responds with a created user", async () => {
    const response = await request(app)
      .post("/api/users/")
      .send({
        username: "John",
        password: "abc123"
      });
    expect(response.statusCode).toBe(201);
  });
});

describe("PATCH /api/users/:id", () => {
  test("It responds with an updated user", async () => {
    //create the user
    const response = await request(app)
      .post("/api/users/")
      .send({
        username: "Johnny",
        password: "john123"
      });

    //updated the user
    const updateUser = await request(app)
      .patch("/api/users/1")
      .set("authorization", auth.userToken)
      .send({
        username: "JayJay",
        password: "forever"
      });
    expect(updateUser.statusCode).toBe(200);
  });
});

describe("DELETE /api/users/:id", () => {
  test("It responds with deleted", async () => {
    //create the user
    const response = await request(app)
      .post("/api/users/")
      .send({
        username: "Johnny",
        password: "john123"
      });

    //updated the user
    const deleteUser = await request(app)
      .delete("/api/users/1")
      .set("authorization", auth.userToken);
    expect(deleteUser.statusCode).toBe(204);
  });
});
