const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postid: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const comment = mongoose.model("Comments/:_postId", commentSchema);

module.exports = comment;
