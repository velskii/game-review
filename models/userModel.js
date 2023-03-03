const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  isAdmin: Boolean,
  courses: [
    {
      courseName: String,
      courseCode: String,
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
