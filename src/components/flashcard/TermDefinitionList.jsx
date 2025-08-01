import React from "react";
import PropTypes from "prop-types";
import CardInput from "./CardInput";
import "../../styles/components/TermDefinitionList.css";

function TermDefinitionList({ cards, updateCard, deleteCard }) {
  return (
    <div className="term-definition-list">
      {cards.map((card, index) => (
        <CardInput
          key={card.id}
          index={index}
          term={card.term}
          definition={card.definition}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      ))}
    </div>
  );
}

TermDefinitionList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      term: PropTypes.string,
      definition: PropTypes.string,
    })
  ).isRequired,
  updateCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default TermDefinitionList;
