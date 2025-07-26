import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import "../../styles/components/CardInput.css"

function CardInput({ index, term, definition, updateCard, deleteCard }) {
  return (
    <div className="card-input">
      <input
        type="text"
        className="card-input-term"
        placeholder="TERM"
        value={term}
        onChange={(e) => updateCard(index, "term", e.target.value)}
      />
      <textarea
  className="card-input-definition"
  placeholder="DEFINITION"
  value={definition}
  onChange={(e) => updateCard(index, "definition", e.target.value)}
  rows={3}
/>

      <button className="card-input-delete-btn" onClick={() => deleteCard(index)}>
        <FaTrash />
      </button>
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
