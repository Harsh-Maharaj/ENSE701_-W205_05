// src/pages/moderation/index.tsx

import { useEffect, useState } from 'react';
import { Article } from '../../components/Article';  // Adjust the import path if needed
import { ArticleDetail } from '@/components/articleDetails/articleDetails';

const ModerationPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null); // State for selected article
  const [detailLoading, setDetailLoading] = useState(false); // State for loading the article details

  useEffect(() => {
    // Fetch pending articles from the backend
    fetch('http://localhost:3001/api/moderation')
      .then((res) => res.json())
      .then((data) => {
        const articlesWithId = data.map((article: any) => ({
          id: article._id,  // Map _id to id for consistency
          title: article.title,
          authors: article.authors,
          status: article.status,
        }));
        setArticles(articlesWithId);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching moderation articles:', err);
        setLoading(false);
      });
  }, []);

  const handleModeration = (id: string, status: 'moderated' | 'rejected') => {
    // Update the article's moderation status
    fetch(`http://localhost:3001/api/moderation/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
      .then(() => {
        setArticles(articles.filter((article) => article.id !== id));
      })
      .catch((err) => console.error('Error updating moderation status:', err));
  };

  const handleCheck = (id: string) => {
    setDetailLoading(true); // Start loading
    // Fetch article details from the backend by article ID
    fetch(`http://localhost:3001/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedArticle({
          id: data._id,
          title: data.title,
          authors: data.authors,
          source: data.source,
          pubyear: data.pubyear,
          doi: data.doi,
          claim: data.claim,
          evidence: data.evidence,
          status: data.status,
        });
        console.log("Checking this article detail:", data);
        setDetailLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error('Error fetching article details:', err);
        setDetailLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Moderation</h1>
      {articles.length === 0 ? (
        <p>No articles pending moderation.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Actions</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.authors.join(', ')}</td>
                <td>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleModeration(article.id!, 'moderated')}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleModeration(article.id!, 'rejected')}
                  >
                    Reject
                  </button>
                </td>
                <td>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleCheck(article.id!)} // Check button logic
                  >
                    Check
                  </button>
                </td>               
              </tr>
            ))}
          </tbody>
        </table>       
      )}
      {/* Conditionally render ArticleDetail when an article is selected */}
      {selectedArticle && (
        <ArticleDetail 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)}  // Close the window by setting article to null
        />
      )}
    </div>
  );
};

export default ModerationPage;
