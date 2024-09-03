import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  source: String,
  publication_year: Number,
  doi: String,
  summary: String,
  linked_discussion: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
