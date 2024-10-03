import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  user_email: { type: String, required: true },
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
  evidence_summary: { type: String, enum: ['weak', 'moderate', 'strong'], default: null }, // Analyst will add the evidence summary later
  linked_discussion: String,
  status: { type: String, enum: ['pending', 'approved_by_moderator', 'published', 'rejected'], default: 'pending' },
  moderation_notes: String,
  analysis_notes: { type: String, default: null }, // Analysis will add the analysis notes later
  submitted_at: { type: Date, default: Date.now }, // Timestamp of submission
  moderated_at: Date,  // Timestamp when moderated
  analyzed_at: { type: Date, default: Date.now},  // Timestamp when analyzed
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
