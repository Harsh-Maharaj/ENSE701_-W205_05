import { useState } from 'react';
import { Article } from '../../components/Article';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState('title'); // Filter is applied directly

  const handleSearch = () => {
    setLoading(true);

    // Add filter logic here
    fetch('http://localhost:3001/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: query,
        filterBy: filterBy // Include the selected filter in the search request
      })
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
  };

  const handleClear = () => {
    setQuery('');
    setArticles([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Articles</h1> {/* Centered Title */}
      
      <div className="search-container flex flex-col items-center"> {/* Centering the search container */}
        <div className="search-bar-wrapper flex justify-center items-center"> {/* Centering the search bar wrapper */}
          <input
            type="text"
            value={query || ''}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input mr-2 p-2 border rounded"
            placeholder="Enter article title to search..."
          />
          <button onClick={handleSearch} className="search-button p-2 bg-gray-300 rounded">
            Search
          </button>
          <button onClick={handleClear} className="clear-button p-2 bg-gray-300 rounded ml-2">
            Clear
          </button>
        </div>

        {/* Filter select box */}
        <div className="mt-4">
          <label htmlFor="filter-select" className="mr-2">Filter by:</label>
          <select
            id="filter-select"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="filter-select p-2 border rounded"
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