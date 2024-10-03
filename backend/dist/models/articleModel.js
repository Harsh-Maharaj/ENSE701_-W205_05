import mongoose, { Schema } from 'mongoose';
const articleSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    bibtex: { type: String },
    submitter: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'submitted' },
    rating: { type: Number, default: 0 }
});
export default mongoose.model('Article', articleSchema);
