import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function deleteFolder(userId, folderId) {
  const id = String(folderId ?? "").trim();
  if (!id || !userId) {
    throw new Error("User ID and Folder ID are required");
  }

  const folderRef = doc(db, `users/${userId}/folders/${id}`);

  try {
    await deleteDoc(folderRef);
    console.log(`Folder "${id}" deleted for user "${userId}"`);
  } catch (error) {
    console.error("Error deleting folder:", error);
    throw error;
  }
}
