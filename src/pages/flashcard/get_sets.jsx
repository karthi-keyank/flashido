import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAppData } from "../../context/app_data";
import SearchInput from "../../components/library/SearchInput";
import ToggleButton from "../../components/buttons/toggle_btn";

// ✅ Flashcard set list UI component
function SetList({ sets, folderId }) {
  if (!sets.length) return <p>No flashcard sets found.</p>;

  return (
    <div className="cards-grid">
      {sets.map((set) => (
        <div
          key={set.id}
          className="card"
        >
          <h4>{set.title}</h4>
          <ToggleButton setId={set.id} folderId={folderId} />
        </div>
      ))}
    </div>
  );
}

SetList.propTypes = {
  sets: PropTypes.array.isRequired,
  folderId: PropTypes.string.isRequired,
};

// ✅ Main component for listing sets
function ListSets() {
  const { id: folderId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { sets, loading } = useAppData();

  const filteredSets = sets.filter((set) =>
    set.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-bar">
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmit={(e) => e.preventDefault()}
      />

      {loading ? <p>Loading...</p> : <SetList sets={filteredSets} folderId={folderId} />}
    </div>
  );
}

export default ListSets;
