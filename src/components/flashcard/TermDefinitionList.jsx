import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import CardInput from "./CardInput";
import "../../styles/components/TermDefinitionList.css";

function TermDefinitionList({ cards, updateCard, deleteCard }) {
  return (
    <div className="term-definition-list">
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: 50, scale: 0.8 }} // start slightly small & right
            animate={{ opacity: 1, x: 0, scale: 1 }} // pop in
            exit={{ opacity: 0, x: -50, scale: 0.8 }} // exit left
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            layout
            id={`card-${index}`}
          >
            <CardInput
              index={index}
              term={card.term}
              definition={card.definition}
              updateCard={updateCard}
              deleteCard={deleteCard}
              autoFocus={index === cards.length - 1}
            />
          </motion.div>
        ))}
      </AnimatePresence>
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
