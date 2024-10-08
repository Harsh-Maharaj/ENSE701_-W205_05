
import { useEffect, useState } from 'react';
import axios from 'axios';
import SortableTable from '../../components/table/SortableTable';
import { Article } from '../../components/Article';  
import styles from '../../styles/Form.module.scss';
const SubmitterDashboard = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get all the articles from the same submitter from backend
    axios.get('http://localhost:3001/api/submitter/all')
      .then((response) => {
        console.log('Fetched articles', response.data);
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Oops! There is an error when fetching articles:', error);
        setLoading(false);
      });
  }, []);

  const headers = [
    { key: 'title', label: 'Title' },
    { key: 'authors', label: 'Authors' },
    { key: 'source', label: 'Source' },
    { key: 'pubyear', label: 'Publication Year' },
    { key: 'doi', label: 'DOI' },
    { key: 'claim', label: 'Claim' },
    { key: 'evidence', label: 'Evidence' },
    // to show the submission status after moderator approved or rejectd
    { key: 'status', label: 'Submission Status' }, 
  ];

  if (loading) return <div>Loading...</div>; 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submitter Dashboard</h1>
      <p>Page containing a table of articles:</p>

      {/* Table to display articles */}
      <SortableTable headers={headers} data={articles} className={styles.table} />
    </div>
  );
};

export default SubmitterDashboard;
