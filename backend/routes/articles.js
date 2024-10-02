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

// POST /api/articles - Create a new article
router.post('/', async (req, res) => {
  console.log("POST /api/articles - Create a new article")
  try {
    const { title, authors, source, journal, se_practice, research_type, publication_year, volume, number, pages, doi, summary, claim, linked_discussion } = req.body;

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
      status: 'pending', // Default status to pending
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error saving the article:', error);
    res.status(500).json({ message: 'Error saving the article', error });
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
