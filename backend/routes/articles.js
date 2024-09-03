import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// POST /api/articles - Create a new article
router.post('/', async (req, res) => {
  try {
    const { title, authors, source, publication_year, doi, summary, linked_discussion } = req.body;

    const newArticle = new Article({
      title,
      authors,
      source,
      publication_year,
      doi,
      summary,
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

// GET /api/articles - Retrieve all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error retrieving all articles:', error); 
    res.status(500).json({ message: 'Error fetching articles', error });
  }
});

// GET /api/articles/:id - Retrieve a single article by ID
router.get('/:id', async (req, res) => {
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
