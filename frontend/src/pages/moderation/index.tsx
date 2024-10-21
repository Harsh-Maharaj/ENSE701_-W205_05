import { useEffect, useState } from 'react';
import { Article } from '../../components/Article';  // Adjust the import path if needed
import { ArticleDetail } from '@/components/articleDetails/articleDetails';
import styles from '../../styles/Moderation.module.scss'; // Import your SCSS module for styling

const ModerationPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null); // State for selected article
  const [detailLoading, setDetailLoading] = useState(false); // State for loading the article details

   // Fetch the backend URL from environment variables
   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

   useEffect(() => {
     // Fetch pending articles from the backend
     fetch(`${backendUrl}/api/moderation`)
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
   }, [backendUrl]);
 
   const handleModeration = (id: string, status: 'moderated' | 'rejected') => {
     // Update the article's moderation status
     fetch(`${backendUrl}/api/moderation/${id}`, {
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
     fetch(`${backendUrl}/api/articles/${id}`)
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
   
  // Display loading screen while data is fetched
  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={`${styles.container} mx-auto p-4`}> {/* Apply the container style */}
      <h1 className={styles['page-title']}>Moderation</h1> {/* Add page-title class to style the heading */}
      {articles.length === 0 ? (
        <p className={styles['centered-text']}>No articles pending moderation.</p>
      ) : (
        <table className={`${styles.table} table-auto w-full`}> {/* Use table style from SCSS */}
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
                    className={styles['button-approve']} // Use button-approve class from SCSS
                    onClick={() => handleModeration(article.id!, 'moderated')}
                  >
                    Approve
                  </button>
                  <button
                    className={styles['button-reject']} // Use button-reject class from SCSS
                    onClick={() => handleModeration(article.id!, 'rejected')}
                  >
                    Reject
                  </button>
                </td>
                <td>
                  <button
                    className={styles['button-check']} // Use button-check class from SCSS
                    onClick={() => handleCheck(article.id!)}
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
