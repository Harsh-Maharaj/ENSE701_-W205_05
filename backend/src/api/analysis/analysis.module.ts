import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../articles/article.schema';
import { AnalysisService } from './analysis-service';
import { AnalysisController } from './analysis-controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
  providers: [AnalysisService],
  controllers: [AnalysisController],
})
export class AnalysisModule {}
