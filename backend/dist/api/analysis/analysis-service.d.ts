import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';
export declare class AnalysisService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    getModeratedArticles(): Promise<Article[]>;
    analyzeArticle(id: string, analysisData: {
        sePractice: string;
        claim: string;
        evidenceResult: string;
        researchType: string;
        participants: string;
        researchEvidenceType: string;
        keyFindings: string;
        peerReviewed: boolean;
        publicationType: string;
    }): Promise<Article>;
}
