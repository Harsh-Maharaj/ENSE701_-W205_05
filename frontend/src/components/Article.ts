// src/components/Article.ts
export type Article = {
  _id?: string;  // MongoDB uses _id
  id?: string;   // In case it's manually set as id
  title: string;
  authors: string[];
  source: string;
  pubyear: number;
  doi: string;
  claim: string;
  evidence: string;
  status: 'submitted' | 'moderated' | 'analyzed'; // Add status field 
   // Add the new fields for analysis
   sePractice?: string;
   analystClaim?: string;
   evidenceResult?: string;
   researchType?: string;
   participants?: string;
   researchEvidenceType?: string;
   keyFindings?: string;
   peerReviewed?: boolean;
   publicationType?: string;
};
