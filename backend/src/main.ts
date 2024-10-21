import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Server } from 'http';

dotenv.config();

async function bootstrap(): Promise<Server> {
  const dbUri = process.env.DB_URI;
  const logger = new ConsoleLogger('Bootstrap');

  try {
    await mongoose.connect(dbUri, { serverSelectionTimeoutMS: 5000 });
    logger.log('Database connected successfully');
  } catch (err) {
    logger.error('Database connection error:', err.message);
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });

  const port = process.env.PORT || 8082;
  const server = await app.listen(port);
  logger.log(`Server running on port ${port}`);

  return server;
}

// Export the server to work in a serverless environment
export default bootstrap();
