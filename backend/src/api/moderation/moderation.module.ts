import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../articles/article.schema';
import { ModerationService } from './moderation-service';
import { ModerationController } from './moderation-controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
  providers: [ModerationService],
  controllers: [ModerationController],
})
export class ModerationModule {}
