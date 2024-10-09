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
exports.AnalysisService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_schema_1 = require("../articles/article.schema");
let AnalysisService = class AnalysisService {
    constructor(articleModel) {
        this.articleModel = articleModel;
    }
    async getModeratedArticles() {
        return this.articleModel.find({ status: 'moderated' }).exec();
    }
    async analyzeArticle(id, analysisData) {
        console.log('Analyzing article with data:', analysisData);
        return this.articleModel.findByIdAndUpdate(id, {
            sePractice: analysisData.sePractice,
            claim: analysisData.claim,
            evidenceResult: analysisData.evidenceResult,
            researchType: analysisData.researchType,
            participants: analysisData.participants,
            researchEvidenceType: analysisData.researchEvidenceType,
            keyFindings: analysisData.keyFindings,
            peerReviewed: analysisData.peerReviewed,
            publicationType: analysisData.publicationType,
            status: 'analyzed',
        }, { new: true }).exec();
    }
};
exports.AnalysisService = AnalysisService;
exports.AnalysisService = AnalysisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(article_schema_1.Article.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnalysisService);
//# sourceMappingURL=analysis-service.js.map