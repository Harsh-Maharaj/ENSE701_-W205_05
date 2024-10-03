import * as searchService from '../services/searchService';
export const searchArticles = async (req, res) => {
    try {
        const query = req.query.q;
        const results = await searchService.searchArticles(query);
        res.status(200).json(results);
    }
    catch (error) {
        // Corrected error handling
        res.status(500).json({ message: error.message });
    }
};
