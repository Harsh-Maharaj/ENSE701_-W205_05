import { AdminService } from './admin-service';
import { Article } from '../articles/article.schema';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllArticles(): Promise<Article[]>;
    updateArticle(id: string, updateData: any): Promise<Article>;
    deleteArticle(id: string): Promise<Article>;
}
