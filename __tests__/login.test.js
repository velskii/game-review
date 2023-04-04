const request = require("supertest");
const app = require("../app");

describe("User Routes", () => {
  describe("GET /login", () => {
    it("should return 200 OK and render the login view", async () => {
      const response = await request(app).get("/login");
      expect(response.status).toBe(200);
      expect(response.text).toContain("Login");
    });
  });

  describe("GET /logout", () => {
    it("should reset the session and redirect to the homepage", async () => {
      const response = await request(app).get("/logout");
      expect(response.status).toBe(302);
      expect(response.header.location).toBe("/");
    });
  });

  describe("POST /login", () => {
    it("should return 200 OK and redirect to the dashboard for a successful login", async () => {
      const response = await request(app)
      .post("/login").send({
        username: "test",
        password: "12345",
      });
      expect(response.status).toBe(302);
      expect(response.header.location).toBe("/dashboard");
    });

    it("should return an error message for an incorrect password", async () => {
      const response = await request(app).post("/login").send({
        username: "ian",
        password: "incorrectpassword",
      });
      expect(response.status).toBe(302);
      expect(response.text).toContain("User credentials are incorrect! Password was incorrect");
    });

    it("should return an error message for an incorrect username", async () => {
      const response = await request(app).post("/login").send({
        username: "nonexistentuser",
        password: "testpassword",
      });
      expect(response.status).toBe(302);
      expect(response.text).toContain("User credentials are incorrect! Login was not found");
    });

    // it("should return an error message for missing login or password fields", async () => {
    //   const response = await request(app).post("/login").send({
    //     username: "",
    //     password: "",
    //   });
    //   expect(response.status).toBe(200);
    //   expect(response.type).toBe("text/html");
    //   expect(response.text).toContain("Both the login and password are required fields");
    // });
  });
});