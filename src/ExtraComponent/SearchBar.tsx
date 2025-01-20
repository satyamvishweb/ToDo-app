import React from 'react';
import './SearchBar.css'; // Import the CSS file for styling
import { FaSearch } from 'react-icons/fa'; // Importing a search icon

interface SearchBarProps {
  placeholder: string; // Placeholder text for the search input
  onSearch: (value: string) => void; // Function to handle search input changes
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
