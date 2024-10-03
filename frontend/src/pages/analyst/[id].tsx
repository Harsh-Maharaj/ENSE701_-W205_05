import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from "../../styles/ArticleDetails.module.scss";
import formStyles from "../../styles/Forms.module.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Article {
  _id: string;
  title: string;
  authors: string[];
  journal: string;
  se_practice: string | null;
  research_type: string | null;
  publication_year: number;
  volume: string | null;
  number: string | null;
  pages: string | null;
  doi: string;
  claim: string | null;
  evidence: string | null;
  analysis_notes: string | null;
  evidence_summary: 'Weak' | 'Moderate' | 'Strong' | null; // New field
  summary: string;
}

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://ense701-g6.vercel.app/api'
  : 'http://localhost:8000/api';

const ArticleDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the article ID from the URL
  const [article, setArticle] = useState<Article | null>(null);
  const [evidence, setEvidence] = useState<string>(''); // Evidence state
  const [analysisNotes, setAnalysisNotes] = useState<string>(''); // Analysis notes state
  const [evidenceSummary, setEvidenceSummary] = useState<'Weak' | 'Moderate' | 'Strong' | null>(null); // New state
  const [error, setError] = useState<string | null>(null); // Error state
  const [activeEditField, setActiveEditField] = useState<string | null>(null); // Track the active editing field
  // Fetch article details on component mount
  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`${API_URL}/articles/${id}`);
          setArticle(response.data);
          setEvidence(response.data.evidence || ''); // Initialize evidence state
          setAnalysisNotes(response.data.analysis_notes || ''); // Initialize analysis notes state
          setEvidenceSummary(response.data.evidence_summary || null); // Initialize evidence summary state
        } catch (error) {
          console.error('Error fetching article details:', error);
          setError('Error fetching article details.');
          toast.error('Error fetching article details.');
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleEdit = (field: string) => {
    setActiveEditField(field); // Set the active editing field
  };

  const handleSaveAnalysisNotes = async () => {
    if (!article) return;
    try {
      // Save the updated analysis notes
      const response = await axios.post(`${API_URL}/analysis/articles/${article._id}/analysis_notes`, {
        analysis_notes: analysisNotes,
      });
      if (response.status === 200 || response.status === 201) {
        setActiveEditField(null); // Exit edit mode after saving
        toast.success('Analysis notes updated successfully.');

        // Update the article data with the new analysis notes
        setArticle({ ...article, analysis_notes: analysisNotes });
      } else {
        toast.error('Error: Failed to update analysis notes.');
      }
    } catch (error) {
      console.error('Error updating analysis notes:', error);
      toast.error('Error updating analysis notes.');
    }
  };

  const handleSaveEvidence = async () => {
    if (!article) return;
    try {
      // Save the updated evidence
      const response = await axios.post(`${API_URL}/analysis/articles/${article._id}/evidence`, {
        evidence,
      });
      if (response.status === 200 || response.status === 201) {
        setActiveEditField(null); // Exit edit mode after saving
        toast.success('Evidence updated successfully.');

        // Update the article data with the new evidence
        setArticle({ ...article, evidence });
      } else {
        toast.error('Error: Failed to update evidence.');
      }
    } catch (error) {
      console.error('Error updating evidence:', error);
      toast.error('Error updating evidence.');
    }
  };

  const handleApprove = async () => {
    if (!article) return;

    // Validation: Check if evidence summary is set
    if (!evidenceSummary) {
      toast.error('Please select an Evidence Summary before approving the article.', {
        autoClose: 5000,
      });
      return;
    }

    // Validation: Check if analysis notes are set
    if (!analysisNotes.trim()) {
      toast.error('Please enter Analysis Notes before approving the article.', {
        autoClose: 5000,
      });
      return;
    }

    try {
      const approvalData = {
        evidence,
        analysis_notes: analysisNotes,
        evidence_summary: evidenceSummary,
      };

      await axios.post(`${API_URL}/analysis/articles/${article._id}/approve`, approvalData);

      toast.success('Article approved and published.', {
        autoClose: 1000, // Display the toast for 3 seconds
        onClose: () => {
          // Navigate back after the toast is closed
          router.back();
        },
      });
    } catch (error) {
      console.error('Error approving article:', error);
      toast.error('Error approving article.', {
        autoClose: 5000,
      });
    }
  };

  const handleReject = async () => {
    if (!article) return;
    try {
      await axios.post(`${API_URL}/analysis/articles/${article._id}/reject`);
      toast.success('Article rejected.', {
        autoClose: 3000,
        onClose: () => {
          router.back();
        },
      });
    } catch (error) {
      console.error('Error rejecting article:', error);
      toast.error('Error rejecting article.', {
        autoClose: 5000,
      });
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!article) {
    return <p>Loading article details...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{article.title}</h1>
      <div className={styles.divider}></div>
      <div className={styles.subtitle}>
        <b>{article.journal || 'No journal name available'}</b>
        <br />
        (Volume: <b>{article.volume || 'N/A'}</b>, Number: <b>{article.number || 'N/A'}</b>, Pages: <b>{article.pages || 'N/A'}</b>)
        <br />
        Published in <b>{article.publication_year || 'Unknown'}</b> by <b>{article.authors.join(', ') || 'No authors available'}</b>
        <br />
        DOI: <b>{article.doi || 'No DOI available'}</b>
        <br />
        Type of Research: <b>{article.research_type || 'No research type available'}</b>
        <br />
        Software Engineering Practice: <b>{article.se_practice || 'No SE practice available'}</b>
      </div>

      <p className={formStyles.sectionSeparator}><span>Summary</span></p>
      <p className={styles.text}>{article.summary}</p>

      <p className={formStyles.sectionSeparator}><span>Claim</span></p>
      <p className={styles.text}>{article.claim || 'No claim available'}</p>

      <p className={formStyles.sectionSeparator}><span>Evidence of the Claim</span></p>

      {activeEditField === 'evidence' ? (
        <textarea
          className={styles.input}
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
          placeholder="Enter the evidence to support the claim"
          rows={5}
          cols={50}
        ></textarea>
      ) : (
        <p className={styles.text}>{article.evidence || 'No Evidence available'}</p>
      )}

      {activeEditField === 'evidence' ? (
        <button className={formStyles.addButton} onClick={handleSaveEvidence}>Save Evidence</button>
      ) : (
        <button className={formStyles.addButton} onClick={() => handleEdit('evidence')}>Edit Evidence</button>
      )}

      <p className={formStyles.sectionSeparator}><span>Analysis Notes</span></p>

      {activeEditField === 'analysis_notes' ? (
        <textarea
          className={styles.input}
          value={analysisNotes}
          onChange={(e) => setAnalysisNotes(e.target.value)}
          placeholder="Enter your analysis notes"
          rows={5}
          cols={50}
        ></textarea>
      ) : (
        <p className={styles.text}>{article.analysis_notes || 'No analysis notes available'}</p>
      )}

      {activeEditField === 'analysis_notes' ? (
        <button className={formStyles.addButton} onClick={handleSaveAnalysisNotes}>Save Analysis Notes</button>
      ) : (
        <button className={formStyles.addButton} onClick={() => handleEdit('analysis_notes')}>Edit Analysis Notes</button>
      )}

      {/* Evidence Summary Toggle */}
      <h2 className={styles.sectionTitle}>Evidence Summary</h2>

      <div className={formStyles.form}>
        <select
          className={formStyles.input}
          value={evidenceSummary ?? ''}
          onChange={(e) => {
            const value = e.target.value as 'Weak' | 'Moderate' | 'Strong';
            setEvidenceSummary(value || null);
          }}
          required
        >
          <option value="">Select Evidence Strength</option>
          <option value="Weak">Weak</option>
          <option value="Moderate">Moderate</option>
          <option value="Strong">Strong</option>
        </select>
      </div>
      <br />
      <button className={formStyles.addButton} onClick={handleApprove}>Approve and Publish</button>
      <button className={formStyles.removeButton} style={{ margin: '1em' }} onClick={handleReject}>Reject</button>
      <br />
      <button className={formStyles.addButton} onClick={() => router.back()}>Back to Dashboard</button>
      <br />
      <ToastContainer autoClose={3000}/>
    </div>
  );
};

export default ArticleDetails;
