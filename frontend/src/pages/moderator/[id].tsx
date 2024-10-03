import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from "../../styles/ArticleDetails.module.scss";
import fromStyles from "../../styles/Forms.module.scss";

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
  summary: string;
}

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://ense701-g6.vercel.app/api'
  : 'http://localhost:8000/api';

const ArticleDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the article ID from the URL
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch article details on component mount
  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`${API_URL}/articles/${id}`);
          setArticle(response.data);
        } catch (error) {
          console.error('Error fetching article details:', error);
          setError('Error fetching article details.');
        }
      };
      fetchArticle();
    }
  }, [id]);

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

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Summary</h2>
        <p className={styles.text}>{article.summary}</p>
      </div>

      <h2 className={styles.sectionTitle}>Claims</h2>
      <p className={styles.text}>{article.claim || 'No claim available'}</p>

      <h2 className={styles.sectionTitle}>Evidence of the Claims</h2>
      <p className={styles.text}>{article.evidence || 'No Evidence available'}</p>

      <br />
      <button className={fromStyles.addButton} onClick={() => router.back()}>Back to Dashboard</button>
    </div>
  );
};

export default ArticleDetails;
