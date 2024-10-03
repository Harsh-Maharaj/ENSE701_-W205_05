import { Request, Response } from 'express';
import * as articleService from '../services/articleService';

export const submitArticle = async (req: Request, res: Response) => {
  try {
    const articleDetails = req.body;
    const newArticle = await articleService.submitArticle(articleDetails);
    res.status(201).json({ message: 'Article submitted successfully', article: newArticle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
