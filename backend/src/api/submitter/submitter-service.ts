import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';

@Injectable()
export class SubmitterService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  //at the moment, we assume that all articles are submitted by the same submitter, hence we show all the submitted, rejected and moderated articles.

  async getPendingArticles(): Promise<Article[]> {
    return this.articleModel.find({ status: 'submitted' }).exec();
  }

  async getRejectedArticles(): Promise<Article[]> {
    return this.articleModel.find({ status: 'rejected' }).exec(); //
  }

  async getModeratedArticles(): Promise<Article[]> {
    return this.articleModel.find({ status: 'moderated' }).exec();
  }

  async getModeratedAndRejectedArticleCount(): Promise<number> {
    return await this.articleModel
      .countDocuments({ status: { $in: ['rejected', 'moderated'] } })
      .exec();
  }
}
