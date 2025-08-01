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
  const termCount = currentSet?.termCount;
  const navigate = useNavigate();

  return (
    <div className="flashcard-page-container">
      <FlashcardPageHeader navigate={navigate} user={user} setId={setId} />
      <CardList setId={setId} />
      <div className="contents">
        <div className="flashcard-set-info">
          <h3 className="set-title-heading">{setId}</h3>
          <div className="set-meta">
            <span className="username-text">{username}</span>
            <span className="divider">|</span>
            <span className="term-count">{termCount} terms</span>
          </div>
        </div>

        <div className="study-mode-button-group">
          <button className="study-mode-button">
            <span className="study-mode-icon">
              <FiBookOpen />
            </span>
            <span className="study-mode-label">Flashcards</span>
          </button>

          <button className="study-mode-button">
            <span className="study-mode-icon">
              <FiCpu />
            </span>
            <span className="study-mode-label">Learn</span>
          </button>

          <button className="study-mode-button">
            <span className="study-mode-icon">
              <FiFileText />
            </span>
            <span className="study-mode-label">Test</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlashCardPage;
