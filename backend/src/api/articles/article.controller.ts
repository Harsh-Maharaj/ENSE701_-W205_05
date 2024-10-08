import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';

//-----------------------Combination of service and controller--------------------
 //The service in NestJS is where the actual business logic and implementation of the application's core functionality take place
// The controller is responsible for handling incoming HTTP requests and routing them to the appropriate service methods. It doesn’t implement any business logic itself, but rather delegates that work to the service.

/****************************************
 * `@Controller('api/articles')`: 
 * - This decorator marks the class as a NestJS controller.
 * - It maps the incoming HTTP requests to specific handler methods.
 * - The route prefix `api/articles` means all the routes inside this controller will have `/api/articles` as their base path.
 ****************************************/
@Controller('api/articles')
export class ArticleController {
  
  /****************************************
   * Constructor:
   * - Injects the `ArticleService` into the controller so it can delegate business logic.
   * 
   * `private readonly articleService: ArticleService`: 
   * - Declares a private and readonly property to hold the injected service.
   * - Allows interaction with the service to perform CRUD operations.
   ****************************************/
  constructor(private readonly articleService: ArticleService) {}

  /****************************************
   * `@Get()`:
   * - Maps HTTP GET requests to `/api/articles` to this method.
   * - Fetches all articles by delegating the request to the `findAll()` method in the `ArticleService`.
   * 
   * Returns:
   * - A list of all articles from the database.
   * 
   * any get request to prefix /api/articles will trgger this method
   ****************************************/
  @Get()
  async findAll() {
    return this.articleService.findAll();  // Call the service to get all articles
  }

  /****************************************
   * `@Get(':id')`:
   * - Maps HTTP GET requests to `/api/articles/:id` to this method.
   * - Fetches a single article by its ID by delegating the request to the `findOne()` method in the `ArticleService`.
   * 
   * `@Param('id') id: string`: 
   * - Extracts the `id` parameter from the URL and passes it to the method.
   * 
   * Returns:
   * - The article that matches the provided ID, or `null` if not found.
   * 
   *  whenever there is an get request with id, it trigger this method and extract the id and pass it to string id varibale and run the method
   ****************************************/
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);  // Call the service to get the article by its ID
  }

  /****************************************
   * `@Post()`:
   * - Maps HTTP POST requests to `/api/articles` to this method.
   * - Creates a new article by delegating the request to the `create()` method in the `ArticleService`.
   * 
   * `@Body() createArticleDto: CreateArticleDto`: 
   * - Extracts the article data from the request body and maps it to the `CreateArticleDto` object.
   * - Ensures the incoming data conforms to the DTO structure.
   * 
   * Returns:
   * - The newly created article.
   * 
   * whenever there is a post method to the prefix api/articles, this method triggers。
   ****************************************/
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);  // Call the service to create a new article
  }

  /****************************************
   * `@Put(':id')`:
   * - Maps HTTP PUT requests to `/api/articles/:id` to this method.
   * - Updates an existing article by delegating the request to the `update()` method in the `ArticleService`.
   * 
   * `@Param('id') id: string`: 
   * - Extracts the `id` parameter from the URL to identify which article to update.--post request contains the body in json form
   * 
   * `@Body() createArticleDto: CreateArticleDto`: 
   * - Extracts the updated article data from the request body and maps it to the `CreateArticleDto` object.
   * 
   * Returns:
   * - The updated article, or `null` if no article with the given ID was found.
   * 
   * PUT /api/articles/12345--example url
   ****************************************/
  @Put(':id')
  async update(@Param('id') id: string, @Body() createArticleDto: CreateArticleDto) {
    return this.articleService.update(id, createArticleDto);  // Call the service to update the article by ID
  }

  /****************************************
   * `@Delete(':id')`:
   * - Maps HTTP DELETE requests to `/api/articles/:id` to this method.
   * - Deletes an article by delegating the request to the `delete()` method in the `ArticleService`.
   * 
   * `@Param('id') id: string`: 
   * - Extracts the `id` parameter from the URL to identify which article to delete.
   * 
   * Returns:
   * - The deleted article, or `null` if no article with the given ID was found.
   ****************************************/
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.articleService.delete(id);  // Call the service to delete the article by ID
  }
}
