import Article from '../models/articleModel';

export const searchArticles = async (query: string) => {
  return Article.find({ $text: { $search: query } });
};
