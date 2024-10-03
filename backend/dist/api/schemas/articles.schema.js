var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
let Article = (() => {
    let _classDecorators = [Schema()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _authors_decorators;
    let _authors_initializers = [];
    let _authors_extraInitializers = [];
    let _source_decorators;
    let _source_initializers = [];
    let _source_extraInitializers = [];
    let _publication_year_decorators;
    let _publication_year_initializers = [];
    let _publication_year_extraInitializers = [];
    let _doi_decorators;
    let _doi_initializers = [];
    let _doi_extraInitializers = [];
    let _summary_decorators;
    let _summary_initializers = [];
    let _summary_extraInitializers = [];
    let _linked_discussion_decorators;
    let _linked_discussion_initializers = [];
    let _linked_discussion_extraInitializers = [];
    var Article = _classThis = class {
        constructor() {
            this.title = __runInitializers(this, _title_initializers, void 0);
            this.authors = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _authors_initializers, void 0));
            this.source = (__runInitializers(this, _authors_extraInitializers), __runInitializers(this, _source_initializers, void 0));
            this.publication_year = (__runInitializers(this, _source_extraInitializers), __runInitializers(this, _publication_year_initializers, void 0));
            this.doi = (__runInitializers(this, _publication_year_extraInitializers), __runInitializers(this, _doi_initializers, void 0));
            this.summary = (__runInitializers(this, _doi_extraInitializers), __runInitializers(this, _summary_initializers, void 0));
            this.linked_discussion = (__runInitializers(this, _summary_extraInitializers), __runInitializers(this, _linked_discussion_initializers, void 0));
            __runInitializers(this, _linked_discussion_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Article");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _title_decorators = [Prop({ required: true })];
        _authors_decorators = [Prop({ required: true })];
        _source_decorators = [Prop({ required: true })];
        _publication_year_decorators = [Prop({ required: true })];
        _doi_decorators = [Prop()];
        _summary_decorators = [Prop()];
        _linked_discussion_decorators = [Prop()];
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _authors_decorators, { kind: "field", name: "authors", static: false, private: false, access: { has: obj => "authors" in obj, get: obj => obj.authors, set: (obj, value) => { obj.authors = value; } }, metadata: _metadata }, _authors_initializers, _authors_extraInitializers);
        __esDecorate(null, null, _source_decorators, { kind: "field", name: "source", static: false, private: false, access: { has: obj => "source" in obj, get: obj => obj.source, set: (obj, value) => { obj.source = value; } }, metadata: _metadata }, _source_initializers, _source_extraInitializers);
        __esDecorate(null, null, _publication_year_decorators, { kind: "field", name: "publication_year", static: false, private: false, access: { has: obj => "publication_year" in obj, get: obj => obj.publication_year, set: (obj, value) => { obj.publication_year = value; } }, metadata: _metadata }, _publication_year_initializers, _publication_year_extraInitializers);
        __esDecorate(null, null, _doi_decorators, { kind: "field", name: "doi", static: false, private: false, access: { has: obj => "doi" in obj, get: obj => obj.doi, set: (obj, value) => { obj.doi = value; } }, metadata: _metadata }, _doi_initializers, _doi_extraInitializers);
        __esDecorate(null, null, _summary_decorators, { kind: "field", name: "summary", static: false, private: false, access: { has: obj => "summary" in obj, get: obj => obj.summary, set: (obj, value) => { obj.summary = value; } }, metadata: _metadata }, _summary_initializers, _summary_extraInitializers);
        __esDecorate(null, null, _linked_discussion_decorators, { kind: "field", name: "linked_discussion", static: false, private: false, access: { has: obj => "linked_discussion" in obj, get: obj => obj.linked_discussion, set: (obj, value) => { obj.linked_discussion = value; } }, metadata: _metadata }, _linked_discussion_initializers, _linked_discussion_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Article = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Article = _classThis;
})();
export { Article };
export const ArticleSchema = SchemaFactory.createForClass(Article);
