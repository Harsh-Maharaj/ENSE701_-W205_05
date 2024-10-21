import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

/****************************************
 * `dotenv.config()`:
 * - Loads environment variables from a `.env` file into `process.env`.
 * - This allows access to environment variables (such as `DB_URI` and `PORT`) throughout the application.
 * - Ensures that configuration data (like database URIs, API keys) are loaded from the environment.
 ****************************************/
dotenv.config();

async function bootstrap() {
  /****************************************
   * `const dbUri = process.env.DB_URI`:
   * - Retrieves the MongoDB URI from environment variables.
   * - `process.env.DB_URI` refers to the `DB_URI` variable in the `.env` file.
   * - This is used later to connect to the MongoDB database.
   ****************************************/
  
  const dbUri = process.env.DB_URI;
  


  /****************************************
   * `Logger.log()`:
   * - Logs the MongoDB URI to ensure it was loaded correctly.
   * - `Logger` is a utility provided by NestJS for logging purposes.
   ****************************************/
  const logger = new ConsoleLogger('Bootstrap');
  logger.log(`DB_URI: ${dbUri}`);

  try {
    /****************************************
     * `mongoose.connect(dbUri, { serverSelectionTimeoutMS: 5000 })`:
     * - Establishes a connection to the MongoDB database using Mongoose.
     * - `dbUri` is the MongoDB connection string retrieved from environment variables.
     * - `serverSelectionTimeoutMS: 5000`: Sets the timeout to 5 seconds for the database connection.
     * - If the connection is successful, a success message is logged.
     ****************************************/
    await mongoose.connect(dbUri, { serverSelectionTimeoutMS: 5000 });
    logger.log('Database connected successfully');
  } catch (err) {
    /****************************************
     * Error Handling:
     * - If there is an error while connecting to the database, it logs the error message.
     * - `Logger.error()` is used to log error details for debugging.
     ****************************************/
    logger.error('Database connection error:', err.message);
  }

  /****************************************
   * `NestFactory.create(AppModule)`:
   * - Creates an instance of the NestJS application using the `AppModule`.
   * - `AppModule` is the root module of the application, which bootstraps the entire app.
   * 
   * it is like engine starter that starts the whole nest application based on the components in AppModule like controller and service. just initialize the instance of the nest.js application and hold, but not start listening the request yet, the listening happens below in the last line.
   ****************************************/
  const app = await NestFactory.create(AppModule);

  /****************************************
   * By default, a web page can only make requests to the same domain it was loaded from. CORS allows you to relax this rule and let your server accept requests from other websites.
   * CORS lets other websites talk to your server. This line says:
   * "I’m allowing all websites to send requests to my server."
   * "I’m also allowing requests with user authentication info (like cookies) to be sent."
   ****************************************/
  // Enable CORS for your frontend domain
  app.enableCors(); // This enables CORS for all origins

  

  /****************************************
   * `const port = process.env.PORT || 8082`:
   * - Retrieves the port number from the environment variables (`PORT`).
   * - If no port is specified in the environment, it defaults to port `8082`.
   ****************************************/

  await app.listen(3000); // You don't need to specify a port number when deployed on Vercel
};
/****************************************
 * `bootstrap()`:
 * - The `bootstrap()` function is the entry point of the application. when you npm start, it execute the main.ts file first and trigger this method.
 * - It initializes the MongoDB connection, configures the NestJS application, and starts the server.
 ****************************************/
bootstrap();
