import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Article {
  title: string;
  authors: string[];
  source: string;
  publication_year: number;
  doi?: string;
  claim?: string;
  evidence?: string;
  getAverageRating: () => number;
}

const ArticleView = () => {
  const router = useRouter();
  const { articleId } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    if (articleId) {
      axios.get(`/api/articles/${articleId}`)
        .then((response: any) => {  // Use 'any' type for now
          setArticle(response.data);
          setAverageRating(response.data.getAverageRating());
        })
        .catch((error: any) => console.error(error));
    }
  }, [articleId]);

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>Authors: {article.authors.join(', ')}</p>
      <p>Source: {article.source}</p>
      <p>Average Rating: {averageRating} / 5</p>
    </div>
  );
};

export default ArticleView;
