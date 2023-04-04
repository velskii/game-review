const express = require("express");
const router = express.Router();

const Message = require("../models/messageModel");

router.get("/", async (req, res) => {
  const messages = await Message.find().sort("-date");
  res.render("/details", { messages });
});

router.post("/", async (req, res) => {
  const message = new Message({
    name: req.body.name,
    message: req.body.message,
  });
  await message.save();
  res.redirect("/details");
});

module.exports = router;
