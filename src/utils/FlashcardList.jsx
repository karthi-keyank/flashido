// components/FlashcardList.jsx
import React from "react";
import PropTypes from "prop-types";
import CardGrid from "../components/flashcard/card_grid";

function FlashcardList({ sets }) {
  if (!sets || sets.length === 0) {
    return <p>No flashcard sets found.</p>;
  }

  return (
     <div className="cards-grid">
      <h4>Flashcard Sets</h4>
      {sets.map((set) => (
        <CardGrid key={set.id} card={{ 
          id: set.id, 
          name: set.title, 
          description: set.description 
        }} />
      ))}
    </div>
  );
}
FlashcardList.propTypes = {
  sets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  )
};

export default FlashcardList;
