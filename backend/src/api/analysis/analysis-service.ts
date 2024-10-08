import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';

@Injectable()
export class AnalysisService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  // Get all articles with status 'moderated'
  async getModeratedArticles(): Promise<Article[]> {
    return this.articleModel.find({ status: 'moderated' }).exec();
  }

  // Analyze the article by updating its claim, evidence, and status to 'analyzed'
  // Ensure all fields are included
async analyzeArticle(
  id: string,
  analysisData: {
    sePractice: string;
    claim: string;
    evidenceResult: string;
    researchType: string;
    participants: string;
    researchEvidenceType: string;
    keyFindings: string;
    peerReviewed: boolean;
    publicationType: string;
  }
): Promise<Article> {
  console.log('Analyzing article with data:', analysisData);

  return this.articleModel.findByIdAndUpdate(
    id,
    {
      sePractice: analysisData.sePractice,
      claim: analysisData.claim,
      evidenceResult: analysisData.evidenceResult,
      researchType: analysisData.researchType,
      participants: analysisData.participants,
      researchEvidenceType: analysisData.researchEvidenceType,
      keyFindings: analysisData.keyFindings,
      peerReviewed: analysisData.peerReviewed,
      publicationType: analysisData.publicationType,
      status: 'analyzed',
    },
    { new: true }
  ).exec();
}

}
