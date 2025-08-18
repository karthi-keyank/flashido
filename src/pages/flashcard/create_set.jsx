import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth_context";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase";
import TopBar from "../../components/flashcard/TopBar";
import TitleInput from "../../components/flashcard/TitleInput";
import TermDefinitionList from "../../components/flashcard/TermDefinitionList";
import AddCardButton from "../../components/buttons/AddCardButton";
import "../../styles/pages/create_set.css";
import LoadingSpinner from "../../components/loading_spinner";

function CreateSetPage() {
  const { setId } = useParams();
  const { user } = useAuth();
  const userId = user?.uid;
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(!!setId);

  // ✅ New states for popup messages
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!userId) return;

    const loadSet = async () => {
      if (!setId) {
        setCards([{ id: uuidv4(), term: "", definition: "" }]);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, `users/${userId}/flashcardSets/${setId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setDescription(data.description || "");

          const cardsArray = Object.values(data.Cards || {}).map((card) => ({
            id: uuidv4(),
            term: card.Q || "",
            definition: card.A || "",
          }));

          setCards(
            cardsArray.length
              ? cardsArray
              : [{ id: uuidv4(), term: "", definition: "" }]
          );
        } else {
          setErrorMessage("⚠️ Set not found.");
        }
      } catch (error) {
        console.error("Error loading set:", error);
        setErrorMessage("❌ Failed to load set.");
      } finally {
        setLoading(false);
      }
    };

    loadSet();
  }, [setId, userId]);

  // ✅ Auto-dismiss popup messages
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  const addNewCard = () => {
    setCards([...cards, { id: uuidv4(), term: "", definition: "" }]);
  };

  const updateCard = (index, field, value) => {
    const updated = [...cards];
    updated[index][field] = value;
    setCards(updated);
  };

  const deleteCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!userId) {
      setErrorMessage("⚠️ User not identified. Please re-login.");
      return;
    }

    if (!title.trim()) {
      setErrorMessage("⚠️ Title is required.");
      return;
    }

    const newSetId = setId || title.trim().replace(/\s+/g, "_").toLowerCase();
    const docRef = doc(db, `users/${userId}/flashcardSets/${newSetId}`);

    const cardMap = {};
    cards.forEach((card, index) => {
      cardMap[`card${index + 1}`] = {
        Q: card.term,
        A: card.definition,
      };
    });

    try {
      await setDoc(docRef, {
        title,
        description,
        termCount: cards.length,
        Cards: cardMap,
      });

      setSuccessMessage("✅ Set saved successfully!");
      setTimeout(() => navigate("/Library"), 1500); // Delay for UX
    } catch (error) {
      console.error("Error saving set:", error);
      setErrorMessage("❌ Failed to save set. Try again.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="create-set-page">
      {/* ✅ Popup messages */}
      {errorMessage && (
        <div className="popup-message error">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="popup-message success">{successMessage}</div>
      )}

      <TopBar className="create-set-topbar" onSave={handleSave} />

      <div className="create-set-page__content">
        <div className="create-set-title-section">
          <TitleInput
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            className="create-set-title-input"
          />
        </div>

        <div className="create-set-terms">
          <TermDefinitionList
            cards={cards}
            updateCard={updateCard}
            deleteCard={deleteCard}
            className="create-set-term-list"
          />
        </div>
      </div>

      {/* Floating add button outside scrollable area */}
      <div className="create-set-add-button-wrapper">
        <AddCardButton onClick={addNewCard} className="create-set-add-button" />
      </div>
    </div>
  );
}

export default CreateSetPage;
