import { HydratedDocument } from 'mongoose';
export type ArticleDocument = HydratedDocument<Article>;
export declare class Article {
    title: string;
    authors: string[];
    source: string;
    pubyear: number;
    doi: string;
    claim: string;
    evidence: string;
    status: string;
    sePractice: string;
    analystClaim: string;
    evidenceResult: string;
    researchType: string;
    participants: string;
    researchEvidenceType: string;
    keyFindings: string;
    peerReviewed: boolean;
    publicationType: string;
}
export declare const ArticleSchema: import("mongoose").Schema<Article, import("mongoose").Model<Article, any, any, any, import("mongoose").Document<unknown, any, Article> & Article & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Article, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Article>> & import("mongoose").FlatRecord<Article> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
