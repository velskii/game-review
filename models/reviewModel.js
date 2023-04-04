const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    review_id: Number,
    game_id: String,
    user_id: String,
    avatar: String,
    author: String,
    content: String,
    parent_id: Number,
    is_deleted: Boolean,
    recommend: Boolean,
    helpful: Boolean,
    created_at: String,
    updated_at: String,
  },
  { collection: "review" }
);

module.exports = mongoose.model("review", reviewSchema);
