import { useNavigate, useParams } from 'react-router-dom';
import { deleteSetFromDatabase } from '../../utils/deleteSetFromDatabase';
import { useAuth } from '../../context/auth_context';
import CardList from '../../utils/list_cards';

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

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>⬅</button>
        <button onClick={handleDelete}>🗑</button>
        <button onClick={() => navigate(`/flashcard/edit-set/${setId}`)}>
        ✏️
        </button>
      </div>

      <h3>{setId}</h3>
      <div>
        <button>📖 Flashcard</button>
        <button>🧠 Learn</button>
        <button>📝 Test</button>
      </div>
      <CardList setId={setId} />
    </div>
  );
}

export default FlashCardPage;
