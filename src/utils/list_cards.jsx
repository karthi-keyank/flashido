import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchCards } from "./fetch_cards";
import { useAuth } from "../context/auth_context";
import Card from "../components/flashcard/Card";
import "../styles/components/list_cards.css";


function CardList({ setId }) {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState({});

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
    if (loading) {
      // 👇 shimmer placeholders (same size as cards)
      return (
        <div className="card-container">
          {[1].map((n) => (
            <div key={n} className="flip-card shimmer-card">
              <div className="shimmer-box" />
            </div>
          ))}
        </div>
      );
    }

    if (cards.length === 0) return <p>No cards found.</p>;

    return (
      <div className="card-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={flipped[card.id] || false}
            onFlip={() => handleFlip(card.id)}
            // variant = "full"
          />
        ))}
      </div>
    );
  };

  return <div>{renderCards()}</div>;
}

CardList.propTypes = {
  setId: PropTypes.string.isRequired,
};

export default CardList;
