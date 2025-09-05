import React, { useEffect, useState, useRef } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { fetchCards } from "../../utils/fetch_cards";
import { useAuth } from "../../context/auth_context";
import { FiX, FiSettings, FiArrowLeft, FiArrowRight, FiPlay, FiPause} from "react-icons/fi";
import Card from "../../components/flashcard/Card";
import LoadingSpinner from "../../components/loading_spinner";
import { AnimatePresence, motion } from "framer-motion";
import "../../styles/pages/flashcards_flip.css";

// 🔼 Header
function FlashCardHeader({ currentIndex, total, onClose }) {
  const progress = ((currentIndex + 1) / total) * 100;
  return (
    <div className="flashcard-flip-header">
      <button className="close-btn" onClick={onClose}><FiX /></button>
      <h2 className="progress-counter">{currentIndex + 1} / {total}</h2>
      <button className="settings-btn"><FiSettings /></button>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

// 🔽 Bottom Navigation + Play/Pause
function FlashCardBottom({ onPrev, onNext, isPlaying, togglePlay }) {
  return (
    <div className="nav-buttons">
      <button onClick={onPrev} className="nav-btn"><FiArrowLeft className="nav-icon" /> Previous</button>
      <button onClick={togglePlay} className="nav-btn play-btn">
        {isPlaying ? <FiPause /> : <FiPlay />}
      </button>
      <button onClick={onNext} className="nav-btn">Next <FiArrowRight className="nav-icon" /></button>
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
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔹 Configurable timing variables (ms)
  const frontReadTime = 3000; // show front for 3s
  const backReadTime = 5000;  // show back for 3s
  const timerRef = useRef(null);
  const phaseRef = useRef('front'); // track phase: 'front' or 'back'

  // 🔹 Load cards
  useEffect(() => {
    if (!user || !setId) return;

    const load = async () => {
      const result = await fetchCards(user.uid, setId);
      setCards(result);
      setLoading(false);
      setCurrentIndex(0);
      setFlipped({});
    };
    load();
  }, [user, setId]);

  // 🔹 Manual navigation
  const handleFlip = (cardId) => {
    setFlipped((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };
  const togglePlay = () => setIsPlaying((prev) => !prev);

  // 🔹 Auto-play logic (front 3s, flip, back 3s, next)
  useEffect(() => {
    if (!isPlaying || !cards.length) {
      clearTimeout(timerRef.current);
      phaseRef.current = 'front';
      return;
    }

    const currentCard = cards[currentIndex];
    if (!currentCard) return;

    // Always start with front side
    setFlipped((prev) => ({ ...prev, [currentCard.id]: false }));
    phaseRef.current = 'front';

    // Show front for frontReadTime
    timerRef.current = setTimeout(() => {
      // Flip to back
      setFlipped((prev) => ({ ...prev, [currentCard.id]: true }));
      phaseRef.current = 'back';

      // Show back for backReadTime
      timerRef.current = setTimeout(() => {
        // Move to next card, always start with front
        setFlipped((prev) => ({ ...prev, [currentCard.id]: false }));
        handleNext();
      }, backReadTime);
    }, frontReadTime);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentIndex, cards, frontReadTime, backReadTime]);

  if (loading) return <div className="card-container"><LoadingSpinner /></div>;
  if (!cards.length) return <p>No cards found.</p>;

  const card = cards[currentIndex];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.2 } },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, transition: { duration: 0.2 } }),
  };

  return (
    <div className="card-wrapper">
      <FlashCardHeader currentIndex={currentIndex} total={cards.length} onClose={() => navigate(-1)} />
      <div className="card-container">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={card.id} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="flip-card full">
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
      <FlashCardBottom onPrev={handlePrev} onNext={handleNext} isPlaying={isPlaying} togglePlay={togglePlay} />
    </div>
  );
}

export default FlashCardFlip;
