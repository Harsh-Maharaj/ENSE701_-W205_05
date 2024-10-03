import { Request, Response } from 'express';
import * as moderationService from '../services/moderationService';

export const approveArticle = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.body;
    const approvedArticle = await moderationService.approveArticle(articleId);
    res.status(200).json({ message: 'Article approved successfully', article: approvedArticle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
