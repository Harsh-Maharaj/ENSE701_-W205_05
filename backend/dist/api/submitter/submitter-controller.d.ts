import { SubmitterService } from './submitter-service';
export declare class SubmitterController {
    private readonly submitterService;
    constructor(submitterService: SubmitterService);
    getPendingArticles(): Promise<import("../articles/article.schema").Article[]>;
    getRejectedArticles(): Promise<import("../articles/article.schema").Article[]>;
    getModeratedArticles(): Promise<import("../articles/article.schema").Article[]>;
    getAllArticles(): Promise<import("../articles/article.schema").Article[]>;
    getModeratedAndRejectedArticleCount(): Promise<number>;
}
