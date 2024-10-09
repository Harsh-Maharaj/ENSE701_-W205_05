import { SearchService } from './search-service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    searchArticles(query: any): Promise<import("../articles/article.schema").Article[]>;
}
