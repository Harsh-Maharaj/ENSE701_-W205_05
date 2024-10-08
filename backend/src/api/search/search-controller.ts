import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search-service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // Route to search articles based on filters
  @Post()
  async searchArticles(@Body() query: any) {
    return this.searchService.search(query);
  }
}
