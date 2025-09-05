import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth_context";
import CardList from "../../utils/list_cards";
import FlashcardPageHeader from "../../components/flashcard/flashcard_page_header";
import "../../styles/pages/flashcard_page.css";
import { useAppData } from "../../context/app_data";
import { FiBookOpen, FiCpu, FiFileText } from "react-icons/fi";
import { useMemo } from "react";

function FlashCardPage() {
  const { id: setId } = useParams();
  const { user, username } = useAuth();
  const { sets } = useAppData();
  const navigate = useNavigate();

  const currentSet = useMemo(
    () => sets.find((set) => set.id === setId),
    [sets, setId]
  );

  const termCount = currentSet?.termCount ?? 0;

  return (
    <div className="flashcard-page">
      {/* Header */}
      <FlashcardPageHeader navigate={navigate} user={user} setId={setId} />

      {/* Flashcard List */}
      <div className="flashcard-page__content">
        <CardList setId={setId} />

        {/* Set info */}
        <section className="set-info">
          <h2 className="set-title">{currentSet?.title ?? "Untitled Set"}</h2>
          <p className="set-desc">{currentSet?.description ?? "No description"}</p>
          <div className="set-meta">
            <span className="username">{username ?? "Unknown User"}</span>
            <span className="divider">|</span>
            <span className="term-count">{termCount} terms</span>
          </div>
        </section>

        {/* Study mode buttons */}
        <section className="study-modes">
          <button
            className="study-mode"
            onClick={() => navigate(`/set/${setId}/flashcards`)}
          >
            <FiBookOpen className="icon" />
            <span>Flashcards</span>
          </button>

          <button
            className="study-mode"
            onClick={() => navigate(`/set/${setId}/learn`)}
          >
            <FiCpu className="icon" />
            <span>Learn</span>
          </button>

          <button
            className="study-mode"
            onClick={() => navigate(`/set/${setId}/test`)}
          >
            <FiFileText className="icon" />
            <span>Test</span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default FlashCardPage;
