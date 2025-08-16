import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth_context";
import CardList from "../../utils/list_cards";
import FlashcardPageHeader from "../../components/flashcard/flashcard_page_header";
import "../../styles/pages/flashcard_page.css";
import { useAppData } from "../../context/app_data";
import { FiBookOpen, FiCpu, FiFileText } from "react-icons/fi";

function FlashCardPage() {
  const { id: setId } = useParams();
  const { user, username } = useAuth();
  const { sets } = useAppData();
  const currentSet = sets.find((set) => set.id === setId);
  const termCount = currentSet?.termCount ?? 0;
  const navigate = useNavigate();

  return (
    <div className="flashcard-page">
      {/* Header */}
      <FlashcardPageHeader navigate={navigate} user={user} setId={setId} />

      {/* Flashcard List */}
      <div className="flashcard-page__content">
        <CardList setId={setId} />

        {/* Set info */}
        <section className="set-info">
          <h2 className="set-title">{setId}</h2>
          <div className="set-meta">
            <span className="username">{username}</span>
            <span className="divider">|</span>
            <span className="term-count">{termCount} terms</span>
          </div>
        </section>

        {/* Study mode buttons */}
        <section className="study-modes">
          <button className="study-mode">
            <FiBookOpen className="icon" />
            <span>Flashcards</span>
          </button>

          <button className="study-mode">
            <FiCpu className="icon" />
            <span>Learn</span>
          </button>

          <button className="study-mode">
            <FiFileText className="icon" />
            <span>Test</span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default FlashCardPage;
