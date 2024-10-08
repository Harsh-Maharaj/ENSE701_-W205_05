import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './article.schema';

//it is like a budle that contains all the related components.

/****************************************
 * `@Module()`:
 * - The `@Module()` decorator defines a NestJS module.
 * - Modules are the main building blocks of a NestJS application and are used to organize the structure.
 * - In this module, we group the article-related logic (controller, service, and schema).
 ****************************************/
@Module({
  /****************************************
   * `imports: [ ... ]`:
   * - The `imports` array is used to import other modules that are required by this module.
   * - In this case, we are importing the MongooseModule for the `Article` model.
   ****************************************/
  imports: [
    /****************************************
     * `MongooseModule.forFeature()`:
     * - Registers the `Article` model and schema with Mongoose for this module.
     * - This allows the `ArticleService` to interact with the MongoDB database using the `Article` collection.
     * 
     * `[{ name: Article.name, schema: ArticleSchema }]`:
     * - Registers the `Article` model with its schema.
     * - `name: Article.name`: Specifies the name of the model, which is the `name` property from the `Article` class. This represents the MongoDB collection.
     * - `schema: ArticleSchema`: Specifies the schema for the model, which defines the structure and validation for the `Article` documents in the database.
     ****************************************/
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  
  /****************************************
   * `controllers: [ArticleController]`:
   * - The `controllers` array defines which controllers belong to this module.
   * - Controllers are responsible for handling incoming HTTP requests and sending responses to the client.
   * - The `ArticleController` manages the routing for all HTTP requests related to articles (e.g., GET, POST, PUT, DELETE requests).
   ****************************************/
  controllers: [ArticleController],

  /****************************************
   * `providers: [ArticleService]`:
   * - The `providers` array lists the services (and other providers) that are available within this module.
   * - Services contain the business logic and are used by the controllers to perform operations (e.g., interact with the database).
   * - The `ArticleService` is the provider that handles the actual operations for creating, reading, updating, and deleting articles in the MongoDB database.
   * 
   * Dependency Injection:
   * - The service is injected into the controller, allowing the controller to use the service's methods for handling the business logic.
   ****************************************/
  providers: [ArticleService],
})
/****************************************
 * `export class ArticleModule`:
 * - Defines the `ArticleModule` class, which encapsulates all the article-related logic (controller, service, and Mongoose model).
 * - This module is imported into other parts of the application to manage articles.
 ****************************************/
export class ArticleModule {}
