/**
 * Authors:
 * Yi-Sin Liou(175924216),
 * Date: Mar 27, 2023
 *
 */

const request = require("supertest");
const app = require("../app");

//  Test the root path (home)
describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

// Test the /about path
describe("Test the /about path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/about");
    expect(response.statusCode).toBe(200);
  });
});

// // Test the /contact path
describe("Test the /contact path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/contact");
    expect(response.statusCode).toBe(200);
  });
});


