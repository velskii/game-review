const express = require("express");
const router = express.Router();
const ensureAdmin = require("../middleware/ensureAdmin");
const UserModel = require("../models/userModel");

router.get("/", ensureAdmin, (req, res) => {
  UserModel.find()
    .lean()
    .limit(50)
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

router.get("/users/delete/:id", ensureAdmin, (req, res) => {
  UserModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/admin/dashboard"); // redirect to dashboard
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Unable to Remove User / User not found");
    });
});

router.get("/users/edit/:id", ensureAdmin, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).lean().exec();
    if (!user.isAdmin) {
      res.render("adminEditUser", {
        user: req.Cap805Session.user,
        userToEdit: user,
        layout: false,
      });
    } else {
      res.status(403).send("You cannot edit an admin user.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to fetch user.");
  }
});

router.post("/users/edit/:id", ensureAdmin, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user.isAdmin) {
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
      user.password = req.body.password;
      user.email = req.body.email;
      user.role = (req.body.isAdmin==='on') ? 9 : 1;
      await user.save();
      res.redirect("/admin/dashboard");
    } else {
      res.status(403).send("You cannot edit an admin user.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to update user.");
  }
});

module.exports = router;
