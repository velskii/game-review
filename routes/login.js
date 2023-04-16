const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
const { validationResult, check } = require('express-validator');


router.get("/", (req, res) => {
  res.render("login", { user: req.Cap805Session.user, layout: false });
});

router.post("/",   [
  check('username').isAlphanumeric().trim().escape(),
  check('password').isLength({ min: 8 }).trim().escape(),
]
,async(req, res) => {
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
            userid: usr._id,
            username: usr.username,
            email: usr.email,
            isAdmin: usr.role == 9 ? true : false,
            avatar: usr.avatar,
            intro: usr.intro,
            profile: usr.profile,
            email: usr.email,
          };

          if (usr.role == 9) {
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

module.exports = router;
