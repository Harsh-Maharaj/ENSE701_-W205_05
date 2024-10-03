import mongoose, { Schema } from 'mongoose';
import { IArticle } from '../interfaces/articleInterface';

const articleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  bibtex: { type: String },
  submitter: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'submitted' },
  rating: { type: Number, default: 0 }
});

export default mongoose.model<IArticle>('Article', articleSchema);
