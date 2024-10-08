import { Request, Response } from 'express';
import Article from '../models/articleModel.js';

// Fetch article by ID
export const getArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Rate an article
export const rateArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rating } = req.body;
    const article = await Article.findById(req.params.articleId);

    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    article.ratings.push(rating);
    await article.save();

    const averageRating = article.getAverageRating();
    res.status(200).json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
