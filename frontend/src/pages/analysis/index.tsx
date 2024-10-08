import { useEffect, useState } from 'react';
import { Article } from '../../components/Article'; 
import styles from '../../styles/Analysis.module.scss';

const AnalysisPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const [sePractice, setSePractice] = useState('');
  const [claim, setClaim] = useState('');
  const [evidenceResult, setEvidenceResult] = useState('');
  const [researchType, setResearchType] = useState('');
  const [participants, setParticipants] = useState('');
  const [researchEvidenceType, setResearchEvidenceType] = useState('');
  const [keyFindings, setKeyFindings] = useState('');
  const [peerReviewed, setPeerReviewed] = useState(false);
  const [publicationType, setPublicationType] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/analysis')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching analysis articles:', err);
        setLoading(false);
      });
  }, []);

  const handleAnalyze = async (id: string | undefined) => {
    if (!id) {
      console.error('ID is undefined');
      return;
    }

    const analysisData = {
      sePractice,
      claim,
      evidenceResult,
      researchType,
      participants,
      researchEvidenceType,
      keyFindings,
      peerReviewed,
      publicationType,
      status: 'analyzed',
    };

    try {
      await fetch(`http://localhost:3001/api/analysis/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analysisData),
      });

      const response = await fetch('http://localhost:3001/api/analysis');
      const updatedArticles = await response.json();
      setArticles(updatedArticles);
    } catch (error) {
      console.error('Error analyzing article:', error);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Analysis</h1>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="SE Practice"
          value={sePractice}
          onChange={(e) => setSePractice(e.target.value)}
          className={styles.formItem}
        />
        <input
          type="text"
          placeholder="Claim"
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          className={styles.formItem}
        />
        <input
          type="text"
          placeholder="Evidence Result"
          value={evidenceResult}
          onChange={(e) => setEvidenceResult(e.target.value)}
          className={styles.formItem}
        />
        <input
          type="text"
          placeholder="Research Type"
          value={researchType}
          onChange={(e) => setResearchType(e.target.value)}
          className={styles.formItem}
        />
        <input
          type="text"
          placeholder="Participants"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          className={styles.formItem}
        />
        <input
          type="text"
          placeholder="Research Evidence Type"
          value={researchEvidenceType}
          onChange={(e) => setResearchEvidenceType(e.target.value)}
          className={styles.formItem}
        />
        <input
          type="text"
          placeholder="Key Findings"
          value={keyFindings}
          onChange={(e) => setKeyFindings(e.target.value)}
          className={styles.formItem}
        />
        <div className={styles.checkboxContainer}>
          <label className={styles.label}>
            Peer Reviewed
            <input
              type="checkbox"
              checked={peerReviewed}
              onChange={() => setPeerReviewed(!peerReviewed)}
              className={styles.checkbox}
            />
          </label>
        </div>
        <input
          type="text"
          placeholder="Publication Type"
          value={publicationType}
          onChange={(e) => setPublicationType(e.target.value)}
          className={styles.formItem}
        />
      </div>

      {articles.length === 0 ? (
        <p>No articles awaiting analysis.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article._id || article.id}>
                <td>{article.title}</td>
                <td>{article.authors.join(', ')}</td>
                <td>{article.status}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleAnalyze(article._id || article.id)}
                  >
                    Mark as Analyzed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AnalysisPage;
