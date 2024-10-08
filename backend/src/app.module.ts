import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './api/articles/article.module'; // Already added
import { ConfigModule, ConfigService } from '@nestjs/config';

// Import the new modules
import { SubmitterModule } from './api/submitter/submitter.module';
import { ModerationModule } from './api/moderation/moderation.module';
import { AnalysisModule } from './api/analysis/analysis.module';
import { SearchModule } from './api/search/search.module';
import { AdminModule } from './api/admin/admin.module';

/****************************************
 * `@Module()`:
 * - This decorator defines the root module of the application.
 * - Modules are used to organize the application by grouping related controllers, services, and providers.
 * - This `AppModule` is the entry point of the application and integrates all required modules.
 ****************************************/
@Module({
  /****************************************
   * `imports: [ ... ]`:
   * - The `imports` array defines the modules required by this module.
   * - This section brings in other modules that will be used throughout the application, like configuration and database modules.
   ****************************************/
  imports: [
    /****************************************
     * `ConfigModule.forRoot()`:
     * - Imports the configuration module to handle application configuration.
     * - `forRoot()` loads environment variables from a `.env` file and makes them accessible globally via `ConfigService`.
     * - This is essential for managing configuration values (like the MongoDB URI) throughout the app.
     ****************************************/
    ConfigModule.forRoot(),

    /****************************************
     * `ArticleModule`:
     * - This module encapsulates all the logic related to articles, such as routes, controllers, services, and schema.
     * - By importing `ArticleModule` here, we integrate all article-related functionality into the main application.
     * - It allows the `AppModule` to expose the article-related routes, controllers, and services.
     ****************************************/
    ArticleModule,

    /****************************************
     * `ModerationModule`:
     * - This module encapsulates all the logic related to article moderation.
     * - It includes routes, controllers, services, and schema specific to moderation.
     ****************************************/
    ModerationModule,

    /****************************************
     * `AnalysisModule`:
     * - This module encapsulates all the logic related to article analysis.
     * - It includes routes, controllers, services, and schema specific to analysis.
     ****************************************/
    AnalysisModule,

    /****************************************
     * `SearchModule`:
     * - This module encapsulates all the logic related to searching articles.
     * - It includes routes, controllers, services, and schema specific to search functionality.
     ****************************************/
    SearchModule,

    /****************************************
     * `AdminModule`:
     * - This module encapsulates all the logic related to admin operations (update, delete).
     * - It includes routes, controllers, services, and schema specific to admin actions.
     ****************************************/
    AdminModule,

    /****************************************
     * `MongooseModule.forRootAsync()`:
     * - This sets up the connection to the MongoDB database using the Mongoose library.
     * - `forRootAsync()` allows for asynchronous configuration, which is useful when the configuration (e.g., the DB URI) needs to be loaded dynamically, like from environment variables.
     *
     * `imports: [ConfigModule]`:
     * - Imports the `ConfigModule` to access environment variables (like `DB_URI`) through the `ConfigService`.
     ****************************************/

    SubmitterModule,

    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to access environment variables

      /****************************************
       * `useFactory: async (configService: ConfigService) => { ... }`:
       * - This is an asynchronous factory function that provides the MongoDB connection configuration.
       * - The `ConfigService` is injected to retrieve environment variables, such as the `DB_URI`.
       * - `configService.get<string>('DB_URI')`: Retrieves the MongoDB URI from environment variables.
       * - Returns an object containing the connection configuration for Mongoose, specifically the MongoDB URI.
       *
       * `Logger.log()`:
       * - Logs the MongoDB connection URI for debugging purposes.
       ****************************************/
      useFactory: async (configService: ConfigService) => {
        const dbUri = configService.get<string>('DB_URI'); // Retrieve MongoDB URI from the environment
        Logger.log(`Connecting to database at ${dbUri}`, 'MongooseModule'); // Log the database URI for transparency
        return { uri: dbUri }; // Return the MongoDB connection configuration
      },

      /****************************************
       * `inject: [ConfigService]`:
       * - Injects the `ConfigService` into the `useFactory` function.
       * - The `ConfigService` is used to access the configuration values (e.g., environment variables) within the factory function.
       ****************************************/
      inject: [ConfigService],
    }),
  ],

  /****************************************
   * `controllers: [AppController]`:
   * - The `controllers` array defines the controllers associated with this module.
   * - The `AppController` handles the HTTP requests at the root level of the application.
   * - Controllers receive incoming requests, delegate tasks to services, and return responses to clients.
   ****************************************/
  controllers: [AppController],

  /****************************************
   * `providers: [AppService]`:
   * - The `providers` array lists all the services available in this module.
   * - `AppService` contains the business logic related to the main application.
   * - Services are injectable and can be used by controllers to perform tasks (e.g., handling requests, business logic).
   ****************************************/
  providers: [AppService],
})

/****************************************
 * `export class AppModule`:
 * - The `AppModule` is the root module of the NestJS application.
 * - It imports other feature modules (like `ArticleModule`), sets up the MongoDB connection using Mongoose, and defines global configurations.
 * - This module serves as the entry point for the application.
 ****************************************/
export class AppModule {}
