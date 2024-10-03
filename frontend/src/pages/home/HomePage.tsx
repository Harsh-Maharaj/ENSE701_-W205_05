/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./HomePage.module.css";

// Define the Article interface to match your fetched data
interface Article {
  _id: string;
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  tags: string[];
  isAccepted: boolean;
  rating: number;
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/articles");
        setArticles(response.data);
      } catch (err) {
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {articles.map((article) => (
        <div key={article._id} className={styles.card}>
          <h2>{article.title}</h2>
          <h4>by {article.author}</h4>
          <p>{article.description}</p>
          <p>
            <strong>Tags:</strong> {article.tags.join(", ")}
          </p>
          <p>
            <strong>Rating:</strong> {article.rating}/5
          </p>
          <p>
            <strong>Date:</strong> {new Date(article.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
