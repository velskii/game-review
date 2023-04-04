const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const GameModel = require("../models/gameModel");

  const featuredGames = await GameModel.find()
    .lean()
    .limit(5)
    .exec()
    .then((data) => {
      return data;
    });
  const top3 = await GameModel.find()
    .lean()
    .limit(3)
    .sort({ favorable_rate: "desc" })
    .exec()
    .then((data) => {
      return data;
    });
  const gamesBelow = await GameModel.find()
    .lean()
    .limit(12)
    .exec()
    .then((data) => {
      return data;
    });

  res.render("browse", {
    featuredGames: featuredGames,
    top3: top3,
    gamesBelow: gamesBelow,
    user: req.Cap805Session.user,
    active: "Browse",
    layout: false,
  });
});

module.exports = router;
