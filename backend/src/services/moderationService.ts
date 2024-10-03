import Article from '../models/articleModel.js';

export const approveArticle = async (articleId: string) => {
  const article = await Article.findByIdAndUpdate(articleId, { status: 'approved' }, { new: true });
  return article;
};
