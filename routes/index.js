const express = require("express");
const router = express.Router();
const ensureLogin = require("../middleware/ensureLogin");

router.get("/", (req, res) => {
  const GameModel = require("../models/gameModel");

  GameModel.find()
    .lean()
    .limit(10)
    .exec()
    .then((data) => {
      // res.send(data);
      res.render("home", {
        games: data,
        user: req.Cap805Session.user,
        active: "Home",
        layout: false,
      });
    });
});

module.exports = router;
