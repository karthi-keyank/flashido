import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

 function CardGrid({card}) {
    const navigate = useNavigate();

    function onCardClick(){
        navigate(`/flashcard/${card.id}`); // Adjust the path as needed
    }
    return <div className="card">
        <button 
        className="card-btn"
        onClick={onCardClick}
        aria-label="click to open"
        >
        <h3>{card.name}</h3> 
        <p>{card.description}</p>
        </button>
    </div>
}

CardGrid.propTypes = {
    card: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default CardGrid