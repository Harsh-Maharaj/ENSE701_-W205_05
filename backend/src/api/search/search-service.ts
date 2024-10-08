import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';

@Injectable()
export class SearchService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  // Perform a search with filters like title, author, popularity, year
  async search(query: any): Promise<Article[]> {
    let searchCriteria = {};

    // Apply different search criteria based on the filterBy value
    switch (query.filterBy) {
      case 'title':
        searchCriteria = { title: { $regex: query.query, $options: 'i' } }; // Case-insensitive search for title
        break;
      case 'author':
        searchCriteria = { authors: { $regex: query.query, $options: 'i' } }; // Search for author
        break;
      case 'year':
        searchCriteria = { pubyear: query.query }; // Exact match for publication year
        break;
      case 'popularity':
        // Assuming you have a 'popularity' field in your Article schema
        searchCriteria = { popularity: { $gte: query.query } }; // Filter by popularity (greater than or equal)
        break;
      default:
        break;
    }

    return this.articleModel
      .find(searchCriteria)
      .exec();
  }
}
