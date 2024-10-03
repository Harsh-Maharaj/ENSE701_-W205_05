import Article from '../models/articleModel'; // Import the Mongoose model
import { IArticle } from '../interfaces/articleInterface'; // Import the TypeScript interface

export const submitArticle = async (articleDetails: IArticle) => {
  const article = new Article(articleDetails);
  await article.save();
  return article;
};
