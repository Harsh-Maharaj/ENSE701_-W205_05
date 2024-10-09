import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    findAll(): Promise<import("./article.schema").Article[]>;
    findOne(id: string): Promise<import("./article.schema").Article>;
    create(createArticleDto: CreateArticleDto): Promise<import("./article.schema").Article>;
    update(id: string, createArticleDto: CreateArticleDto): Promise<import("./article.schema").Article>;
    delete(id: string): Promise<import("./article.schema").Article>;
}
