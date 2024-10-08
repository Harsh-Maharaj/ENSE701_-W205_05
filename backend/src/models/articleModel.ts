import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  authors: string[];
  source: string;
  publication_year: number;
  doi?: string;
  claim?: string;
  evidence?: string;
  linked_discussion?: string;
  ratings: number[];
  getAverageRating: () => number; // Add this method to the interface
}

const articleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  source: { type: String, required: true },
  publication_year: { type: Number, required: true },
  doi: { type: String, required: false },
  claim: { type: String, required: false },
  evidence: { type: String, required: false },
  linked_discussion: { type: String, required: false },
  ratings: { type: [Number], default: [] }, // Ratings array
});

// Method to calculate the average rating
articleSchema.methods.getAverageRating = function (): number {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc: number, curr: number) => acc + curr, 0);
  return sum / this.ratings.length;
};

export default mongoose.model<IArticle>('Article', articleSchema);
