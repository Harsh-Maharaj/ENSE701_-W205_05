import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Article {
  id: string;
  title: string;
  authors: string[];
  source: string;
  publication_year: number;
  averageRating: number;
  ratings: number[];
}

const RateArticle = () => {
  const router = useRouter();
  const { id } = router.query; // Get the article ID from the URL
  const [article, setArticle] = useState<Article | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    if (id) {
      axios.get(`/api/articles/${id}`)
        .then((response) => {
          const articleData = response.data as Article; // Explicitly cast response.data to Article type
          setArticle(articleData);
          setAverageRating(articleData.averageRating); // Set the average rating
        })
        .catch((error) => console.error('Error fetching article:', error));
    }
  }, [id]);

  const submitRating = () => {
    axios.post(`/api/articles/rate/${id}`, { rating })
      .then((response) => {
        const updatedAverageRating = (response.data as { averageRating: number }).averageRating; // Explicitly cast response.data
        setAverageRating(updatedAverageRating); // Update the average rating
      })
      .catch((error) => console.error('Error submitting rating:', error));
  };
  
  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>Authors: {article.authors.join(', ')}</p>
      <p>Source: {article.source}</p>
      <p>Publication Year: {article.publication_year}</p>
      <p>Average Rating: {averageRating} / 5</p>

      {/* Rating input */}
      <div>
        <h4>Rate this article:</h4>
        <input 
          type="number" 
          value={rating} 
          min="1" 
          max="5" 
          onChange={(e) => setRating(Number(e.target.value))} 
        />
        <button onClick={submitRating}>Submit Rating</button>
      </div>
    </div>
  );
};

export default RateArticle;
