import * as moderationService from '../services/moderationService.js';
export const approveArticle = async (req, res) => {
    try {
        const { articleId } = req.body;
        const approvedArticle = await moderationService.approveArticle(articleId);
        res.status(200).json({ message: 'Article approved successfully', article: approvedArticle });
    }
    catch (error) {
        // Corrected error handling
        res.status(500).json({ message: error.message });
    }
};
