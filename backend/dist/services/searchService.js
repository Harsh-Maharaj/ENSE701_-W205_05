import Article from '../models/articleModel.js';
export const searchArticles = async (query) => {
    return Article.find({ $text: { $search: query } });
};
