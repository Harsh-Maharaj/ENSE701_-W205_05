import { Request, Response } from 'express';
import * as articleService from '../services/articleService.js';

export const someFunction = async (req: Request, res: Response) => { // Add types for req and res
  try {
    // Your logic here
  } catch (error) {
    // Corrected catch block
    res.status(500).json({ message: (error as Error).message });
  }
};
