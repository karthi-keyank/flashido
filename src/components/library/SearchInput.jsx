import React from "react";
import PropTypes from "prop-types";

function SearchInput({ searchQuery, setSearchQuery, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <label htmlFor="search" className="sr-only">Search</label>
      <input
        type="text"
        id="search"
        placeholder="Search flashcard sets..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="search-button">🔍</button>
    </form>
  );
}

SearchInput.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchInput;
