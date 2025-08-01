// components/SearchBar.jsx
import React, { useState } from "react";
import { useAppData } from "../../context/app_data";
import SearchInput from "./SearchInput";
import FlashcardList from "../../utils/FlashcardList";
import "../../styles/components/search_bar.css"

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { sets, loading } = useAppData();

  const handleSearch = (e) => {
    e.preventDefault();
  };

  if (loading || !sets)
    return <p className="search-bar__loading">Loading...</p>;

  const filteredSets = sets.filter((set) =>
    set.title?.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div className="search-bar">
      <div className="search-bar__input-wrapper">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSubmit={handleSearch}
        />
      </div>
      <div className="search-bar__results">
        <FlashcardList sets={filteredSets} />
      </div>
    </div>
  );
}

export default SearchBar;
