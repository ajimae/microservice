const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  hashTags: [String],
  mentions: [String],
  text: {
    type: String,
    required: true,
    unique: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: false
  }
},
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
