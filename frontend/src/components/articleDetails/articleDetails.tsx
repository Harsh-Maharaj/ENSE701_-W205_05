// src/components/ArticleDetail.tsx

import { Article } from '../Article';
import styles from './articleDetails.module.scss';

type ArticleDetailProps = {
  article: Article;
  onClose: () => void;  // Pass a function to close the detail window
};

export const ArticleDetail = ({ article, onClose }: ArticleDetailProps) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        {/* Close button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
        >
          ×
        </button>

        {/* Article Details */}
        <h2 className={styles.articleTitle}>{article.title}</h2>
        <p className={styles.articleAuthors}>Authors: {article.authors.join(', ')}</p>
        <p className={styles.articleSource}>Source: {article.source}</p>
        <p className={styles.articlePubYear}>Publication Year: {article.pubyear}</p>
        <p className={styles.articleDoi}>
          DOI: <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer" className={styles.doiLink}>{article.doi}</a>
        </p>

        <div className={styles.articleSection}>
          <h3 className={styles.articleSectionTitle}>Claim</h3>
          <p className={styles.articleText}>{article.claim}</p>
        </div>

        <div className={styles.articleSection}>
          <h3 className={styles.articleSectionTitle}>Evidence</h3>
          <p className={styles.articleText}>{article.evidence}</p>
        </div>

        <p className={styles.articleStatus}>Status: <span className={styles.statusText}>{article.status}</span></p>
      </div>
    </div>
  );
};
