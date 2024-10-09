import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';
export declare class ModerationService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    getPendingArticles(): Promise<Article[]>;
    getPendingArticleCount(): Promise<number>;
    moderateArticle(id: string, status: 'moderated' | 'rejected'): Promise<Article>;
}
