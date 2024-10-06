import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

export default router;
