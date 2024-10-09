import { ModerationService } from './moderation-service';
export declare class ModerationController {
    private readonly moderationService;
    constructor(moderationService: ModerationService);
    getPendingArticles(): Promise<import("../articles/article.schema").Article[]>;
    getPendingArticleCount(): Promise<number>;
    moderateArticle(id: string, status: 'moderated' | 'rejected'): Promise<import("../articles/article.schema").Article>;
}
