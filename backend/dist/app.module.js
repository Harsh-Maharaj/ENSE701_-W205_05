"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const article_module_1 = require("./api/articles/article.module");
const config_1 = require("@nestjs/config");
const submitter_module_1 = require("./api/submitter/submitter.module");
const moderation_module_1 = require("./api/moderation/moderation.module");
const analysis_module_1 = require("./api/analysis/analysis.module");
const search_module_1 = require("./api/search/search.module");
const admin_module_1 = require("./api/admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            article_module_1.ArticleModule,
            moderation_module_1.ModerationModule,
            analysis_module_1.AnalysisModule,
            search_module_1.SearchModule,
            admin_module_1.AdminModule,
            submitter_module_1.SubmitterModule,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const dbUri = configService.get('DB_URI');
                    common_1.Logger.log(`Connecting to database at ${dbUri}`, 'MongooseModule');
                    return { uri: dbUri };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map