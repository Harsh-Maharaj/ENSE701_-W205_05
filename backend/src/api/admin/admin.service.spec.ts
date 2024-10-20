import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AdminService } from './admin-service';
import { Article } from '../articles/article.schema';
import { Model } from 'mongoose';

/**
 * Unit tests for AdminService.
 * 
 * These tests verify the functionality of the `AdminService`, focusing on operations 
 * like retrieving, updating, and deleting articles from the database.
 * 
 * - `mockArticleModel` simulates the Mongoose model for articles, mocking the 
 *   `find`, `findByIdAndUpdate`, and `findByIdAndDelete` methods.
 * - The tests ensure that the service can retrieve all articles, update a specific 
 *   article, and delete an article, returning the expected results.
 * 
 */


describe('AdminService', () => {
  let service: AdminService;
  let articleModel: Model<Article>;

  const mockArticleModel = {
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getModelToken(Article.name),
          useValue: mockArticleModel,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    articleModel = module.get<Model<Article>>(getModelToken(Article.name));
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const articles = [{ title: 'Article 1' }, { title: 'Article 2' }];
      mockArticleModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(articles),
      });

      const result = await service.findAll();
      expect(result).toEqual(articles);
      expect(mockArticleModel.find).toHaveBeenCalled();
    });
  });

  describe('updateArticle', () => {
    it('should update the article and return the updated document', async () => {
      const articleId = 'articleId123';
      const updateData = { title: 'Updated Title' };
      const updatedArticle = { title: 'Updated Title', _id: articleId };

      mockArticleModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(updatedArticle),
      });

      const result = await service.updateArticle(articleId, updateData);
      expect(result).toEqual(updatedArticle);
      expect(mockArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(
        articleId,
        updateData,
        { new: true },
      );
    });
  });

  describe('deleteArticle', () => {
    it('should delete the article and return the deleted document', async () => {
      const articleId = 'articleId123';
      const deletedArticle = { title: 'Deleted Article', _id: articleId };

      mockArticleModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(deletedArticle),
      });

      const result = await service.deleteArticle(articleId);
      expect(result).toEqual(deletedArticle);
      expect(mockArticleModel.findByIdAndDelete).toHaveBeenCalledWith(articleId);
    });

    it('should return null if the article is not found', async () => {
      const articleId = 'nonexistentId';

      mockArticleModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const result = await service.deleteArticle(articleId);
      expect(result).toBeNull();
      expect(mockArticleModel.findByIdAndDelete).toHaveBeenCalledWith(articleId);
    });
  });
});
