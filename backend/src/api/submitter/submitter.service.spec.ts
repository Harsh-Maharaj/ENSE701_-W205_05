import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SubmitterService } from './submitter-service';
import { Article } from '../articles/article.schema';
import { Model } from 'mongoose';

/**
 * Unit tests for SubmitterService.
 * 
 * These tests verify that the methods in the SubmitterService work as expected
 * by querying and counting articles based on their status (e.g., pending, rejected, moderated).
 * 
 * - `mockArticleModel` simulates the Mongoose model for articles, mocking the 
 *   `find` and `countDocuments` methods.
 * - The tests ensure that articles with various statuses (submitted, rejected, moderated)
 *   are correctly retrieved and that the count of moderated and rejected articles is accurate.
 * 
 */


describe('SubmitterService', () => {
  let service: SubmitterService;
  let articleModel: Model<Article>;

  const mockArticleModel = {
    find: jest.fn(),
    countDocuments: jest.fn(),
  };

  beforeEach(async () => {
    const moduleBuilder = Test.createTestingModule({
      providers: [
        SubmitterService,
        {
          provide: getModelToken(Article.name),
          useValue: mockArticleModel,
        },
      ],
    })
    
    // Compile the module first
    const module: TestingModule = await moduleBuilder.compile();
    
    service = module.get<SubmitterService>(SubmitterService);
    articleModel = module.get<Model<Article>>(getModelToken(Article.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPendingArticles', () => {
    it('should return an array of pending articles', async () => {
      const pendingArticles = [{ title: 'Article 1' }, { title: 'Article 2' }];
      mockArticleModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(pendingArticles),
      });

      const result = await service.getPendingArticles();
      expect(result).toEqual(pendingArticles);
      expect(mockArticleModel.find).toHaveBeenCalledWith({ status: 'submitted' });
    });
  });

  describe('getRejectedArticles', () => {
    it('should return an array of rejected articles', async () => {
      const rejectedArticles = [{ title: 'Rejected Article 1' }];
      mockArticleModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(rejectedArticles),
      });

      const result = await service.getRejectedArticles();
      expect(result).toEqual(rejectedArticles);
      expect(mockArticleModel.find).toHaveBeenCalledWith({ status: 'rejected' });
    });
  });

  describe('getModeratedArticles', () => {
    it('should return an array of moderated articles', async () => {
      const moderatedArticles = [{ title: 'Moderated Article 1' }];
      mockArticleModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(moderatedArticles),
      });

      const result = await service.getModeratedArticles();
      expect(result).toEqual(moderatedArticles);
      expect(mockArticleModel.find).toHaveBeenCalledWith({ status: 'moderated' });
    });
  });

  describe('getModeratedAndRejectedArticleCount', () => {
    it('should return the count of rejected and moderated articles', async () => {
      const count = 5;
      mockArticleModel.countDocuments.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(count),
      });

      const result = await service.getModeratedAndRejectedArticleCount();
      expect(result).toBe(count);
      expect(mockArticleModel.countDocuments).toHaveBeenCalledWith({
        status: { $in: ['rejected', 'moderated'] },
      });
    });
  });
});
