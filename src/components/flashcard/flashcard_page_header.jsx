import React from "react";
import PropTypes from "prop-types";
import { FiArrowLeft, FiUpload, FiTrash2, FiEdit3 } from "react-icons/fi";
import { deleteSetFromDatabase } from "../../utils/deleteSetFromDatabase";
import { pushSetToPublic } from "../../utils/pushToPublic";
import "../../styles/components/flashcard_page_header.css";

function FlashcardPageHeader({ navigate, user, setId }) {
  const handleDelete = async () => {
    if (!user?.uid) {
      alert("User not authenticated. Please log in.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${setId}"?`)) return;

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
    if (!user?.uid || !setId) {
      alert("User not authenticated or set ID missing.");
      return;
    }

    if (!window.confirm(`Publish "${setId}" to public?`)) return;

    const success = await pushSetToPublic(user.uid, setId);
    if (success) {
      alert("✅ Set pushed to public successfully!");
    } else {
      alert("❌ Failed to push set to public.");
    }
  };

  return (
    <header className="flashcard-header">
      {/* Back button (left side) */}
      <button
        className="header-btn back-btn"
        onClick={() => navigate(-1)}
        title="Back"
      >
        <FiArrowLeft />
      </button>

      {/* Action buttons (right side) */}
      <div className="header-actions">
        <button
          className="header-btn"
          onClick={handlePushToPublic}
          title="Push to Public"
        >
          <FiUpload />
        </button>
        <button
          className="header-btn delete-btn"
          onClick={handleDelete}
          title="Delete"
        >
          <FiTrash2 />
        </button>
        <button
          className="header-btn edit-btn"
          onClick={() => navigate(`/flashcard/edit-set/${setId}`)}
          title="Edit"
        >
          <FiEdit3 />
        </button>
      </div>
    </header>
  );
}

FlashcardPageHeader.propTypes = {
  navigate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
  setId: PropTypes.string.isRequired,
};

export default FlashcardPageHeader;
