import express from 'express';
import { approveArticle } from '../controllers/moderationController';
const router = express.Router();
router.post('/approve', approveArticle);
export default router;
