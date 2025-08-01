import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Deletes a flashcard set from Firestore.
 * @param {string} userId - Firebase Authentication UID.
 * @param {string} setId - Flashcard set document ID.
 */
export async function deleteSetFromDatabase(userId, setId) {
  if (!userId || !setId) {
    throw new Error("User ID and Set ID are required");
  }

  try {
    const setRef = doc(db, `users/${userId}/flashcardSets/${setId}`);
    await deleteDoc(setRef);
    console.log(`🗑️ Flashcard set "${setId}" deleted successfully`);
  } catch (error) {
    console.error("❌ Error deleting flashcard set:", error);
    throw error;
  }
}
