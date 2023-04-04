/**
 * Authors:
 * Wai Lok Siu(181742214),
 * Date: Mar 27, 2023
 *
 */

const request = require("supertest");
const app = require("../app");
const UserModel = require("../models/userModel");

// Test the /login path
describe("Test the /login path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/login");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /admin/dashboard", () => {
  it("responds with 200 and renders adminDashboard view", async () => {
    const agent = request.agent(app);
    // Log in as an admin user
    await agent.post("/login").send({ user: "william", password: "12345"});

    const response = await agent.get("/admin/dashboard");
    expect(response.status).toBe(200);
  });

  it("responds with 302 and redirects to login page when user is not authenticated", async () => {
    const response = await request(app).get("/admin/dashboard");
    expect(response.status).toBe(302);
    expect(response.header.location).toBe("/login");
  });

  it("responds with 302 and redirects to homepage when non-admin user is authenticated", async () => {
    const agent = request.agent(app);

    // Log in as a regular user
    await agent.post("/login").send({ user: "test", password: "12345" });

    const response = await agent.get("/admin/dashboard");
    expect(response.status).toBe(302);
    expect(response.header.location).toBe("/");
  });
});
