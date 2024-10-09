import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';
export declare class SubmitterService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    getPendingArticles(): Promise<Article[]>;
    getRejectedArticles(): Promise<Article[]>;
    getModeratedArticles(): Promise<Article[]>;
    getModeratedAndRejectedArticleCount(): Promise<number>;
}
