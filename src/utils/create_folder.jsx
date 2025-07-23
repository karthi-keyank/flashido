import React, { useState } from "react";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from "../context/auth_context";
import { useNavigate } from 'react-router-dom';

function AddFolder() {
  const [folderName, setFolderName] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Get user object

  const handleAddFolder = async () => {
    if (!folderName.trim()) {
      alert('Folder name is required');
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
        Sets: [],
      });

      setFolderName('');
      navigate(-1);
      alert(`✅ Folder "${folderName}" created successfully`);
    } catch (error) {
      console.error('❌ Error adding folder:', error);
    }
  };

  return (
    <div className="add-folder">
      <button onClick={() => navigate(-1)}>Back</button>
      <input
        type="text"
        placeholder="Folder name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button onClick={handleAddFolder}>+</button>
    </div>
  );
}

export default AddFolder;
