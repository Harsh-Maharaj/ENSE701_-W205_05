import Article from '../models/articleModel.js';
import { IArticle } from '../interfaces/articleInterface';

export const rateArticle = async (articleId: string, rating: number) => {
  const article = await Article.findById(articleId);
  if (!article) throw new Error('Article not found');

  article.ratings.push(rating); // Add the new rating to the ratings array
  await article.save(); // Save the updated article

  // Return the new average rating
  return article.getAverageRating();
};

export const getArticleById = async (articleId: string): Promise<IArticle | null> => {
  return await Article.findById(articleId);
};
