const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    game_id: {
      type: Number,
      unique: true,
    },
    game_name: {
      type: String,
      unique: true,
    },
    intro: String,
    description: String,
    logo: String,
    positive_number: Number,
    negative_number: Number,
    review_number: Number,
    favorable_rate: Number,
    score: Number,
    homepage: String,
    publisher: {
      publisher_id: Number,
      publisher_name: String,
      intro: String,
      description: String,
      created_at: Date,
      updated_at: Date,
    },
    developer: {
      developer_id: Number,
      developer_name: String,
      intro: String,
      description: String,
      created_at: Date,
      updated_at: Date,
    },
    platform: {
      platform_id: Number,
      platform_name: String,
      created_at: Date,
      updated_at: Date,
    },
    genre: {
      genre_id: Number,
      genre_name: String,
      created_at: Date,
      updated_at: Date,
    },
    created_at: Date,
    updated_at: Date,
  },
  { collection: "game" }
);

module.exports = mongoose.model("game", gameSchema);
