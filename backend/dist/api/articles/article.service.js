"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_schema_1 = require("./article.schema");
let ArticleService = class ArticleService {
    constructor(articleModel) {
        this.articleModel = articleModel;
    }
    async create(createArticleDto) {
        try {
            const createdArticle = new this.articleModel({
                ...createArticleDto,
                status: 'submitted',
            });
            return await createdArticle.save();
        }
        catch (error) {
            console.error('Error creating article:', error);
            throw new Error('Error creating article');
        }
    }
    async findAll() {
        try {
            return await this.articleModel.find({ status: { $in: ['moderated', 'analyzed'] } }).exec();
        }
        catch (error) {
            console.error('Error fetching articles:', error);
            throw new Error('Error fetching articles');
        }
    }
    async findOne(id) {
        try {
            const article = await this.articleModel.findById(id).exec();
            if (!article) {
                console.warn(`Article with ID ${id} not found`);
            }
            return article;
        }
        catch (error) {
            console.error(`Error fetching article with ID ${id}:`, error);
            throw new Error(`Error fetching article with ID ${id}`);
        }
    }
    async update(id, createArticleDto) {
        try {
            const updatedArticle = await this.articleModel.findByIdAndUpdate(id, createArticleDto, { new: true }).exec();
            if (!updatedArticle) {
                console.warn(`Article with ID ${id} not found`);
                return null;
            }
            return updatedArticle;
        }
        catch (error) {
            console.error(`Error updating article with ID ${id}:`, error);
            throw new Error(`Error updating article with ID ${id}`);
        }
    }
    async delete(id) {
        try {
            const deletedArticle = await this.articleModel.findByIdAndDelete(id).exec();
            if (!deletedArticle) {
                console.warn(`Article with ID ${id} not found`);
                return null;
            }
            return deletedArticle;
        }
        catch (error) {
            console.error(`Error deleting article with ID ${id}:`, error);
            throw new Error(`Error deleting article with ID ${id}`);
        }
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(article_schema_1.Article.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ArticleService);
//# sourceMappingURL=article.service.js.map