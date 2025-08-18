import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/auth_context";
import { FaPlus, FaTimes } from "react-icons/fa";
import "../../styles/components/create_folder.css";

function CreateFolder({ isOpen, onClose }) {
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const { user } = useAuth();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleAddFolder = async () => {
    if (!folderName.trim()) {
      setErrorMessage("⚠️ Folder name is required");
      return;
    }

    if (!user?.uid) {
      setErrorMessage("⚠️ User not found. Please log in again.");
      return;
    }

    setLoading(true); // start loading

    try {
      const folderDocRef = doc(db, `users/${user.uid}/folders/${folderName}`);
      await setDoc(folderDocRef, {
        title: folderName,
        description: folderDescription,
        Sets: [],
      });

      setFolderName("");
      setFolderDescription("");
      setErrorMessage("");
      setLoading(false);
      onClose(); // ✅ close only after success
    } catch (error) {
      console.error("Error while adding folder:", error);
      setErrorMessage("❌ Error adding folder. Try again.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} disabled={loading}>
          <FaTimes />
        </button>

        <h2 className="modal-title">Create New Folder</h2>

        {errorMessage && <div className="error-popup">{errorMessage}</div>}

        <input
          className="folder-input"
          type="text"
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          disabled={loading}
        />
        <input
          className="folder-input"
          type="text"
          placeholder="Description"
          value={folderDescription}
          onChange={(e) => setFolderDescription(e.target.value)}
          disabled={loading}
        />

        <button
          className="create-button"
          onClick={handleAddFolder}
          disabled={loading}
        >
          {loading ? "⏳ Creating..." : <><FaPlus /> Create</>}
        </button>
      </div>
    </div>
  );
}

CreateFolder.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateFolder;
