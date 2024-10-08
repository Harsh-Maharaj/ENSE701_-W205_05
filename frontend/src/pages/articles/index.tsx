import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import axios from 'axios';
import SortableTable from '../../components/table/SortableTable';  
import { Article } from '../../components/Article';  
import styles from '../../styles/Form.module.scss';
// Define props type for articles
type ArticlesProps = {
  articles: Article[];
};

// Define the Articles page component
const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  // State to handle the selected article for viewing
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Define the headers for the table
 // Define the headers for the table
const headers: { key: string; label: string }[] = [
  { key: 'title', label: 'Title' },
  { key: 'authors', label: 'Authors' },
  { key: 'source', label: 'Source' },
  { key: 'pubyear', label: 'Publication Year' },
  { key: 'doi', label: 'DOI' },
  { key: 'status', label: 'Status' },
  { key: 'view', label: 'Actions' },  // Allow 'view' as a custom key
];


  // Handle the view button click
  const handleViewClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Articles Index Page</h1>
    <p>Page containing a table of articles:</p>

    {/* Table to display articles */}
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => (
          <tr key={article.id}>
            <td>{article.title}</td>
            <td>{article.authors.join(', ')}</td>
            <td>{article.source}</td>
            <td>{article.pubyear}</td>
            <td>{article.doi}</td>
            <td>{article.status}</td>
            <td>
              <button onClick={() => handleViewClick(article)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      {/* Modal or section to display selected article details */}
      {selectedArticle && (
         <div className={styles.modalOverlay} onClick={handleClose}>
    <div className={styles.modalContent}>
            <h2 className="text-2xl font-bold mb-4">Article Details</h2>
            <p><strong>Title:</strong> {selectedArticle.title}</p>
            <p><strong>Authors:</strong> {selectedArticle.authors.join(', ')}</p>
            <p><strong>Source:</strong> {selectedArticle.source}</p>
            <p><strong>Publication Year:</strong> {selectedArticle.pubyear}</p>
            <p><strong>DOI:</strong> {selectedArticle.doi}</p>
            <p><strong>Claim:</strong> {selectedArticle.claim}</p>
            <p><strong>Evidence:</strong> {selectedArticle.evidence}</p>
            <p><strong>Status:</strong> {selectedArticle.status}</p>
            <p><strong>SE Practice:</strong> {selectedArticle.sePractice}</p>
            <p><strong>Analyst Claim:</strong> {selectedArticle.analystClaim}</p>
            <p><strong>Evidence Result:</strong> {selectedArticle.evidenceResult}</p>
            <p><strong>Research Type:</strong> {selectedArticle.researchType}</p>
            <p><strong>Participants:</strong> {selectedArticle.participants}</p>
            <p><strong>Research Evidence Type:</strong> {selectedArticle.researchEvidenceType}</p>
            <p><strong>Key Findings:</strong> {selectedArticle.keyFindings}</p>
            <p><strong>Peer Reviewed:</strong> {selectedArticle.peerReviewed}</p>
            <p><strong>Publication Type:</strong> {selectedArticle.publicationType}</p>
            
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
              onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Server-side rendering method to fetch articles
export const getServerSideProps: GetServerSideProps<ArticlesProps> = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/articles');  // API call to fetch articles

    // Map backend _id to id and include additional fields
    const articles = response.data.map((article: any) => ({
      id: article._id,  // Map _id to id for frontend consistency
      title: article.title || '',
      authors: article.authors || [],
      source: article.source || '',
      pubyear: article.pubyear || 0,
      doi: article.doi || '',
      claim: article.claim || '',
      evidence: article.evidence || '',
      status: article.status || '',
      sePractice: article.sePractice || '',
      analystClaim: article.analystClaim || '',
      evidenceResult: article.evidenceResult || '',
      researchType: article.researchType || '',
      participants: article.participants || '',
      researchEvidenceType: article.researchEvidenceType || '',
      keyFindings: article.keyFindings || '',
      peerReviewed: article.peerReviewed ? 'Yes' : 'No',
      publicationType: article.publicationType || '',
    }));

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      props: {
        articles: [],
      },
    };
  }
};

export default Articles;
