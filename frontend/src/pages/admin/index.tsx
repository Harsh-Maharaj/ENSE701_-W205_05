import { useEffect, useState } from 'react';
import { Article } from '../../components/Article'; // Adjust the import path
import styles from '../../styles/Admin.module.scss';

const AdminPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the backend URL from environment variables
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/admin`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch articles');
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching articles:', err);
        setLoading(false);
      });
  }, [backendUrl]);

  const handleDelete = (id?: string) => {
    if (!id) {
      console.error('No ID provided for deletion');
      return;
    }

    if (window.confirm('Are you sure you want to delete this article?')) {
      fetch(`${backendUrl}/api/admin/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setArticles(articles.filter((article) => article.id !== id));
        })
        .catch((err) => console.error('Error deleting article:', err));
    }
  };

  if (loading) return <div className={styles.loading}>Loading articles...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      {articles.length === 0 ? (
        <p className={styles.noArticles}>No articles to display.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id || article.id}>
                <td>{article.title}</td>
                <td>{article.authors.join(', ')}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(article._id || article.id)}
                  >
                    Delete
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

export default AdminPage;
