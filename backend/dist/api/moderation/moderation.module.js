"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const article_schema_1 = require("../articles/article.schema");
const moderation_service_1 = require("./moderation-service");
const moderation_controller_1 = require("./moderation-controller");
let ModerationModule = class ModerationModule {
};
exports.ModerationModule = ModerationModule;
exports.ModerationModule = ModerationModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: article_schema_1.Article.name, schema: article_schema_1.ArticleSchema }])],
        providers: [moderation_service_1.ModerationService],
        controllers: [moderation_controller_1.ModerationController],
    })
], ModerationModule);
//# sourceMappingURL=moderation.module.js.map