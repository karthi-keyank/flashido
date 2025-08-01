import { useNavigate, useParams } from 'react-router-dom';
import { deleteSetFromDatabase } from '../../utils/deleteSetFromDatabase';
import { useAuth } from '../../context/auth_context';
import CardList from '../../utils/list_cards';
import { pushSetToPublic } from '../../utils/pushToPublic';
import {
  FiArrowLeft,
  FiUpload,
  FiTrash2,
  FiEdit3,
  FiBookOpen,
  FiCpu,
  FiFileText,
} from "react-icons/fi";

function FlashCardPage() {
  const { id: setId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!user?.uid) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const confirm = window.confirm(`Are you sure you want to delete "${setId}"?`);
    if (!confirm) return;

    try {
      await deleteSetFromDatabase(user.uid, setId);
      alert("✅ Set deleted successfully");
      navigate(-1);
    } catch (error) {
      console.error("❌ Failed to delete set:", error);
      alert("❌ Could not delete the set. Please try again.");
    }
  };

  const handlePushToPublic = async () => {
    if (!user || !setId) {
      alert("User not authenticated or set ID missing.");
      return;
    }

    const confirm = window.confirm(`Are you sure you want to publish "${setId}" to public?`);
    if (!confirm) return;

    const success = await pushSetToPublic(user.uid, setId);
    if (success) {
      alert("✅ Set pushed to public successfully!");
    } else {
      alert("❌ Failed to push set to public.");
    }
  };

  return (
    <div className="flashcard-page">
      <div className="set-options">
        <button className="btn-back" onClick={() => navigate(-1)} title="Back">
          <FiArrowLeft />
        </button>
        <button className="btn-push" onClick={handlePushToPublic} title="Push to Public">
          <FiUpload />
        </button>
        <button className="btn-delete" onClick={handleDelete} title="Delete">
          <FiTrash2 />
        </button>
        <button
          className="btn-edit"
          onClick={() => navigate(`/flashcard/edit-set/${setId}`)}
          title="Edit"
        >
          <FiEdit3 />
        </button>
      </div>

      <h3 className="set-title">{setId}</h3>

      <div className="study-mode-tabs">
        <button className="tab-button">
          <FiBookOpen className="tab-icon" /> Flashcard
        </button>
        <button className="tab-button">
          <FiCpu className="tab-icon" /> Learn
        </button>
        <button className="tab-button">
          <FiFileText className="tab-icon" /> Test
        </button>
      </div>

      <CardList setId={setId} />
    </div>
  );
}

export default FlashCardPage;
