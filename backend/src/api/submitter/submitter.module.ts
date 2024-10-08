import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../articles/article.schema';
import { SubmitterService } from './submitter-service';
import { SubmitterController } from './submitter-controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [SubmitterService],
  controllers: [SubmitterController],
})
export class SubmitterModule {}
