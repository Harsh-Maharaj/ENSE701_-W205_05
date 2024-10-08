import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../articles/article.schema';
import { SearchService } from './search-service';
import { SearchController } from './search-controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
