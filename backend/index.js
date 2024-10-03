import express from 'express';
import cors from 'cors';
import { connectToDb } from './db.js';
import articleRoutes from './routes/articles.js';
//import moderationRoutes from './routes/moderation.js';
//import analysisRoutes from './routes/analysis.js';
//import searchRoutes from './routes/search.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware to allow cross-origin requests
app.use(cors());

// Use environment variable PORT, or default to 8000
const PORT = process.env.PORT || 8000;

// Routes
app.use('/api/articles', articleRoutes);
//app.use('/api/moderation', moderationRoutes);
//app.use('/api/analysis', analysisRoutes);
//app.use('/api/search', searchRoutes);

// Connect to the database and start the server
connectToDb(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
