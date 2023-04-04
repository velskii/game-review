const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("register", {
    layout: false,
  });
});

router.post("/", (req, res) => {
  // user management system
  const UserModel = require("../models/userModel");

  const username = req.body.username;
  const password = req.body.password;
  const re_password = req.body.re_password;
  const email = req.body.email;
  
  if (password.length <= 4) {
    res.render("register", {
      errorMsg: "The length of password must be more than 4.",
      layout: false,
    });
    return;
  }
  if (password != re_password) {
    res.render("register", {
      errorMsg: "The re-enter password must be the same as the password.",
      layout: false,
    });
    return;
  }

  var newUser = new UserModel({
    username: username,
    password: password,
    email: email,
    role: 1,
  });

  newUser.save((err) => {
    if (err) {
      console.log("There was an error creating new user: " + err);
    } else {
      console.log("New user was created successfully");
      res.redirect("/login");
    }
  });
});

module.exports = router;
