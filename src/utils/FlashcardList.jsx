import React from "react";
import PropTypes from "prop-types";
import CardGrid from "../components/flashcard/card_grid";
import "../styles/components/flash_card_list.css"
function FlashcardList({ sets }) {
  if (!sets || sets.length === 0) {
    return <p className="flashcard-list__empty">No flashcard sets found.</p>;
  }

  return (
    <div className="flashcard-list">
      <h4 className="flashcard-list__title">Flashcard Sets</h4>
      <div className="flashcard-list__grid">
        {sets.map((set) => (
          <CardGrid
            key={set.id}
            card={{
              id: set.id,
              name: set.title,
              description: set.description,
              termCount: set.termCount || 0, // or adjust your logic
              author: set.author || "unknown",
            }}
          />
        ))}
      </div>
    </div>
  );
}

FlashcardList.propTypes = {
  sets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ),
};

export default FlashcardList;
