/**
 * Authors:
 * Feiliang Zhou(102661220)
 * Date: Mar 27, 2023
 *
 */

const request = require("supertest");
const app = require("../app");
const { getGameDetails, getRelatedGames } = require("../routes/gamesDetail");

// Test the game details path
describe("get /game/:id", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("getGameDetails() function", () => {
  test("It should return null for an invalid game ID", async () => {
    const response = await getGameDetails("test");

    expect(response).toBeNull();
  });
});

describe("getRelatedGames() function", () => {
  test("It should return 4 game objects", async () => {
    const response = await getRelatedGames();

    expect(response.length).toEqual(4);
  });
});

describe("post /postReview", () => {
  test("It should return 4 game objects", async () => {
    const response = await await request(app).post("/postReview").send({
      username: "test",
      message: "It is a great game, I love it.",
    });

    expect(response.statusCode).toBe(200);
  });
});

describe("search button click", () => {
  test("It should return 4 game objects", async () => {
    const response = await await request(app).post("/postReview").send({
      username: "test",
      message: "It is a great game, I love it.",
    });

    expect(response.statusCode).toBe(200);
  });
});
