import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { AnalysisService } from './analysis-service';
import { Article } from '../articles/article.schema';

@Controller('api/analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get()
  async getModeratedArticles(): Promise<Article[]> {
    return this.analysisService.getModeratedArticles();
  }

  @Patch(':id')
  async analyzeArticle(
    @Param('id') id: string,
    @Body() analysisData: {
      sePractice: string;
      claim: string;
      evidenceResult: string;
      researchType: string;
      participants: string;
      researchEvidenceType: string;
      keyFindings: string;
      peerReviewed: boolean;
      publicationType: string;
    },
  ): Promise<Article> {
    return this.analysisService.analyzeArticle(id, analysisData);
  }
}
