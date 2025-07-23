import PropTypes from "prop-types";

function CardInput({ index, term, definition, updateCard, deleteCard}) {
  return (
    <div>
      <input
        type="text"
        placeholder="TERM"
        value={term}
        onChange={(e) => updateCard(index, "term", e.target.value)}
      />
      <input
        type="text"
        placeholder="DEFINITION"
        value={definition}
        onChange={(e) => updateCard(index, "definition", e.target.value)}
      />
      <button onClick={() => deleteCard(index)}>🗑</button>
    </div>
  );
}

CardInput.propTypes = {
  index: PropTypes.number.isRequired,
  term: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  updateCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default CardInput;
