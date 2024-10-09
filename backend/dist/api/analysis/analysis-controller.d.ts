import { AnalysisService } from './analysis-service';
import { Article } from '../articles/article.schema';
export declare class AnalysisController {
    private readonly analysisService;
    constructor(analysisService: AnalysisService);
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
