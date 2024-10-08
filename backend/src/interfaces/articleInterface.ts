import { Document, Types } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  authors: string[];
  source: string;
  publication_year: number;
  doi?: string;
  claim?: string;
  evidence?: string;
  linked_discussion?: string;
  ratings: number[]; // Store an array of ratings
}
