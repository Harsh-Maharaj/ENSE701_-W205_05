import Article from '../models/articleModel.js'; // Import the Mongoose model
import { IArticle } from '../interfaces/articleInterface.js'; // Import the TypeScript interface

export const submitArticle = async (articleDetails: IArticle) => {
  const article = new Article(articleDetails);
  await article.save();
  return article;
};
