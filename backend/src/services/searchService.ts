import Article from '../models/articleModel.js';

export const searchArticles = async (query: string) => {
  return Article.find({ $text: { $search: query } });
};
