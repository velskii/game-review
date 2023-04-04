const express = require("express");
const router = express.Router();
const GameModel = require("../models/gameModel");
const ReviewModel = require("../models/reviewModel");
const ensureLogin = require("../middleware/ensureLogin");

router.get("/:gid", async (req, res) => {
  // res.send(req.Cap805Session.user);
  // return;
  const gid = req.params.gid;
  getDetailsById(gid).then((gameDetails) => {
    getRelatedGames().then((relatedGames) => {
      const reviews = ReviewModel.find({ game_id: gid })
        .sort({ created_at: -1 })
        .lean()
        .then((reviews) => {
          // console.log(reviews + "++reviews are here.");
          res.render("details", {
            user: req.Cap805Session.user,
            layout: false,
            details: gameDetails,
            reviews: reviews,
            relatedGames: relatedGames,
          });
        });
    });
  });
});

router.post("/:gid/reviews", ensureLogin, (req, res) => {
  const gid = req.params.gid;
  const currentUser = req.Cap805Session.user;
  // console.log("message: " + req.body.recommend);

  new ReviewModel({
    game_id: gid,
    user_id: currentUser.userid,
    avatar: currentUser.avatar,
    author: currentUser.username,
    content: req.body.message,
    parent_id: null,
    parent_path: null,
    is_deleted: false,
    recommend: req.body.recommend == "1" ? true : false,
    helpful: false,
    created_at: new Date().toISOString().replace("T", " ").substring(0, 19),
    updated_at: new Date().toISOString().replace("T", " ").substring(0, 19),
  })
    .save()
    .then(() => {
      if (req.body.recommend == "1") {
        GameModel.findOneAndUpdate(
          { _id: gid },
          { $inc: { review_number: 1, positive_number: 1 } }
        ).then(() => {
          res.status(200).send({
            msg: "post successfully, and updated the game data successfully.",
          });
        });
      } else {
        res.status(200).send({ msg: "post successfully" });
      }
    })
    .catch((err) => {
      res.status(501).send({ error: err });
    });
});

function getDetailsById(gid) {
  return GameModel.findById(gid)
    .lean()
    .exec()
    .then((data) => {
      return data;
    });
}

async function getRelatedGames() {
  return await GameModel.find()
    .lean()
    .limit(4)
    .exec()
    .then((data) => {
      return data;
    });
}

module.exports = router;
