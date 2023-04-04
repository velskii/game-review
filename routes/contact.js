const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("contact", { user: req.Cap805Session.user, layout: false });
});

module.exports = router;
