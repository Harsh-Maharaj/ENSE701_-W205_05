import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// GET /api/analyses/approved_by_moderator - Retrieve all articles approced by moderator
router.get('/articles', async (req, res) => {
  try {
    const moderationQueue = await Article.find({ status: 'pending' });
    res.status(200).json(moderationQueue);
  } catch (error) {
    console.error('Error retrieving approved analyses:', error);
    res.status(500).json({ message: 'Error fetching approved analyses', error });
  }
});

router.post('/articles/:id/approve', async (req, res) => {
    const articleId = req.params.id;

    try {
        const article = await Article.findByIdAndUpdate(
            articleId,
            { status: 'approved_by_moderator' },
            { new: true }
        );
        if (!article) return res.status(404).json({ message: 'Article not found' });

        res.status(200).json({message: 'Article approved and sent to Analyst', article});
    } catch (error) {
        console.error('Error approving the article:', error);
        res.status(500).json({ message: 'Error approving the article', error });
    }
});

router.post('/articles/:id/reject', async (req, res) => {
    const articleId = req.params.id;

    try {
        const article = await Article.findByIdAndUpdate(
            articleId,
            { status: 'rejected' },
            { new: true }
        );
        if (!article) return res.status(404).json({ message: 'Article not found' });

        res.status(200).json({message: 'Article rejected', article});
    } catch (error) {
        console.error('Error rejecting the article:', error);
        res.status(500).json({ message: 'Error rejecting the article', error });
    }
    });

export default router;
