import Article from '../models/articleModel';
export const searchArticles = async (query) => {
    return Article.find({ $text: { $search: query } });
};
