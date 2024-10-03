import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// GET /api/search?q=searchTerm - Search articles by title, authors, or publication year
router.get('/', async (req, res) => {
  console.log('Search rout called');
  try {
    const { q } = req.query; // Extract the search term from the query parameter

    if (!q) {
      return res.status(400).json({ message: 'Search query parameter "q" is required' });
    }

    console.log('Search term recieved: ${q}');

    // Define search criteria using case-insensitive regular expressions
    const searchCriteria = {
      status: 'published',
      $or: [
        { title: { $regex: q, $options: 'i' } },      // Search in title
        { authors: { $regex: q, $options: 'i' } },    // Search in authors
        { publication_year: !isNaN(q) ? Number(q) : null }, // Direct match for number, only if q is a number
        // Add more fields as needed
      ],
    };

    console.log('Search criteria:', JSON.stringify(searchCriteria));

    // Perform the search in the database
    const searchResults = await Article.find(searchCriteria);

    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({ message: 'Error performing search', error });
  }
});

export default router;
