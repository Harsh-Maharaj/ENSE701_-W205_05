import Article from '../models/articleModel.js'; // Import the Mongoose model
export const submitArticle = async (articleDetails) => {
    const article = new Article(articleDetails);
    await article.save();
    return article;
};
