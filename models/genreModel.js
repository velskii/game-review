const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema(
  {
    genre_id: Number,
    genre_name: String,
  },
  { collection: "genre" }
);

module.exports = mongoose.model("genre", genreSchema);
