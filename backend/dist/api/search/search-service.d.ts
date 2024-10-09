import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';
export declare class SearchService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    search(query: any): Promise<Article[]>;
}
