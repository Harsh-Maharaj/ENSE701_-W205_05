import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SearchService } from './search-service';
import { Article } from '../articles/article.schema';
import { Model } from 'mongoose';

/**
 * Unit tests for SearchService.
 * 
 * The purpose of these tests is to verify that the `search` method in the 
 * SearchService works as expected by using various filters such as title, 
 * author, year, and popularity.
 * 
 * - `mockArticleModel` mocks the Mongoose model and its `find` method.
 * - The tests ensure that search queries are correctly handled and that the 
 *   correct Mongoose query is used for each filter.
 * 
 */

describe('SearchService', () => {
  let service: SearchService;
  let articleModel: Model<Article>;

  const mockArticleModel = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: getModelToken(Article.name),
          useValue: mockArticleModel,
        },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
    articleModel = module.get<Model<Article>>(getModelToken(Article.name));
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('should search by title', async () => {
      const query = { filterBy: 'title', query: 'Test Title' };
      const articles = [{ title: 'Test Title' }];
      mockArticleModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(articles),
      });

      const result = await service.search(query);
      expect(result).toEqual(articles);
      expect(mockArticleModel.find).toHaveBeenCalledWith({
        title: { $regex: query.query, $options: 'i' },
      });
    });

    it('should search by author', async () => {
      const query = { filterBy: 'author', query: 'John Doe' };
      const articles = [{ authors: 'John Doe' }];
      mockArticleModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(articles),
      });

      const result = await service.search(query);
      expect(result).toEqual(articles);
      expect(mockArticleModel.find).toHaveBeenCalledWith({
        authors: { $regex: query.query, $options: 'i' },
      });
    });

    it('should search by year', async () => {
      const query = { filterBy: 'year', query: 2022 };
      const articles = [{ pubyear: 2022 }];
      mockArticleModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(articles),
      });

      const result = await service.search(query);
      expect(result).toEqual(articles);
      expect(mockArticleModel.find).toHaveBeenCalledWith({ pubyear: query.query });
    });

    it('should search by popularity', async () => {
      const query = { filterBy: 'popularity', query: 100 };
      const articles = [{ popularity: 150 }];
      mockArticleModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(articles),
      });

      const result = await service.search(query);
      expect(result).toEqual(articles);
      expect(mockArticleModel.find).toHaveBeenCalledWith({
        popularity: { $gte: query.query },
      });
    });

    it('should return all articles if no filter is provided', async () => {
      const query = { filterBy: '', query: '' };
      const articles = [{ title: 'Test Article' }];
      mockArticleModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(articles),
      });

      const result = await service.search(query);
      expect(result).toEqual(articles);
      expect(mockArticleModel.find).toHaveBeenCalledWith({});
    });
  });
});
