import React, { useState } from "react";
import PropTypes from "prop-types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/auth_context";
import { FaPlus, FaTimes } from "react-icons/fa";
import "../../styles/components/create_folder_model.css";

function CreateFolderModal({ isOpen, onClose }) {
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const { user } = useAuth();

  const handleAddFolder = async () => {
    if (!folderName.trim()) {
      alert("Folder name is required");
      return;
    }

    if (!user?.uid) {
      alert("User not found. Please log in again.");
      return;
    }

    try {
      const folderDocRef = doc(db, `users/${user.uid}/folders/${folderName}`);
      await setDoc(folderDocRef, {
        title: folderName,
        description: folderDescription,
        Sets: [],
      });

      setFolderName("");
      setFolderDescription("");
      onClose();
      alert(`✅ Folder "${folderName}" created successfully`);
    } catch (error) {
      console.error("❌ Error adding folder:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <h2 className="modal-title">Create New Folder</h2>

        <input
          className="folder-input"
          type="text"
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <input
          className="folder-input"
          type="text"
          placeholder="Description"
          value={folderDescription}
          onChange={(e) => setFolderDescription(e.target.value)}
        />

        <button className="create-button" onClick={handleAddFolder}>
          <FaPlus /> Create
        </button>
      </div>
    </div>
  );
}

CreateFolderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateFolderModal;
