import React from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi"; // Import search icon
import "../../styles/components/search_bar.css"
function SearchInput({ searchQuery, setSearchQuery, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="search-input__form">
      <input
        type="text"
        id="search"
        placeholder="Search flashcard sets..."
        className="search-input__field"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="search-input__button" title="Search">
        <FiSearch className="search-input__icon" />
      </button>
    </form>
  );
}

SearchInput.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchInput;
