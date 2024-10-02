import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
    doc_id: { type: String, required: true },
    average_score: { type: Number, required: true },
});

const Score = mongoose.model('Score', scoreSchema);

export default Score;
