import express from 'express';
import { searchArticles } from '../controllers/searchController.js';

const router = express.Router();

router.get('/search', searchArticles);

export default router;
