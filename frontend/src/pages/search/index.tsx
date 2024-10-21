import { useState, useCallback } from 'react';
import { Article } from '../../components/Article';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState('title');

  // Fetch the backend URL from environment variables
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSearch = useCallback(() => {
    setLoading(true);
    fetch(`${backendUrl}/api/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, filterBy })
    })
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error searching articles:', err);
        setLoading(false);
      });
  }, [query, filterBy, backendUrl]);

  const handleClear = () => {
    setQuery('');
    setArticles([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Articles</h1>
      <div className="search-container flex flex-col items-center">
        <div className="search-bar-wrapper flex justify-center items-center">
          <input
            type="text"
            value={query || ''}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input mr-2 p-2 border rounded"
            placeholder="Enter article title to search..."
            aria-label="Search articles by title"
          />
          <button onClick={handleSearch} className="search-button p-2 bg-gray-300 rounded">
            Search
          </button>
          <button onClick={handleClear} className="clear-button p-2 bg-gray-300 rounded ml-2">
            Clear
          </button>
        </div>
        <div className="mt-4">
          <label htmlFor="filter-select" className="mr-2">Filter by:</label>
          <select
            id="filter-select"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="filter-select p-2 border rounded"
            aria-label="Filter articles by"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="popularity">Popularity</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>
      {loading ? <div>Loading...</div> : (
        articles.length > 0 ? (
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article._id || article.id}>
                  <td>{article.title}</td>
                  <td>{article.authors.join(', ')}</td>
                  <td>{article.pubyear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
