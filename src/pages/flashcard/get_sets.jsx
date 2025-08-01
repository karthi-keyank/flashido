import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAppData } from "../../context/app_data";
import SearchInput from "../../components/library/SearchInput";
import ToggleButton from "../../components/buttons/toggle_btn";
import { FaArrowLeft } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import ClipLoader from "react-spinners/ClipLoader"; // Add this import
import "../../styles/pages/get_sets.css";
// ✅ Flashcard set list UI component
function SetList({ sets, folderId }) {
  if (!sets.length) return <p>No flashcard sets found.</p>;

  return (
  <div className="page__wrapper">
    <div className="list-sets__container">
      {sets.map((set) => (
        <div key={set.id} className="list-set__card">
          <div className="list-set__icon">
            <FiLayers className="FiLayer-icon"/>
          </div>
          <div className="list-set__content">
            <h4 className="list-set__title">{set.title}</h4>
            <p className="list-set__desc">
              Flashcard set &bull; {set.termCount || 0} terms
            </p>
          </div>
          <ToggleButton setId={set.id} folderId={folderId} />
        </div>
      ))}
    </div>
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
    <div className="page__wrapper" >
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft size={14} style={{ marginRight: "8px" }} />
      </button>
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmit={(e) => e.preventDefault()}
      />

      {loading ? (
        <div className="list-sets__loading">
          <ClipLoader size={24} color="#a58fff" />
        </div>
      ) : (
        <div className="list_wrapper">
        <SetList sets={filteredSets} folderId={folderId} />
        </div>
      )}
    </div>
  );
}

export default ListSets;
