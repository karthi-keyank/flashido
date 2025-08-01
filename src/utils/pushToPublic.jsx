import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function pushSetToPublic(userId, setId) {
  try {
    const userSetRef = doc(db, "users", userId, "flashcardSets", setId);
    const snapshot = await getDoc(userSetRef);

    if (!snapshot.exists()) {
      console.error("Set not found.");
      return false;
    }

    const setData = snapshot.data();

    const publicSetData = {
      ...setData,
      uid: userId, // ✅ Needed for rule
      uploadedAt: serverTimestamp(),
    };

    const publicRef = doc(db, "public_sets", setId); // ✅ matches rule
    await setDoc(publicRef, publicSetData);

    console.log("Successfully pushed to public.");
    return true;
  } catch (error) {
    console.error("Error pushing to public:", error);
    return false;
  }
}
