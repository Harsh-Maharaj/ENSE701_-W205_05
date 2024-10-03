import express from 'express';
import { searchArticles } from '../controllers/searchController';
const router = express.Router();
router.get('/search', searchArticles);
export default router;
