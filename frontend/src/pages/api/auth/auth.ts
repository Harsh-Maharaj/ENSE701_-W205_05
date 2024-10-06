import type { NextApiRequest, NextApiResponse } from 'next';
// frontend/src/pages/api/auth/auth.ts
import connectDB from '../../../../../backend/dist/config/db'; // Correct as default import
import { signup, login } from '../../../../../backend/dist/controllers/authController';
import { Request, Response } from 'express';

// Connect to MongoDB
connectDB();

// Wrapper function to convert Next.js req/res to Express req/res
const expressHandlerWrapper = (handler: (req: Request, res: Response) => void) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    // Cast Next.js req/res to match Express types
    const expressReq = req as unknown as Request;
    const expressRes = res as unknown as Response;

    return handler(expressReq, expressRes);
  };
};

// Corrected named function for the default export
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { auth } = req.query;

  if (req.method === 'POST') {
    if (auth === 'signup') {
      return expressHandlerWrapper(signup)(req, res);
    } else if (auth === 'login') {
      return expressHandlerWrapper(login)(req, res);
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
