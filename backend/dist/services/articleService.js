import Article from '../models/articleModel'; // Import the Mongoose model
export const submitArticle = async (articleDetails) => {
    const article = new Article(articleDetails);
    await article.save();
    return article;
};
