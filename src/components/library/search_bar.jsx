// components/SearchBar.jsx
import React, { useState } from "react";
import { useAppData } from "../../context/app_data"; // ✅ import global context
import SearchInput from "./SearchInput";
import FlashcardList from "../../utils/FlashcardList";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { sets, loading } = useAppData();

  const handleSearch = (e) => {
    e.preventDefault();
  };

  if (loading || !sets) return <p>Loading...</p>;

  const filteredSets = sets.filter((set) =>
    set.title?.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div className="search-bar">
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmit={handleSearch}
      />
      <FlashcardList sets={filteredSets} />
    </div>
  );
}


export default SearchBar;
