import express from 'express';
import Score from '../models/Score.js';

const router = express.Router();

// 获取文章评分
router.get("/:id", async (req, res) => {
    console.log(`"GET /api/score/${req.params.id} - Retrieve a single score by doc ID"`)
    try {
        const score = await Score.find({
            doc_id: req.params.id
        });
        if (!score) return res.status(404).json({ message: 'Score not found' });
        return res.status(200).json(score);
    } catch (error) {
        console.error('Error retrieving score by ID:', error);
        return res.status(500).json({ message: 'Error fetching score by ID', error });
    }
})

// 提交文章评分
router.post("/", async (req, res) => {
    console.log(`"POST /api/score/${req.params.id} - Create a score by doc ID"`)
    try {
        const { doc_id, average_score } = req.body;

        const newScore = new Score({
            doc_id,
            average_score
        })

        await newScore.save();
        return res.status(201).json(newScore);
    } catch (error) {
        console.error('Error retrieving all score:', error);
        return res.status(500).json({ message: 'Error fetching score', error });
    }
})

// 获取文章平均评分
router.get("/average/:id", async (req, res) => {
    console.log(`"GET /api/score/average/${req.params.id} - Retrieve average score by doc ID"`);
    try {
        const scores = await Score.find({ doc_id: req.params.id });
        if (!scores || scores.length === 0) {
            return res.status(200).json({ doc_id: req.params.id, average_score: 0 });
        }

        const averageScore = Number((scores.reduce((total, score) => total + score.average_score, 0) / scores.length).toPrecision(3));
        return res.status(200).json({ doc_id: req.params.id, average_score: averageScore });
    } catch (error) {
        console.error('Error retrieving average score by ID:', error);
        return res.status(500).json({ message: 'Error fetching average score by ID', error });
    }
});

export default router;
