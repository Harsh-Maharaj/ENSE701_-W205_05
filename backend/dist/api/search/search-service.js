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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_schema_1 = require("../articles/article.schema");
let SearchService = class SearchService {
    constructor(articleModel) {
        this.articleModel = articleModel;
    }
    async search(query) {
        let searchCriteria = {};
        switch (query.filterBy) {
            case 'title':
                searchCriteria = { title: { $regex: query.query, $options: 'i' } };
                break;
            case 'author':
                searchCriteria = { authors: { $regex: query.query, $options: 'i' } };
                break;
            case 'year':
                searchCriteria = { pubyear: query.query };
                break;
            case 'popularity':
                searchCriteria = { popularity: { $gte: query.query } };
                break;
            default:
                break;
        }
        return this.articleModel
            .find(searchCriteria)
            .exec();
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(article_schema_1.Article.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SearchService);
//# sourceMappingURL=search-service.js.map