import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  journal: String, 
  se_practice: String, 
  research_type: String, 
  publication_year: Number,
  volume: String,
  number: String,
  pages: String,
  doi: String,
  summary: String,
  claim: String,
  evidence: { type: String, default: null }, // Analyst will add the evidence later
  linked_discussion: String,
  status: { type: String, enum: ['pending', 'approved_by_moderator', 'published', 'rejected'], default: 'pending' },
  moderation_notes: String,
  analysis_notes: String,
  submitted_at: { type: Date, default: Date.now }, // Timestamp of submission
  moderated_at: Date,  // Timestamp when moderated
  analyzed_at: Date,  // Timestamp when analyzed
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
