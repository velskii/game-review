const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("adminPublish", { layout: false });
});

module.exports = router;
