import { Document, Types } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  author: string;
  bibtex: string;
  submitter: Types.ObjectId; // Ensure this matches your ObjectId type
  status: string;
  rating: number;
}
