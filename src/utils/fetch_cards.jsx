import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchCards = async (uid, setId) => {
  if (!uid || !setId) {
    console.error("User ID and Set ID are required.");
    return [];
  }

  try {
    const setRef = doc(db, `users/${uid}/flashcardSets/${setId}`);
    const docSnap = await getDoc(setRef);

    if (!docSnap.exists()) {
      console.warn("❌ Set not found");
      return [];
    }

    const data = docSnap.data();
    const cardsMap = data.Cards || {};

    return Object.entries(cardsMap).map(([id, card]) => ({
      id,
      Q: card?.Q ?? "",
      A: card?.A ?? "",
    }));
  } catch (error) {
    console.error("🔥 Error fetching cards:", error);
    return [];
  }
};
