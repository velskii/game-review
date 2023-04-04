const express = require("express");
const router = express.Router();
const ensureLogin = require("../middleware/ensureLogin");
const UserModel = require("../models/userModel");
const MessageModel = require("../models/messageModel");

router.get("/", ensureLogin, (req, res) => {
  UserModel.find()
    .lean()
    .limit(50)
    .exec()
    .then((users) => {
      res.render("dashboard", {
        user: req.Cap805Session.user,
        hasUsers: !!users.length,
        users: users,
        layout: false,
      });
    });
});

router.get("/users/edit/:id", ensureLogin, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).lean().exec();

    res.render("userEditUser", {
      user: req.Cap805Session.user,
      userToEdit: user,
      layout: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to fetch user.");
  }
});

router.post("/users/edit/:id", ensureLogin, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (req.body.password.length <= 4) {
      res
        .status(400)
        .json({ errorMsg: "The length of password must be more than 4." });
      return;
    }
    if (req.body.password != req.body.repassword) {
      res
        .status(400)
        .json({ errorMsg: "The password must be the same as repassword." });
      return;
    }
    user.username = req.body.username;
    user.phone = req.body.phone;
    user.intro = req.body.intro;
    user.avatar = req.body.avatar;
    user.email = req.body.email;
    user.profile = req.body.profile;
    user.password = req.body.password;
    await user.save();
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to update user.");
  }
});

module.exports = router;
