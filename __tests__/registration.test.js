/**
 * Authors:
 * Yi-Sin Liou(175924216),
 * Date: Mar 27, 2023
 *
 */

const request = require("supertest");
const app = require("../app");


//  test the register path
describe("GET /register", () => {
  it("should return 200 OK and render the register view", async () => {
    const response = await request(app).get("/register");
    expect(response.statusCode).toBe(200);
  });
});


// test the password check
describe("POST /register", () => {

  it("should display an error message if password is too short", async () => {
    const res = await request(app).post("/register").send({
      username: "testuser",
      password: "123",
      re_password: "123",
      email: "test@example.com",
    });
    expect(res.status).toBe(200);
    expect(res.text).toContain("The length of password must be more than 4.");
  });

  it("should display an error message if passwords do not match", async () => {
    const res = await request(app).post("/register").send({
      username: "testuser",
      password: "password1",
      re_password: "password2",
      email: "test@example.com",
    });
    expect(res.status).toBe(200);
    expect(res.text).toContain(
      "The re-enter password must be the same as the password."
    );
  });


//test successful registration
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        password: 'password',
        re_password: 'password',
        email: 'testuser@example.com'
      });
    
    expect(res.status).toBe(200); // check if the status code is 200
    expect(res.redirect).toBe('/login');  // check if the user is redirected to the login page
    const newUser = await UserModel.findOne({ username: 'testuser' }); // check if the user is created in the database
    expect(newUser).toBeTruthy(); 
  });
});




