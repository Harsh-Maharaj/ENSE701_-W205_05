import express, { Request, Response } from 'express';
import { rateArticle, getArticle } from '../controllers/articleController.js';
import Article from '../models/articleModel.js'; // Import the Mongoose model

const router = express.Router();

// POST /api/articles - Add a new article
router.post('/', async (req: Request, res: Response) => {
  const { title, authors, source, publication_year, doi, claim, evidence, linked_discussion } = req.body;

  try {
    const article = new Article({
      title,
      authors,
      source,
      publication_year,
      doi,
      claim,
      evidence,
      linked_discussion,
    });

    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Server error, unable to save article.' });
  }
});

// GET /api/articles/:articleId - Fetch an article by ID
router.get('/:articleId', getArticle);

// POST /api/articles/rate/:articleId - Rate an article
router.post('/rate/:articleId', rateArticle);

// GET /api/articles - Fetch all articles
router.get('/', async (req: Request, res: Response) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error, unable to fetch articles.' });
  }
});

export default router;
