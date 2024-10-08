import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../articles/article.schema';
import { AdminService } from './admin-service';
import { AdminController } from './admin-controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
