var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
let Article = class Article {
};
__decorate([
    Prop({ required: true }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", Array)
], Article.prototype, "authors", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", String)
], Article.prototype, "source", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", Number)
], Article.prototype, "publication_year", void 0);
__decorate([
    Prop(),
    __metadata("design:type", String)
], Article.prototype, "doi", void 0);
__decorate([
    Prop(),
    __metadata("design:type", String)
], Article.prototype, "summary", void 0);
__decorate([
    Prop(),
    __metadata("design:type", String)
], Article.prototype, "linked_discussion", void 0);
Article = __decorate([
    Schema()
], Article);
export { Article };
export const ArticleSchema = SchemaFactory.createForClass(Article);
