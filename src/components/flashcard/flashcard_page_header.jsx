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

    const confirm = window.confirm(
      `Are you sure you want to delete "${setId}"?`
    );
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

    const confirm = window.confirm(
      `Are you sure you want to publish "${setId}" to public?`
    );
    if (!confirm) return;

    const success = await pushSetToPublic(user.uid, setId);
    if (success) {
      alert("✅ Set pushed to public successfully!");
    } else {
      alert("❌ Failed to push set to public.");
    }
  };

  return (
    <div className="set-options">
      <button className="btn-back" onClick={() => navigate(-1)} title="Back">
        <FiArrowLeft />
      </button>

      <div className="action-buttons">
        <button
          className="btn-push"
          onClick={handlePushToPublic}
          title="Push to Public"
        >
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
    </div>
  );
}

// ✅ Prop types validation for SonarQube & best practice
FlashcardPageHeader.propTypes = {
  navigate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
  setId: PropTypes.string.isRequired,
};

export default FlashcardPageHeader;
