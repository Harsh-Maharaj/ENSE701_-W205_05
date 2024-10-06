import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config(); // Use ES module import for `dotenv`

// Import custom modules
import connectDB from './config/db';
import articleRoutes from './routes/articleRoutes';
import authRoutes from './routes/auth';
import moderationRoutes from './routes/moderationRoutes';
import searchRoutes from './routes/searchRoutes';

// Initialize app
const app = express();
app.use(cors());
app.use(express.json()); // Use express's built-in body parser

// Connect to the database
connectDB();

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/moderation', moderationRoutes);
app.use('/api/search', searchRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
