const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user_id: String,
    username: {
      type: String,
      unique: true,
    },
    avatar: String,
    password_salt: String,
    password: String,
    role: Number,
    tags: [String],
    email: {
      type: String,
      unique: true,
    },
    phone: String,
    intro: String,
    profile: String,
  },
  { collection: "user" }
);

module.exports = mongoose.model("user", userSchema);
