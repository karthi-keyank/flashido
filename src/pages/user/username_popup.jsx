import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/auth_context";
import { FiUser, FiEdit3, FiSave } from "react-icons/fi";
import "../../styles/pages/username_popup.css";

function UsernamePopup() {
  const { user, setUsername: setCtxUsername } = useAuth();
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Check if user already has username
  useEffect(() => {
    const checkUsername = async () => {
      if (!user?.uid) return;

      const existing = await getDocs(
        query(collection(db, "users"), where("__name__", "==", user.uid))
      );

      if (existing.empty) {
        // No username yet → force popup
        setShowPopup(true);
      }
    };

    checkUsername();
  }, [user]);

  const handleSave = async () => {
    if (!username.trim()) {
      alert("⚠️ Please enter a username.");
      return;
    }

    if (!user?.uid) {
      alert("❌ User not authenticated.");
      return;
    }

    setSaving(true);

    try {
      // Check duplicate usernames
      const existingUsernameSnap = await getDocs(
        query(collection(db, "usernames"), where("__name__", "==", username))
      );
      if (!existingUsernameSnap.empty) {
        alert("❌ Username already taken.");
        setSaving(false);
        return;
      }

      // Delete old username (if any)
      const oldUsernames = await getDocs(
        query(collection(db, "usernames"), where("uid", "==", user.uid))
      );
      const deletePromises = oldUsernames.docs.map((docSnap) =>
        deleteDoc(doc(db, "usernames", docSnap.id))
      );
      await Promise.all(deletePromises);

      // Save new username
      await setDoc(doc(db, "usernames", username), {
        uid: user.uid,
        email: user.email,
      });

      await setDoc(doc(db, "users", user.uid), {
        username,
        email: user.email,
      });

      // ✅ Update context immediately (so Header updates instantly)
      setCtxUsername(username);

      setShowPopup(false); // Close modal
    } catch (error) {
      console.error("Error saving username:", error.message);
      alert("❌ Failed to save username. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!showPopup) return null; // Don’t render if user already has username

  return (
    <div className="username-popup__overlay">
      <div className="username-popup">
        <div className="username-popup__title">
          <FiUser className="username-popup__icon" />
          <span>Set Your Username</span>
        </div>

        <div className="username-popup__input-wrapper">
          <FiEdit3 className="username-popup__input-icon" />
          <input
            type="text"
            className="username-popup__input"
            placeholder="Enter a unique username"
            value={username}
            onChange={(e) => {
              const value = e.target.value;

              // ✅ Allow only letters, numbers, underscore, hyphen
              const regex = /^[a-zA-Z0-9_-]*$/;

              if (regex.test(value)) {
                setUsername(value);
              }
            }}
            disabled={saving}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="username-popup__button"
        >
          <FiSave className="username-popup__button-icon" />{" "}
          {saving ? "Saving..." : "Save Username"}
        </button>
      </div>
    </div>
  );
}

export default UsernamePopup;
