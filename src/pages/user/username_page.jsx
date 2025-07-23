import { useState } from "react";
import { doc, setDoc, deleteDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/auth_context";

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
      // 🔍 Check if username already exists
      const existingUsernameSnap = await getDocs(
        query(collection(db, "usernames"), where("__name__", "==", username))
      );

      if (!existingUsernameSnap.empty) {
        alert("❌ Username already taken.");
        setSaving(false);
        return;
      }

      // 🧹 Remove old username(s) associated with this user UID
      const oldUsernames = await getDocs(
        query(collection(db, "usernames"), where("uid", "==", user.uid))
      );

      const deletePromises = oldUsernames.docs.map((docSnap) =>
        deleteDoc(doc(db, "usernames", docSnap.id))
      );
      await Promise.all(deletePromises);

      // ✅ Set new username in 'usernames' collection
      await setDoc(doc(db, "usernames", username), {
        uid: user.uid,
        email: user.email,
      });

      // 🗃️ Update users/{uid} with new username
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

  let buttonText;
  if (saving) {
    buttonText = "Saving...";
  } else if (saved) {
    buttonText = "Go Home";
  } else {
    buttonText = "Save Username";
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Set Your Username</h2>
      {!saved && (
        <input
          type="text"
          placeholder="Enter a unique username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={saving}
          style={inputStyle}
        />
      )}
      <button
        onClick={saved ? handleGoHome : handleSave}
        disabled={saving}
        style={buttonStyle}
      >
        {buttonText}
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default UsernamePage;
