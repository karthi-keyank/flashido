import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * Add setId to folder's Sets array.
 * Creates the folder document if it does not exist.
 */
export async function AddSetIntoFolder(userId, setId, folderId) {
  if (!userId || !setId || !folderId) {
    console.error("❌ Missing userId, setId, or folderId");
    return;
  }

  try {
    const folderDocRef = doc(db, `users/${userId}/folders/${folderId}`);
    const folderSnap = await getDoc(folderDocRef);

    if (!folderSnap.exists()) {
      await setDoc(folderDocRef, {
        Sets: [setId],
        title: folderId, // Optional: You can set other defaults here.
      });
      console.log(`✅ Folder "${folderId}" created with set "${setId}"`);
    } else {
      await updateDoc(folderDocRef, {
        Sets: arrayUnion(setId),
      });
      console.log(`✅ Set "${setId}" added to folder "${folderId}"`);
    }
  } catch (error) {
    console.error("❌ Error adding set to folder:", error);
    throw error;
  }
}

/**
 * Remove setId from folder's Sets array.
 */
export async function deleteSetFromFolder(userId, setId, folderId) {
  if (!userId || !setId || !folderId) {
    console.error("❌ Missing userId, setId, or folderId");
    return;
  }

  try {
    const folderDocRef = doc(db, `users/${userId}/folders/${folderId}`);
    await updateDoc(folderDocRef, {
      Sets: arrayRemove(setId),
    });
    console.log(`🗑️ Set "${setId}" removed from folder "${folderId}"`);
  } catch (error) {
    console.error("❌ Error removing set from folder:", error);
    throw error;
  }
}
