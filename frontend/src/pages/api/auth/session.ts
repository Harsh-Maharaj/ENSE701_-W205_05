import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Mock session data, replace with my logic later
  res.status(200).json({ session: null });
}
