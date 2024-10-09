import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';
export declare class AdminService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    findAll(): Promise<Article[]>;
    updateArticle(id: string, updateData: any): Promise<Article>;
    deleteArticle(id: string): Promise<Article | null>;
}
