//#region Comment Header
/**
 * Author: Feiliang Zhou
 * Date: Feb 21, 2023
 *
 */
//#endregion

//#region Server Setup
var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;
require("dotenv").config();
app.use(express.static("views"));
app.use(express.static("public"));

const { engine } = require("express-handlebars");

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const clientSessions = require("client-sessions");
app.use(
  clientSessions({
    cookieName: "Cap805Session",
    secret: "cap805_week8_mongodbDemo",
    duration: 2 * 60 * 1000,
    activeDuration: 1000 * 60,
  })
);

//#region Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.dbConn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const UserModel = require("./models/userModel");
//endregion

//#region TEMPORARY USER MODEL
const usr = {
  username: "greg",
  password: "123456",
  firstName: "Feiliang",
  lastName: "Zhou",
  email: "fzhou30@myseneca.ca",
  isAdmin: false,
};
//#endregion

//#endregion

//#region Custom Server Functions
function OnHttpStart() {
  console.log("Express started successfully on port: " + HTTP_PORT);
}

function ensureLogin(req, res, next) {
  if (!req.Cap805Session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

function ensureAdmin(req, res, next) {
  if (!req.Cap805Session.user.isAdmin) {
    res.redirect("/login");
  } else {
    next();
  }
}
//endregion

//#region ROUTES
app.get("/", (req, res) => {
  res.render("home", { layout: false, user: req.Cap805Session.user });
});
app.get("/about", (req, res) => {
  res.render("about", { layout: false, user: req.Cap805Session.user });
});
app.get("/contact", (req, res) => {
  res.render("contact", { layout: false, user: req.Cap805Session.user });
});

//#region USER ROUTES
app.get("/login", (req, res) => {
  res.render("login", { layout: false, user: req.Cap805Session.user });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("login", { layout: false });
  }
  if (username == usr.username && password == usr.password) {
    req.Cap805Session.user = {
      username: usr.username,
      email: usr.email,
      firstName: usr.firstName,
      lastName: usr.lastName,
      isAdmin: usr.isAdmin,
    };
    if (usr.isAdmin) {
      res.redirect("/admin/dashboard");
    } else {
      res.redirect("/dashboard");
    }
    console.log("login successfully");
  } else {
    res.render("login", { layout: false });
  }
});

app.get("/logout", (req, res) => {
  req.Cap805Session.reset();
  res.redirect("/");
});
//#endregion

//#region USER AFTER LOGIN PAGES
app.get("/profile", (req, res) => {
  res.render("profile", { layout: false, user: req.Cap805Session.user });
});

app.get("/dashboard", ensureLogin, (req, res) => {
  res.render("dashboard", { layout: false, user: req.Cap805Session.user });
});
app.get("/admin/dashboard", ensureLogin, (req, res) => {
  res.render("admin/dashboard", {
    layout: false,
    user: req.Cap805Session.user,
  });
});
//#endregion

//#endregion

//#region TEMP ONE TIME RUN ONLY
app.get("/firstrunsetup", (req, res) => {
  var Greg = new UserModel({
    username: usr.username,
    password: usr.password,
    email: usr.email,
    firstName: usr.firstName,
    lastName: usr.lastName,
    isAdmin: usr.isAdmin,
  });
  Greg.save((err) => {
    console.log("Error: " + err + ";");
    if (err) {
      console.log("There was an error creating Greg: " + err);
    } else {
      console.log("Greg was created successfully");
    }
    console.log("Got here after creating Greg");
    res.redirect("/");
  });
});
//#endregion

app.listen(HTTP_PORT, OnHttpStart);
