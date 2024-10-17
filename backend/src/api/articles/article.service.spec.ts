import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ArticleService } from './article.service';
import { Article } from './article.schema';
import { CreateArticleDto } from './create-article.dto';
import { Model } from 'mongoose';

/**
 * Unit tests for ArticleService.
 * 
 * The purpose of these tests is to verify that the `create` method in the 
 * ArticleService works as expected.
 * 
 * - `mockArticle` provides sample article data used for testing.
 * - `mockArticleModel` mocks the Mongoose model and its `save` method.
 * - The test verifies that an article can be created using valid input (CreateArticleDto) 
 *   and checks if the created article matches the expected mock data.
 * 
 */

describe('ArticleService', () => {
  let service: ArticleService;
  let model: Model<Article>;

  // Mock data for article
  const mockArticle = {
    title: 'Test Title',
    authors: ['Test Author'],
    source: 'Test Source',
    pubyear: 2024,
    doi: '10.1234/techjournal.2024.dto',
    claim: 'DTOs simplify data validation',
    evidence: 'Numerous case studies support this',
    save: jest.fn().mockResolvedValue({
      _id: '1',
      title: 'Test Title',
      authors: ['Test Author'],
      source: 'Test Source',
      pubyear: 2024,
      doi: '10.1234/techjournal.2024.dto',
      claim: 'DTOs simplify data validation',
      evidence: 'Numerous case studies support this',
    }),
  };

  // Mock the Mongoose model's functions
  const mockArticleModel = jest.fn(() => ({
    save: mockArticle.save,
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getModelToken(Article.name),
          useValue: mockArticleModel,
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    model = module.get<Model<Article>>(getModelToken(Article.name));
  });

  it('should create an article', async () => {
    const articleData: CreateArticleDto = {
      title: 'Test Title',
      authors: ['Test Author'],
      source: 'Test Source',
      pubyear: 2024,
      doi: '10.1234/techjournal.2024.dto',
      claim: 'DTOs simplify data validation',
      evidence: 'Numerous case studies support this',
    };

    const createdArticle = await service.create(articleData);
    expect(createdArticle).toEqual({
      _id: '1',
      title: 'Test Title',
      authors: ['Test Author'],
      source: 'Test Source',
      pubyear: 2024,
      doi: '10.1234/techjournal.2024.dto',
      claim: 'DTOs simplify data validation',
      evidence: 'Numerous case studies support this',
    });
  });

});
