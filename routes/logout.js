const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.Cap805Session.reset();
  res.redirect("/");
});

module.exports = router;
