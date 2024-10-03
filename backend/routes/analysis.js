import express from 'express';
import Article from '../models/Article.js';   // Import the Article model

const router = express.Router();

// GET /api/analyses/approved_by_moderator - Retrieve all articles approced by moderator
router.get('/articles', async (req, res) => {
  try {
    const approvedAnalyses = await Article.find({ status: 'approved_by_moderator' });
    res.status(200).json(approvedAnalyses);
  } catch (error) {
    console.error('Error retrieving approved analyses:', error);
    res.status(500).json({ message: 'Error fetching approved analyses', error });
  }
});

router.post('/articles/:id/analysis_notes', async (req, res) => {
    const articleId = req.params.id;
    const { analysis_notes } = req.body;

    try {
        const article = await Article.findById(articleId);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        article.analysis_notes = analysis_notes;
        await article.save();
        res.status(200).json({message: 'Analysis notes succefully submitted', article});
    } catch (error) {
        console.error('Error saving the analysis notes:', error);
        res.status(500).json({ message: 'Error saving the analysis notes', error });
    }
});

router.post('/articles/:id/evidence', async (req, res) => {
    const articleId = req.params.id;
    const { evidence } = req.body;

    try {
        const article = await Article.findById(articleId);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        article.evidence = evidence;
        await article.save();
        res.status(200).json({message: 'Evidence succefully submitted', article});
    } catch (error) {
        console.error('Error saving the evidence:', error);
        res.status(500).json({ message: 'Error saving the evidence', error });
    }
});

// POST /api/articles/:id/evidence_summary - Update evidence summary for an article
router.post('/articles/:id/evidence_summary', async (req, res) => {
    const articleId = req.params.id;
    const { evidence_summary } = req.body;

    try {
      const article = await Article.findById(articleId);
      if (!article) return res.status(404).json({ message: 'Article not found' });

      article.evidence_summary = evidence_summary;
      await article.save();
      res.status(200).json({ message: 'Evidence summary successfully submitted', article });
    } catch (error) {
      console.error('Error saving the evidence summary:', error);
      res.status(500).json({ message: 'Error saving the evidence summary', error });
    }
  });


router.post('/articles/:id/approve', async (req, res) => {
  const articleId = req.params.id;
  const { evidence, analysis_notes, evidence_summary } = req.body;

  if (!evidence_summary) {
    return res.status(400).json({ message: 'Evidence Summary is required before approving the article.' });
  }

  try {
    const updateFields = {
      status: 'published',
      evidence: evidence,
      analysis_notes: analysis_notes,
      evidence_summary: evidence_summary,
    };

    const article = await Article.findByIdAndUpdate(articleId, updateFields, { new: true });

    if (!article) return res.status(404).json({ message: 'Article not found' });

    res.status(200).json({ message: 'Article approved and published', article });
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
