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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitterController = void 0;
const common_1 = require("@nestjs/common");
const submitter_service_1 = require("./submitter-service");
let SubmitterController = class SubmitterController {
    constructor(submitterService) {
        this.submitterService = submitterService;
    }
    async getPendingArticles() {
        return this.submitterService.getPendingArticles();
    }
    async getRejectedArticles() {
        return this.submitterService.getRejectedArticles();
    }
    async getModeratedArticles() {
        return this.submitterService.getModeratedArticles();
    }
    async getAllArticles() {
        const pending = await this.submitterService.getPendingArticles();
        const rejected = await this.submitterService.getRejectedArticles();
        const moderated = await this.submitterService.getModeratedArticles();
        return [...pending, ...rejected, ...moderated];
    }
    async getModeratedAndRejectedArticleCount() {
        return this.submitterService.getModeratedAndRejectedArticleCount();
    }
};
exports.SubmitterController = SubmitterController;
__decorate([
    (0, common_1.Get)('pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubmitterController.prototype, "getPendingArticles", null);
__decorate([
    (0, common_1.Get)('rejected'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubmitterController.prototype, "getRejectedArticles", null);
__decorate([
    (0, common_1.Get)('moderated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubmitterController.prototype, "getModeratedArticles", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubmitterController.prototype, "getAllArticles", null);
__decorate([
    (0, common_1.Get)('moderated-rejected-count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubmitterController.prototype, "getModeratedAndRejectedArticleCount", null);
exports.SubmitterController = SubmitterController = __decorate([
    (0, common_1.Controller)('api/submitter'),
    __metadata("design:paramtypes", [submitter_service_1.SubmitterService])
], SubmitterController);
//# sourceMappingURL=submitter-controller.js.map