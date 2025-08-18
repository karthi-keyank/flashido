import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiArrowLeft, FiUpload, FiTrash2, FiEdit3 } from "react-icons/fi";
import { deleteSetFromDatabase } from "../../utils/deleteSetFromDatabase";
import { pushSetToPublic } from "../../utils/pushToPublic";
import ClipLoader from "react-spinners/ClipLoader"; 
import "../../styles/components/flashcard_page_header.css";

function FlashcardPageHeader({ navigate, user, setId }) {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingPush, setLoadingPush] = useState(false);
  const [message, setMessage] = useState(null); // ✅ Toast message
  const [messageType, setMessageType] = useState("success"); // "success" | "error"
  const [confirmAction, setConfirmAction] = useState(null); // ✅ Modal confirm state

  // Show toast message
  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000); // auto close after 3s
  };

  const handleDelete = async () => {
    if (!user?.uid) {
      showMessage("⚠️ Please login to delete.", "error");
      return;
    }

    setConfirmAction(() => async () => {
      try {
        setLoadingDelete(true);
        await deleteSetFromDatabase(user.uid, setId);
        showMessage("✅ Set deleted successfully!");
        navigate(-1);
      } catch (error) {
        console.error("❌ Failed to delete set:", error);
        showMessage("❌ Could not delete set.", "error");
      } finally {
        setLoadingDelete(false);
        setConfirmAction(null);
      }
    });
  };

  const handlePushToPublic = async () => {
    if (!user?.uid || !setId) {
      showMessage("⚠️ User not authenticated.", "error");
      return;
    }

    setConfirmAction(() => async () => {
      try {
        setLoadingPush(true);
        const success = await pushSetToPublic(user.uid, setId);
        if (success) {
          showMessage("✅ Set pushed to public!");
        } else {
          showMessage("❌ Failed to push set to public.", "error");
        }
      } finally {
        setLoadingPush(false);
        setConfirmAction(null);
      }
    });
  };

  return (
    <>
      {/* Header */}
      <header className="flashcard-header">
        <button
          className="header-btn back-btn"
          onClick={() => navigate(-1)}
          title="Back"
        >
          <FiArrowLeft />
        </button>

        <div className="header-actions">
          <button
            className="header-btn"
            onClick={handlePushToPublic}
            title="Push to Public"
            disabled={loadingPush}
          >
            {loadingPush ? <ClipLoader size={18} color="#000" /> : <FiUpload />}
          </button>
          <button
            className="header-btn delete-btn"
            onClick={handleDelete}
            title="Delete"
            disabled={loadingDelete}
          >
            {loadingDelete ? <ClipLoader size={18} color="#000" /> : <FiTrash2 />}
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

      {/* ✅ Toast message */}
      {message && (
        <div className={`popup-message ${messageType}`}>
          {message}
        </div>
      )}

      {/* ✅ Confirmation modal */}
      {confirmAction && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Are you sure?</p>
            <div className="confirm-buttons">
              <button onClick={confirmAction} className="confirm-yes">Yes</button>
              <button onClick={() => setConfirmAction(null)} className="confirm-no">No</button>
            </div>
          </div>
        </div>
      )}
    </>
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
