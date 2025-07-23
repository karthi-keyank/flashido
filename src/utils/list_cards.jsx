import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchCards } from "./fetch_cards"; // Adjust path as needed
import { useAuth } from "../context/auth_context"; // Adjust path
import "../styles/components/Flashcard.css"; // Flip card styles (you'll create this)

function CardList({ setId }) {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState({}); // Track flipped cards

  useEffect(() => {
    if (!user || !setId) return;

    const load = async () => {
      const result = await fetchCards(user.uid, setId);
      setCards(result);
      setLoading(false);
    };

    load();
  }, [user, setId]);

  const handleFlip = (cardId) => {
    setFlipped((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const renderCards = () => {
    if (loading) return <p>Loading...</p>;
    if (cards.length === 0) return <p>No cards found.</p>;

    return (
      <div className="card-container">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`flip-card ${flipped[card.id] ? "flipped" : ""}`}
            type="button"
            onClick={() => handleFlip(card.id)}
            aria-pressed={flipped[card.id]}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>Q: {card.Q}</h3>
              </div>
              <div className="flip-card-back">
                <p>A: {card.A}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderCards()}
    </div>
  );
}

CardList.propTypes = {
  setId: PropTypes.string.isRequired,
};

export default CardList;
