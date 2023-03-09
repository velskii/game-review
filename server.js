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

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const clientSession = require("client-sessions");
app.use(
  clientSession({
    cookieName: "Cap805Session",
    secret: "cap805_week8_mongodbDemo",
    duration: 2 * 60 * 1000,
    activeDuration: 1000 * 60,
  })
);

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.dbConn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserModel = require("./models/userModel");

//#region TEMPORARY USER MODEL
/*
const usr = {
    username: "clint",
    password: "mypassword",
    email: "clint.macdonald@senecacollege.ca",
    isAdmin: false,
    firstName: "Clint",
    lastName: "MacDonald"
};
*/
//#endregion

//#endregion

//#region Custom Server Functions
function OnHttpStart() {
  console.log("Express server started successfully on port: " + HTTP_PORT);
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
    res.render("login", {
      errorMsg: "You do not have permissions for the page requested!",
      layout: false,
    });
  } else {
    next();
  }
}

//#endregion

//#region ROUTES
app.get("/", (req, res) => {
  res.render("home", { user: req.Cap805Session.user, layout: false });
});
app.get("/about", (req, res) => {
  res.render("about", { user: req.Cap805Session.user, layout: false });
});
app.get("/contact", (req, res) => {
  res.render("contact", { user: req.Cap805Session.user, layout: false });
});

//#region USER ROUTES
app.get("/login", (req, res) => {
  res.render("login", { user: req.Cap805Session.user, layout: false });
});
app.get("/logout", (req, res) => {
  req.Cap805Session.reset();
  res.redirect("/");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("login", {
      errorMsg: "Both the login and password are required fields",
      layout: false,
    });
  }

  // go to database
  UserModel.findOne({ username: username })
    .exec()
    .then((usr) => {
      // check username
      if (usr) {
        if (password === usr.password) {
          req.Cap805Session.user = {
            username: usr.username,
            email: usr.email,
            isAdmin: usr.isAdmin,
            firstName: usr.firstName,
            lastName: usr.lastName,
          };

          if (usr.isAdmin) {
            res.redirect("/admin/dashboard");
          } else {
            res.redirect("/dashboard");
          }
          console.log("Login was successful");
        } else {
          res.render("login", {
            errorMsg: "User credentials are incorrect! Password was incorrect",
            layout: false,
          });
        }
      } else {
        res.render("login", {
          errorMsg: "User credentials are incorrect! Login was not found",
          layout: false,
        });
      }
    })
    .catch((err) => {
      console.log("An error occurred: ${err}" + err);
    });
});

//#endregion

//#region USER Pages
app.get("/dashboard", ensureLogin, (req, res) => {
  res.render("dashboard", { user: req.Cap805Session.user, layout: false });
});

app.get("/admin/dashboard", ensureAdmin, (req, res) => {
  UserModel.find()
    .lean()
    .exec()
    .then((users) => {
      res.render("adminDashboard", {
        user: req.Cap805Session.user,
        hasUsers: !!users.length,
        users: users,
        layout: false,
      });
    });
});

app.get("/profile", ensureLogin, (req, res) => {
  res.render("profile", { user: req.Cap805Session.user, layout: false });
});

app.get("/profile/edit", ensureLogin, (req, res) => {
  res.render("profileedit", { user: req.Cap805Session.user, layout: false });
});

app.post("/profile/edit", ensureLogin, (req, res) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const Email = req.body.email;
  const isAdmin = req.body.isAdmin == "on";

  if (isAdmin) {
    UserModel.updateOne(
      { username: username },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          email: Email,
          isAdmin: true,
        },
      }
    )
      .exec()
      .then(() => {
        req.Cap805Session.user = {
          username: username,
          email: Email,
          firstName: firstName,
          lastName: lastName,
          isAdmin: true,
        };
        res.redirect("/Profile");
      });
  } else {
    UserModel.updateOne(
      { username: username },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          email: Email,
          isAdmin: false,
        },
      }
    )
      .exec()
      .then(() => {
        req.Cap805Session.user = {
          username: username,
          email: Email,
          firstName: firstName,
          lastName: lastName,
          isAdmin: false,
        };
        res.redirect("/Profile");
      });
  }
});
//#endregion
//#endregion

//#region TEMP ONE TIME RUN ONLY
/*
app.get("/firstrunsetup", (req, res) => {
    var Clint = new UserModel({
        username: 'clint',
        password: 'mypassword',
        firstName: 'Clint',
        lastName: 'MacDonald',
        email: 'clint.macdonald@senecacollege.ca',
        isAdmin: false
    });

    Clint.save((err) => {
        console.log("Error: " + err + ";");
        if (err) {
            console.log("There was an error creating Clint: " + err);
        } else {
            console.log("Clint was created successfully");
        }
        console.log("Get here after saving Clint");
        res.redirect("/");
    } )
});
*/
//#endregion

app.listen(HTTP_PORT, OnHttpStart);
