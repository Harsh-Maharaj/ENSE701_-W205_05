const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  pageSize: {
    type: Number,
    required: true,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
