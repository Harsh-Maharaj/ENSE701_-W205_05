import express from 'express';
import Article from '../models/articleModel.js'; // Import the Mongoose model
const router = express.Router();
// POST /api/articles - Add a new article
router.post('/', async (req, res) => {
    const { title, authors, source, publication_year, doi, claim, evidence, linked_discussion } = req.body;
    try {
        // Create a new article document
        const article = new Article({
            title,
            authors,
            source,
            publication_year,
            doi,
            claim,
            evidence,
            linked_discussion,
        });
        // Save the article to the database
        const savedArticle = await article.save();
        // Respond with the saved article
        res.status(201).json(savedArticle);
    }
    catch (error) {
        console.error('Error saving article:', error);
        res.status(500).json({ message: 'Server error, unable to save article.' });
    }
});
// GET /api/articles - Fetch all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find(); // Fetch all articles from MongoDB
        res.json(articles); // Return the articles as JSON
    }
    catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Server error, unable to fetch articles.' });
    }
});
export default router;
