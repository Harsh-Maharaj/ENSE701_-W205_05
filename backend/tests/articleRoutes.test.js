import request from 'supertest';
import express from 'express';
import router from '../routes/articles.js';
import Article from '../models/Article.js';

jest.mock('../models/Article.js');

const app = express();
app.use(express.json());
app.use('/api/articles', router);

describe('GET /api/articles/published', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all published articles', async () => {
    const mockArticles = [
      { _id: '1', title: 'Article 1', status: 'published' },
      { _id: '2', title: 'Article 2', status: 'published' },
    ];
    Article.find.mockResolvedValue(mockArticles);

    const response = await request(app).get('/api/articles/published');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockArticles);
    expect(Article.find).toHaveBeenCalledWith({ status: 'published' });
  });

});

describe('POST /api/articles', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new article', async () => {
    // Mock article data
    const mockArticleData = {
      title: 'New Article',
      authors: ['Author 1'],
      source: 'Source',
      journal: 'Journal',
      se_practice: 'Practice',
      research_type: 'Type',
      publication_year: 2021,
      volume: '1',
      number: '1',
      pages: '1-10',
      doi: '10.1000/xyz123',
      summary: 'Summary',
      claim: 'Claim',
      linked_discussion: 'Discussion',
    };

    // Mock the Article constructor and save method
    Article.mockImplementation(function (articleData) {
      return {
        ...articleData,
        status: 'pending',
        save: jest.fn().mockImplementation(function () {
          this._id = '1';
          return Promise.resolve(this);
        }),
      };
    });

    // Make a request to the endpoint
    const response = await request(app).post('/api/articles').send(mockArticleData);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      _id: '1',
      ...mockArticleData,
      status: 'pending',
    });
    expect(Article).toHaveBeenCalledWith({
      ...mockArticleData,
      status: 'pending',
    });
  });
});


describe('GET /api/articles/:id', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an article by ID', async () => {
    // Mock the Article.findById method
    const mockArticle = { _id: '1', title: 'Article 1' };
    Article.findById.mockResolvedValue(mockArticle);

    // Make a request to the endpoint
    const response = await request(app).get('/api/articles/1');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockArticle);
    expect(Article.findById).toHaveBeenCalledWith('1');
  });

  it('should return 404 if the article is not found', async () => {
    // Mock the Article.findById method to return null
    Article.findById.mockResolvedValue(null);

    // Make a request to the endpoint
    const response = await request(app).get('/api/articles/1');

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Article not found');
    expect(Article.findById).toHaveBeenCalledWith('1');
  });

  it('should handle errors when creating a new article', async () => {
    // Mock the Article constructor and save method to throw an error
    Article.mockImplementation(function () {
      return {
        save: jest.fn().mockRejectedValue(new Error('Database Error')),
      };
    });

    // Make a request to the endpoint
    const response = await request(app).post('/api/articles').send({});

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Error saving the article');
    expect(Article).toHaveBeenCalledWith({
      status: 'pending',
    });
  });
});
