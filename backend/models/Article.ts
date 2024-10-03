import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface for the Article document
export interface IArticle extends Document {
  title: string;
  authors: string;
  source: string;
  publication_year: number;
  doi?: string;
  summary?: string;
  linked_discussion?: string;
  status: string;
}

// Define the schema for the Article model
const articleSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  source: { type: String, required: true },
  publication_year: { type: Number, required: true },
  doi: { type: String },
  summary: { type: String },
  linked_discussion: { type: String },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

const Article = mongoose.model<IArticle>('Article', articleSchema);

export default Article;
