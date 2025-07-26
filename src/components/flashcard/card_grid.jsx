import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FiLayers } from "react-icons/fi"; // Icon for flashcard
import "../../styles/components/card_grid.css"; // Import CSS

function CardGrid({ card }) {
  const navigate = useNavigate();

  function onCardClick() {
    navigate(`/flashcard/${card.id}`);
  }

  return (
    <div className="card-grid">
      <button
        className="card-grid__button"
        onClick={onCardClick}
        aria-label="Open flashcard set"
      >
        <div className="card-grid__icon-wrapper">
          <FiLayers className="card-grid__icon" />
        </div>
        <div className="card-grid__info">
          <h3 className="card-grid__title">{card.name}</h3>
          <p className="card-grid__meta">
            Flashcard set &bull; {card.termCount} terms
          </p>
        </div>
      </button>
    </div>
  );
}

CardGrid.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    termCount: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardGrid;
