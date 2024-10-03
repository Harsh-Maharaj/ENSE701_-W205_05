import mongoose, { Schema } from 'mongoose';
const articleSchema = new Schema({
    title: { type: String, required: true },
    authors: { type: [String], required: true },
    source: { type: String, required: true },
    publication_year: { type: Number, required: true },
    doi: { type: String, required: false },
    summary: { type: String, required: false },
    linked_discussion: { type: String, required: false },
});
export default mongoose.model('Article', articleSchema);
