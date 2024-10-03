import { Request, Response } from 'express';
import * as searchService from '../services/searchService.js';

export const searchArticles = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const results = await searchService.searchArticles(query);
    res.status(200).json(results);
  } catch (error) {
    // Corrected error handling
    res.status(500).json({ message: (error as Error).message });
  }
};
