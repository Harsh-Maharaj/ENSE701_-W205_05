import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { SubmitterService } from './submitter-service';

@Controller('api/submitter')
export class SubmitterController {
  constructor(private readonly submitterService: SubmitterService) {}

  @Get('pending')
  async getPendingArticles() {
    return this.submitterService.getPendingArticles();
  }

  @Get('rejected')
  async getRejectedArticles() {
    return this.submitterService.getRejectedArticles();
  }

  @Get('moderated')
  async getModeratedArticles() {
    return this.submitterService.getModeratedArticles();
  }

  @Get('all')
  async getAllArticles() {
    const pending = await this.submitterService.getPendingArticles();
    const rejected = await this.submitterService.getRejectedArticles();
    const moderated = await this.submitterService.getModeratedArticles();

    return [...pending, ...rejected, ...moderated];
  }

  @Get('moderated-rejected-count')
  async getModeratedAndRejectedArticleCount() {
    return this.submitterService.getModeratedAndRejectedArticleCount();
  }
}
