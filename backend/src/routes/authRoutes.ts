import { Router } from 'express';
import { signup, login } from '../controllers/authController';

const router = Router();

// Use a wrapper function to handle async errors properly
const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Use asyncHandler for both signup and login
router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));

export default router;
