import Article from '../models/articleModel';

export const approveArticle = async (articleId: string) => {
  const article = await Article.findByIdAndUpdate(articleId, { status: 'approved' }, { new: true });
  return article;
};
