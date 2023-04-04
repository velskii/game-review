const express = require("express");
const router = express.Router();
const ensureLogin = require("../middleware/ensureLogin");

router.get("/", ensureLogin, (req, res) => {
  res.render("profile", { user: req.Cap805Session.user, layout: false });
});

router.get("/edit", ensureLogin, (req, res) => {
  res.render("profileedit", { user: req.Cap805Session.user, layout: false });
});

router.post("/edit", ensureLogin, (req, res) => {
  const UserModel = require("../models/userModel");

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

module.exports = router;
