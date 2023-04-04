const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("about", { user: req.Cap805Session.user, layout: false });
});

module.exports = router;
