import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Mock log data, replace with your logic
  res.status(200).json({ log: 'Log data' });
}
