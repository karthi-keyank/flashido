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
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const MAX_NAME = 16;
  const MAX_DESC = 30;

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

    if (folderName.length > MAX_NAME) {
      setErrorMessage(`⚠️ Folder name must be under ${MAX_NAME} chars`);
      return;
    }

    if (folderDescription.length > MAX_DESC) {
      setErrorMessage(`⚠️ Description must be under ${MAX_DESC} chars`);
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

        {/* Folder Name */}
        <input
          className="folder-input"
          type="text"
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= MAX_NAME) {
              setFolderName(value);
            }
          }}
          disabled={loading}
        />
        <div
          className={`char-count ${
            folderName.length >= MAX_NAME ? "over-limit" : ""
          }`}
        >
          {folderName.length}/{MAX_NAME}
          {folderName.length === MAX_NAME && <span> ⚠️ Max limit reached</span>}
        </div>

        {/* Folder Description */}
        <input
          className="folder-input"
          type="text"
          placeholder="Description"
          value={folderDescription}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= MAX_DESC) {
              setFolderDescription(value);
            }
          }}
          disabled={loading}
        />
        <div
          className={`char-count ${
            folderDescription.length >= MAX_DESC ? "over-limit" : ""
          }`}
        >
          {folderDescription.length}/{MAX_DESC}
          {folderDescription.length === MAX_DESC && (
            <span> ⚠️ Max limit reached</span>
          )}
        </div>

        <button
          className="create-button"
          onClick={handleAddFolder}
          disabled={loading}
        >
          {loading ? (
            "⏳ Creating..."
          ) : (
            <>
              <FaPlus /> Create
            </>
          )}
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
