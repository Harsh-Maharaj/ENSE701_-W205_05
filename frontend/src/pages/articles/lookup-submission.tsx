import React, { useEffect, useState } from "react";
import axios from "axios";
import formStyles from "../../styles/Forms.module.scss";
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loading from '../../components/Loading';

// Define the expected structure of an article
interface Article {
  _id: string;
  title: string;
  status: string;
  submitted_at?: string;
  moderated_at?: string;
  analyzed_at?: string;
}

// Set the API URL depending on the environment
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://ense701-g6.vercel.app/api'
  : 'http://localhost:8000/api';

const LookupSubmission = () => {
  const [input, setInput] = useState(""); // email or id input state
  const [articles, setArticles] = useState<Article[]>([]); // fetched articles state
  const [error, setError] = useState(""); // handle error message state
  const router = useRouter(); // Next.js router
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Function to return user-friendly status messages
  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending': // submitted but not reviewed by moderator
        return 'The article has been submitted and is in the queue for a moderator to review.';
      case 'approved_by_moderator': // approved by moderator but not analyzed
        return 'Your article has been approved by the moderator and is now with the analyst to analyze the claim made.';
      case 'published': // article is live
        return 'Your article is live, YAY! Click the link below to view it.';
      case 'rejected': // article was rejected
        return 'Sorry, your article was been rejected.';
      default: // unknown status
        return 'Unknown status';
    }
  };

  // Function to format dates into a user friendly format (eg October 3, 2024)
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Date Unavailable'; // return if date is not available
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Function to get the correct date based on the articles status and format it
  const getDate = (article: Article) => {
    if (article.status === 'published') return formatDate(article.analyzed_at); // published date
    if (article.status === 'approved_by_moderator') return formatDate(article.moderated_at); // moderated date
    return formatDate(article.submitted_at); // submitted date
  };

  // Function to validate the user input - email or ID
  const validateInput = (input: string) => {
    const emailPattern = /\S+@\S+\.\S+/; // email regex pattern
    const isEmail = emailPattern.test(input); // check if input is an email
    const isValidId = input.length === 24; // check if ID is 24 characters long
  
    if (!isEmail && !isValidId) {
      setError("Please enter a valid email or submission ID.");
      return false;
    }
    return true;
  };

  // Function to handle lookup based on the user input - email or ID
  const handleLookup = async (lookupInput?: string) => {
    setLoading(true); // Start loading animation

    const searchQuery = lookupInput || input; // use provided or current input

    if (!validateInput(searchQuery)) {
      setLoading(false); // Stop loading animation
      return; // validate input
    }

    if (!searchQuery) { // check if input is empty
      setError("Please enter your email or submission ID.");
      setLoading(false); // Stop loading animation
      return;
    }

    setError(""); // Clear previous errors
    setArticles([]); // Clear previous results

    try {
      // Determine if input is an email (by checking for "@")
      const query = searchQuery.includes('@') ? `email=${searchQuery}` : `submissionId=${searchQuery}`;
      const response = await axios.get(`${API_URL}/articles/track?${query}`);

      if (response.data.length === 0) { // if no results found
        setError("No submissions found.");
      } else {
        setArticles(response.data); // set the fetched articles
      }
    } catch (err) {
      if (axios.isAxiosError(err) && !err.response) {
        setError("Network error: Please check your internet connection.");
      } else if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError("No submissions found.");
      } else {
        setError("There was a server issue. Please try again later.");
      }    
    } finally {
      setLoading(false); // Stop loading animation
    }
  };
  
  // Handle Enter key for search
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLookup();
    }
  };

  // Auto lookup if query parameter is present in URL 
  // (eg. /articles/lookup-submission?id=12345 or /articles/lookup-submission?email=email@example.com)
  useEffect(() => {
    const { id, email } = router.query;
    if (id) {
      handleLookup(id as string); // search by ID
      setInput(id as string); // pre fill input field with ID
    } else if (email) {
      handleLookup(email as string); // search by email
      setInput(email as string); // pre fill input field with email
    }
  }, [router.query]); // re-run when query changes

  return (
    <div className={formStyles.container}>
      {loading && <Loading />} {/* Loading message */}

      <h1 className={formStyles.header}>Track My Submissions</h1>

      <p className={formStyles.helpText}>Email or submission ID:</p>
      <div className={formStyles.field} style={{ position: 'relative', paddingRight: '40px' }}>
        <input
          type="text"
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)} // update input state
          placeholder="Please enter your email or submission ID"
          aria-label="Search submissions by email or ID"
          className={formStyles.inputField}
          onKeyPress={handleKeyPress} // enter to search
        />
        <FaSearch
          className={formStyles.searchIcon}
          onClick={() => handleLookup()} // search on click
          style={{ cursor: 'pointer' }}
        />
      </div>

      {error && <p className={formStyles.errorMessage}>{error}</p>} {/* Display error messages */}

      {articles.length > 0 && ( // Display articles if any are found
        <div className={formStyles.submissionsList}>
          <h2>Your Submitted Articles</h2>

          {articles.map((article) => (
            <div key={article._id} className={formStyles.articleCard}>
              <p><strong>Title:</strong> {article.title}</p>
              <p><strong>Submission ID:</strong> {article._id}</p>
              <p><strong>Status:</strong> {getStatusMessage(article.status)}</p>
              <p><strong>{article.status === 'published' ? 'Published On' : article.status === 'approved_by_moderator' ? 'Moderated On' : 'Submitted On'}:</strong> {getDate(article)}</p>

              {/* Show link to article if its published */}
              {article.status === 'published' && (
                <p><Link href={`/articles/${article._id}`} legacyBehavior>
                    <a>View Publised Article</a>
                   </Link>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LookupSubmission;
