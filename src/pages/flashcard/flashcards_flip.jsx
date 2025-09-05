import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCards } from "../../utils/fetch_cards";
import { useAuth } from "../../context/auth_context";
import { FiX, FiSettings, FiArrowLeft, FiArrowRight } from "react-icons/fi"; // 🔥 react-icons
import Card from "../../components/flashcard/Card";
import LoadingSpinner from "../../components/loading_spinner"; // ✅ Spinner import
import { AnimatePresence, motion } from "framer-motion"; // ✅ Animations
import "../../styles/pages/flashcards_flip.css";

// 🔼 Header Component with Progress & Close Button
function FlashCardHeader({ currentIndex, total, onClose }) {
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="flashcard-flip-header">
      {/* Close Button */}
      <button className="close-btn" onClick={onClose}>
        <FiX />
      </button>

      {/* Counter */}
      <h2 className="progress-counter">
        {currentIndex + 1} / {total}
      </h2>

      {/* Settings Button */}
      <button className="settings-btn">
        <FiSettings />
      </button>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

// 🔽 Bottom Navigation Component
function FlashCardBottom({ onPrev, onNext }) {
  return (
    <div className="nav-buttons">
      <button onClick={onPrev} className="nav-btn">
        <FiArrowLeft className="nav-icon" /> Previous
      </button>
      <button onClick={onNext} className="nav-btn">
        Next <FiArrowRight className="nav-icon" />
      </button>
    </div>
  );
}

function FlashCardFlip() {
  const { user } = useAuth();
  const { setId } = useParams();
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 👈 track direction

  useEffect(() => {
    if (!user || !setId) return;

    const load = async () => {
      const result = await fetchCards(user.uid, setId);
      setCards(result);
      setLoading(false);
      setCurrentIndex(0);
    };

    load();
  }, [user, setId]);

  const handleFlip = (cardId) => {
    setFlipped((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  // ✅ Update direction when navigating
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  if (loading) {
    return (
      <div className="card-container">
        <LoadingSpinner /> {/* ✅ Spinner replaces shimmer */}
      </div>
    );
  }

  if (cards.length === 0) return <p>No cards found.</p>;

  const card = cards[currentIndex];

  // ✅ Animation Variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300, // slide from right/left
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300, // slide out opposite
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <div className="card-wrapper">
      {/* ⬆️ Header */}
      <FlashCardHeader
        currentIndex={currentIndex}
        total={cards.length}
        onClose={() => navigate(-1)}
      />

      {/* 🎴 Card */}
      <div className="card-container">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={card.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flip-card full"
          >
            <Card
              key={card.id}
              card={card}
              flipped={flipped[card.id] || false}
              onFlip={() => handleFlip(card.id)}
              variant="full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ⬇️ Bottom */}
      <FlashCardBottom onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
}

export default FlashCardFlip;
