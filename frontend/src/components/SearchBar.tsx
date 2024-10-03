import React, { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import formStyles from "@/styles/Forms.module.scss";
// Define the interface for the SearchBar props.
// This ensures that the 'onSearch' function is passed in as a prop,
// which accepts a string and does not return anything.
interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

// The SearchBar component, which is a functional component using React.FC
// It receives the 'onSearch' function as a prop, which will be called
// when the search term is submitted or updated.
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // Declare a state variable 'searchTerm' to store the user's input in the search bar.
  const [searchTerm, setSearchTerm] = useState('');

  // It checks if the search term is not empty, trims the spaces, and calls the 'onSearch' function.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the form from submitting and refreshing the page.
    if (searchTerm.trim() !== '') { // Check if the search term is not empty.
      onSearch(searchTerm.trim()); // Pass the trimmed search term to the parent component via the 'onSearch' function.
    }
  };

  //Live Search Functionality. Updates the search term state and calls 'onSearch' on each keystroke.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update the search term state with the input value.
    onSearch(e.target.value.trim()); // Call 'onSearch' with the trimmed input value.
  };

  // The JSX part of the component, rendering the search bar.
  return (
    <div className={formStyles.container}>
      <h1 className={formStyles.header}>All Published Articles</h1>
      <form onSubmit={handleSubmit} className={formStyles.field} style={{ position: 'relative', paddingRight: '40px' }}>
        <input
          className={formStyles.inputField}
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Type to search by title, author or date..."
          required
        />
        <FaSearch
          className={formStyles.searchIcon}
        />
      </form>
    </div>
  );
};

export default SearchBar;
