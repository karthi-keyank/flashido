import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/auth_context";
import {
  AddSetIntoFolder,
  deleteSetFromFolder,
} from "../../utils/add_delete_sets_from_folder";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import "../../styles/components/toggle_btn.css";

function ToggleButton({ setId, folderId }) {
  const { user, authLoading } = useAuth();
  const userId = user?.uid;

  const [isToggled, setIsToggled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !userId || !folderId) return;

    const checkFolder = async () => {
      try {
        const folderDocRef = doc(db, `users/${userId}/folders/${folderId}`);
        const folderSnap = await getDoc(folderDocRef);

        if (folderSnap.exists()) {
          const folderData = folderSnap.data();
          setIsToggled(
            Array.isArray(folderData.Sets) &&
              folderData.Sets.includes(setId)
          );
        }
      } catch (error) {
        console.error("Error reading folder for toggle:", error);
      } finally {
        setLoading(false);
      }
    };

    checkFolder();
  }, [authLoading, userId, folderId, setId]);

  const handleToggle = async () => {
    if (!userId) {
      alert("User not available. Please log in again.");
      return;
    }

    const nextToggleState = !isToggled;
    setIsToggled(nextToggleState);

    try {
      if (nextToggleState) {
        await AddSetIntoFolder(userId, setId, folderId);
      } else {
        await deleteSetFromFolder(userId, setId, folderId);
      }
    } catch (error) {
      console.error("Toggle failed:", error);
      setIsToggled(!nextToggleState); // Revert on error
    }
  };

  if (authLoading || !userId)
    return <span className="toggle-btn__loading-text">Loading user...</span>;

  if (loading)
    return (
      <span className="toggle-btn__loading">
        <ClipLoader size={14} color="#a58fff" />
      </span>
    );

  return (
    <button onClick={handleToggle} className="toggle-btn">
      {isToggled ? (
        <FaMinus className="toggle-btn__icon toggle-btn__icon--remove" />
      ) : (
        <FaPlus className="toggle-btn__icon toggle-btn__icon--add" />
      )}
    </button>
  );
}

ToggleButton.propTypes = {
  setId: PropTypes.string.isRequired,
  folderId: PropTypes.string.isRequired,
};

export default ToggleButton;
