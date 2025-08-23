import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchCards } from "./fetch_cards";
import { useAuth } from "../context/auth_context";
import CardVertical from "../components/flashcard/Card_veritcal";

function CardListVertical({ setId }) {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !setId) return;

    const load = async () => {
      const result = await fetchCards(user.uid, setId);
      setCards(result);
      setLoading(false);
    };

    load();
  }, [user, setId]);

  const renderCards = () => {
    if (loading) {
      return (
        <div className="card-container">
          <div className="vertical-card shimmer-card">
            <div className="shimmer-box" />
          </div>
        </div>
      );
    }

    if (cards.length === 0) return <p>No cards found.</p>;

    return (
      <div className="card-container">
        {cards.map((card) => (
          <CardVertical key={card.id} card={card} />
        ))}
      </div>
    );
  };

  return <div>{renderCards()}</div>;
}

CardListVertical.propTypes = {
  setId: PropTypes.string.isRequired,
};

export default CardListVertical;
