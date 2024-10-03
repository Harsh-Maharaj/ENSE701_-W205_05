// Search Route test
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import Article from '../models/Article';
import searchRouter from '../routes/search';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const app = express();
app.use(express.json());
app.use('/api/search', searchRouter);

describe('GET /api/search', () => {
  beforeAll(async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_TEST_USERNAME}:${process.env.MONGO_TEST_PASSWORD}@testcluster0.pza3q.mongodb.net/?retryWrites=true&w=majority&appName=testCluster0`);
    await Article.create([
      { title: 'JavaScript Basics', authors: 'John Doe', publication_year: '2020', status: 'published' },
      { title: 'Advanced React', authors: 'Jane Smith', publication_year: '2019', status: 'published' },
      { title: 'Node.js Patterns', authors: 'John Doe', publication_year: '2018', status: 'published' },
    ]);
  }, 30000); 

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }, 30000); // Increase timeout for the afterAll hook

  it('should return articles matching the search query in title', async () => {
    const res = await request(app).get('/api/search?q=JavaScript');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1); // Should return 'JavaScript Basics'
    expect(res.body[0].title).toBe('JavaScript Basics');
  });

  it('should return articles in a case-insensitive manner', async () => {
    const res = await request(app).get('/api/search?q=javascript');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1); // Should return 'JavaScript Basics'
    expect(res.body[0].title).toBe('JavaScript Basics');
  });
  

  it('should return articles matching the search query in authors', async () => {
    const res = await request(app).get('/api/search?q=John Doe');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2); // Should return 2 articles authored by John Doe
  });

  it('should return articles matching partial authors query', async () => {
    const res = await request(app).get('/api/search?q=John');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2); // Should return 2 articles authored by John Doe
    expect(res.body[0].authors).toContain('John Doe');
  });

  it('should handle special characters in search query', async () => {
    const res = await request(app).get('/api/search?q=Node.js');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1); // Should return Node.js Patterns
    expect(res.body[0].title).toBe('Node.js Patterns');
  });  

  it('should return articles matching the search query in publication year', async () => {
    const res = await request(app).get('/api/search?q=2019');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].publication_year).toBe(2019); 
  });  

  it('should return 400 if search query is not provided', async () => {
    const res = await request(app).get('/api/search');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Search query parameter "q" is required');
  });

  it('should return an empty array if no articles match the search query', async () => {
    const res = await request(app).get('/api/search?q=NonExistentTerm');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });

  it('should return an empty array when no articles are in the database', async () => {
    // Drop the database to ensure it's empty
    await mongoose.connection.dropDatabase();
  
    const res = await request(app).get('/api/search?q=JavaScript');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
  
}, 30000); 
