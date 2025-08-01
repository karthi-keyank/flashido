import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchCards } from "./fetch_cards";
import { useAuth } from "../context/auth_context";
import Card from "../components/flashcard/Card";
import ClipLoader from "react-spinners/ClipLoader";

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
      return (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
        >
          <ClipLoader color="#4f8cff" size={50} />
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
