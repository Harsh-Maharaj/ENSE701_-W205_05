import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AnalysisService } from './analysis-service';
import { Article } from '../articles/article.schema';
import { Model } from 'mongoose';

/**
 * Unit tests for AnalysisService.
 * 
 * These tests verify that the `getModeratedArticles` and `analyzeArticle` methods 
 * in the AnalysisService function as expected.
 * 
 * - `mockArticleModel` mocks the Mongoose model for articles, simulating the 
 *   `find` and `findByIdAndUpdate` methods.
 * - The tests ensure that the service methods properly query and update article 
 *   data based on moderation and analysis processes.
 * 
 */

describe('AnalysisService', () => {
  let service: AnalysisService;
  let articleModel: Model<Article>;

  const mockArticleModel = {
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalysisService,
        {
          provide: getModelToken(Article.name),
          useValue: mockArticleModel,
        },
      ],
    }).compile();

    service = module.get<AnalysisService>(AnalysisService);
    articleModel = module.get<Model<Article>>(getModelToken(Article.name));
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getModeratedArticles', () => {
    it('should return an array of moderated articles', async () => {
      const moderatedArticles = [{ title: 'Moderated Article 1', status: 'moderated' }];
      mockArticleModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(moderatedArticles),
      });

      const result = await service.getModeratedArticles();
      expect(result).toEqual(moderatedArticles);
      expect(mockArticleModel.find).toHaveBeenCalledWith({ status: 'moderated' });
    });
  });

  describe('analyzeArticle', () => {
    it('should analyze the article and update its fields', async () => {
      const articleId = 'articleId123';
      const analysisData = {
        sePractice: 'Test Practice',
        claim: 'Test Claim',
        evidenceResult: 'Test Evidence',
        researchType: 'Empirical Study',
        participants: '100 participants',
        researchEvidenceType: 'Case Study',
        keyFindings: 'Significant improvement',
        peerReviewed: true,
        publicationType: 'Journal',
      };

      const updatedArticle = { 
        ...analysisData, 
        status: 'analyzed', 
        _id: articleId 
      };

      mockArticleModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(updatedArticle),
      });

      const result = await service.analyzeArticle(articleId, analysisData);
      expect(result).toEqual(updatedArticle);
      expect(mockArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(
        articleId,
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
        { new: true },
      );
    });
  });
});
