import mongoose, { Schema } from 'mongoose';
import { IArticle } from '../interfaces/articleInterface';

const articleSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  source: { type: String, required: true },
  publication_year: { type: Number, required: true },
  doi: { type: String, required: false },
  claim: { type: String, required: false },
  evidence: { type: String, required: false },
  linked_discussion: { type: String, required: false },
});

export default mongoose.model<IArticle>('Article', articleSchema);
