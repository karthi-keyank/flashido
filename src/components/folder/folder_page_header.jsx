import PropTypes from "prop-types";
import ThreeDotMenu from "./ThreeDotMenu";
import PopupModal from "../buttons/PopupModal";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/auth_context";
import { useState } from "react";

function FolderPageHeader({ title, id }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDelete = async () => {
    if (!user?.uid) {
      setShowSuccess(true); // show error popup instead of alert
      return;
    }

    const confirmDelete = window.confirm(`Delete folder "${title}"?`);
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      const folderRef = doc(db, `users/${user.uid}/folders/${id}`);
      await deleteDoc(folderRef);
      setShowSuccess(true);
    } catch (err) {
      console.error("❌ Failed to delete folder:", err);
      setShowSuccess(true); // show error
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="folder-page-header">
      <button onClick={() => navigate(-1)}>⬅</button>
      <h2>📁 {title}</h2>

      <div style={{ position: "relative" }}>
        <button onClick={() => navigate(`/Library/folder/${id}/getsets`)}>
          +
        </button>
        <ThreeDotMenu
          onDelete={() => setShowConfirm(true)}
          deleting={deleting}
        />
      </div>

      {/* Confirmation Popup */}
      <PopupModal
        isOpen={showConfirm}
        title="Confirm Deletion"
        message={`Are you sure you want to delete folder "${title}"?`}
        onConfirm={() => {
          setShowConfirm(false);
          handleDelete();
        }}
        onCancel={() => setShowConfirm(false)}
      />

      {/* Success Popup */}
      <PopupModal
        isOpen={showSuccess}
        title="Deleted"
        message={`Folder "${title}" deleted successfully.`}
        onConfirm={() => {
          setShowSuccess(false);
          navigate(-1);
        }}
        onCancel={() => setShowSuccess(false)}
        confirmText="OK"
        cancelText=""
      />
    </div>
  );
}

FolderPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default FolderPageHeader;
