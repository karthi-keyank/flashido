import { useState } from "react";
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
import { FiUser, FiEdit3, FiSave, FiArrowRightCircle } from "react-icons/fi";
import "../../styles/pages/username_page.css";

function UsernamePage() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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
      const existingUsernameSnap = await getDocs(
        query(collection(db, "usernames"), where("__name__", "==", username))
      );

      if (!existingUsernameSnap.empty) {
        alert("❌ Username already taken.");
        setSaving(false);
        return;
      }

      const oldUsernames = await getDocs(
        query(collection(db, "usernames"), where("uid", "==", user.uid))
      );

      const deletePromises = oldUsernames.docs.map((docSnap) =>
        deleteDoc(doc(db, "usernames", docSnap.id))
      );
      await Promise.all(deletePromises);

      await setDoc(doc(db, "usernames", username), {
        uid: user.uid,
        email: user.email,
      });

      await setDoc(doc(db, "users", user.uid), {
        username,
        email: user.email,
      });

      setSaved(true);
    } catch (error) {
      console.error("Error saving username:", error.message);
      alert("❌ Failed to save username. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleGoHome = () => {
    window.location.reload();
  };

  let buttonContent;
  if (saving) {
    buttonContent = (
      <>
        <FiSave className="username-page__button-icon" /> Saving...
      </>
    );
  } else if (saved) {
    buttonContent = (
      <>
        <FiArrowRightCircle className="username-page__button-icon" /> Go Home
      </>
    );
  } else {
    buttonContent = (
      <>
        <FiSave className="username-page__button-icon" /> Save Username
      </>
    );
  }

  return (
    <div className="username-page">
      <div className="username-page__title">
        <FiUser className="username-page__icon" />
        <span>Set Your Username</span>
      </div>

      {!saved && (
        <div className="username-page__input-wrapper">
          <FiEdit3 className="username-page__input-icon" />
          <input
            type="text"
            className="username-page__input"
            placeholder="Enter a unique username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={saving}
          />
        </div>
      )}

      <button
        onClick={saved ? handleGoHome : handleSave}
        disabled={saving}
        className="username-page__button"
      >
        {buttonContent}
      </button>
    </div>
  );
}

export default UsernamePage;
