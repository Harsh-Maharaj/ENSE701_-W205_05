import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// GET /api/articles/published - Retrieve all published articles
router.get('/published', async (req, res) => {
  try {
    const publishedArticles = await Article.find({ status: 'published' });
    res.status(200).json(publishedArticles);
  } catch (error) {
    console.error('Error retrieving published articles:', error);
    res.status(500).json({ message: 'Error fetching published articles', error });
  }
});

router.get('/rejected', async (req, res) => {
  try {
    const rejectedArticles = await Article.find({ status: 'rejected' });
    res.status(200).json(rejectedArticles);
  } catch (error) {
    console.error('Error retrieving rejected articles:', error);
    res.status(500).json({ message: 'Error fetching rejected articles', error });
  }
});

// POST /api/articles - Create a new article
router.post('/', async (req, res) => {
  console.log("POST /api/articles - Create a new article")
  try {
    const { title, authors, source, journal, se_practice, research_type, publication_year,
      volume, number, pages, doi, summary, claim, linked_discussion, user_name, user_email } = req.body;

    const newArticle = new Article({
      title,
      authors,
      source,
      journal,
      se_practice,
      research_type,
      publication_year,
      volume,
      number,
      pages,
      doi,
      summary,
      claim,
      linked_discussion,
      user_name,
      user_email,
      status: 'pending', // Default status to pending
    });

    const savedArticle = await newArticle.save(); // Save and store the result in `savedArticle`

    // Return the submission ID along with the success message
    res.status(201).json({ message: 'Article submitted successfully!', submissionId: savedArticle._id });
  } catch (error) {
    console.error('Error saving the article:', error);
    res.status(500).json({ message: 'Error saving the article', error });
  }
});


// GET /api/articles/track - Retrieve article(s) by email or submission ID
router.get('/track', async (req, res) => {
  const { email, submissionId } = req.query;

  try {
    // Search by email if provided
    if (email) {
      const articles = await Article.find({ user_email: email });
      if (!articles || articles.length === 0) {
        return res.status(404).json({ message: 'No submissions found for this email' });
      }
      return res.status(200).json(articles);
    }

    // Search by submission ID if provided
    if (submissionId) {
      const article = await Article.findById(submissionId);
      if (!article) {
        return res.status(404).json({ message: 'Submission not found with that ID' });
      }
      return res.status(200).json([article]);  // Return as an array for consistency
    }

    return res.status(400).json({ message: 'Either email or submission ID is required' });
  } catch (error) {
    console.error('Error fetching article:', error.stack);
    res.status(500).json({ message: 'Error fetching article', error: error.stack });
  }
});

// GET /api/articles/:id - Retrieve a single article by ID
router.get('/:id', async (req, res) => {
  console.log(`"GET /api/articles/${req.params.id} - Retrieve a single article by ID"`)
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(article);
  } catch (error) {
    console.error('Error retrieving that article:', error);
    res.status(500).json({ message: 'Error fetching article', error });
  }
});

export default router;
