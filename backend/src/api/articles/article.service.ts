import { Injectable } from '@nestjs/common';
/****************************************
 * `@Injectable()`: 
 * - This decorator marks the class as a provider that can be injected into other classes.
 * - Makes the class usable in other components and allows for dependency injection.
 ****************************************/

import { InjectModel } from '@nestjs/mongoose'; 
/****************************************
 * `@InjectModel()`:
 * - A decorator from Mongoose that injects the Mongoose model into the service.
 * - Allows the service to interact with a specific MongoDB collection defined by the model.
 ****************************************/

import { Model } from 'mongoose'; 
/****************************************
 * `Model`:
 * - Interface from Mongoose that provides methods to interact with the MongoDB database.
 * - Represents the structure and behavior of a MongoDB collection in your application.
 ****************************************/

import { Article, ArticleDocument } from './article.schema';
/****************************************
 * `Article` and `ArticleDocument`:
 * - `Article`: The class name from `article.schema`, representing the schema of the articles collection.
 * - `ArticleDocument`: A type alias for `HydratedDocument<Article>`, representing the document type for the article schema.
 ****************************************/

import { CreateArticleDto } from './create-article.dto'; 
/****************************************
 * `CreateArticleDto`: 
 * - A Data Transfer Object (DTO) that defines the shape of data required to create an article.
 * - Used for validating and transferring data within the application.
 ****************************************/

@Injectable()
export class ArticleService {
  /****************************************
   * Constructor:
   * - Injects the Mongoose model for the `Article` schema into the service.
   * 
   * `@InjectModel(Article.name)`:
   * - Allows the service to interact with the MongoDB collection specified by the article schema.
   * - Injects the model associated with the `Article` schema.
   * 
   * `private articleModel: Model<ArticleDocument>`:
   * - Declares a private property `articleModel` of type `Model<ArticleDocument>`.
   * - This property holds the Mongoose model instance that handles documents shaped like `ArticleDocument`.
   * - Allows interaction with the articles collection in MongoDB through the `articleModel` variable.
   ****************************************/
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  /****************************************
   * `create()` Method:
   * - An asynchronous method that creates a new article in the database.
   * 
   * `createArticleDto: CreateArticleDto`:
   * - Takes a `CreateArticleDto` object as input, which contains the data to create the article.
   * 
   * Returns:
   * - A Promise that resolves to the saved `Article` document.
   * 
   * Steps:
   * 1. Creates an instance of the article model using the data from `createArticleDto`.
   * 2. Saves the article to the database.
   * 3. Returns the saved document.
   ****************************************/
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const createdArticle = new this.articleModel({
        ...createArticleDto,
        status: 'submitted',  // Ensure articles start with the 'submitted' status
      });
      return await createdArticle.save();
    } catch (error) {
      console.error('Error creating article:', error);
      throw new Error('Error creating article');
    }
  }
  

  /****************************************
   * `findAll()` Method:
   * - An asynchronous method that retrieves all articles from the database.
   * 
   * Returns:
   * - A Promise that resolves to an array of `Article` documents.
   * 
   * Steps:
   * 1. Uses the `find()` method of the `articleModel` to get all articles.
   * 2. Executes the query with `.exec()` and returns the results.
   ****************************************/
  async findAll(): Promise<Article[]> {
    try {
      // Fetch only articles with status 'moderated' or 'analyzed'
      return await this.articleModel.find({ status: { $in: ['moderated', 'analyzed'] } }).exec();
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw new Error('Error fetching articles');
    }
  }
  

  /****************************************
   * `findOne()` Method:
   * - An asynchronous method that retrieves a single article by its ID from the database.
   * 
   * `id: string`:
   * - The ID of the article to find.
   * 
   * Returns:
   * - A Promise that resolves to the found `Article` document, or `null` if not found.
   * 
   * Steps:
   * 1. Uses the `findById()` method of the `articleModel` to find an article by its ID.
   * 2. Executes the query with `.exec()` and returns the result.
   ****************************************/
  async findOne(id: string): Promise<Article | null> {
    try {
      const article = await this.articleModel.findById(id).exec();  // Use await to wait for the findById operation
      if (!article) {
        console.warn(`Article with ID ${id} not found`);
      }
      return article;
    } catch (error) {
      console.error(`Error fetching article with ID ${id}:`, error);
      throw new Error(`Error fetching article with ID ${id}`);
    }
  }

  /****************************************
   * `update()` Method:
   * - An asynchronous method that updates an existing article in the database.
   * 
   * `id: string`:
   * - The ID of the article to update.
   * 
   * `createArticleDto: CreateArticleDto`:
   * - Contains the updated data for the article.
   * 
   * Returns:
   * - A Promise that resolves to the updated `Article` document.
   * 
   * Steps:
   * 1. Uses the `findByIdAndUpdate()` method of the `articleModel` to update the article by its ID.
   * 2. Passes the updated data (`createArticleDto`) and the `{ new: true }` option to return the updated document.
   * 3. Executes the query with `.exec()` and returns the result.
   ****************************************/
  async update(id: string, createArticleDto: CreateArticleDto): Promise<Article | null> {
    try {
      const updatedArticle = await this.articleModel.findByIdAndUpdate(id, createArticleDto, { new: true }).exec();
      
      if (!updatedArticle) {
        console.warn(`Article with ID ${id} not found`);
        return null;  // Return null if no article is found with the given ID
      }
  
      return updatedArticle;  // Return the updated article if found and updated
    } catch (error) {
      console.error(`Error updating article with ID ${id}:`, error);
      throw new Error(`Error updating article with ID ${id}`);  // Throw a new error with a custom message
    }
  }
  
  

  /****************************************
   * `delete()` Method:
   * - An asynchronous method that deletes an article from the database.
   * 
   * `id: string`:
   * - The ID of the article to delete.
   * 
   * Returns:
   * - A Promise that resolves to the deleted `Article` document, or `null` if not found.
   * 
   * Steps:
   * 1. Uses the `findByIdAndDelete()` method of the `articleModel` to delete the article by its ID.
   * 2. Executes the query with `.exec()` and returns the result.
   ****************************************/
  async delete(id: string): Promise<Article | null> {
    try {
      const deletedArticle = await this.articleModel.findByIdAndDelete(id).exec();
      
      if (!deletedArticle) {
        console.warn(`Article with ID ${id} not found`);
        return null;  // Return null if no article is found with the given ID
      }
  
      return deletedArticle;  // Return the deleted article if it was found and deleted
    } catch (error) {
      console.error(`Error deleting article with ID ${id}:`, error);
      throw new Error(`Error deleting article with ID ${id}`);  // Throw a new error with a custom message
    }
  }
}  
