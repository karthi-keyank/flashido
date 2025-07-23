import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAppData } from "../../context/app_data";
import { useAuth } from "../../context/auth_context";
import FolderPageHeader from "../../components/folder/folder_page_header";
import FlashcardList from "../../utils/FlashcardList";

function FolderPage() {
  const { id: folderId } = useParams();
  const { sets, loading: globalLoading } = useAppData();
  const { user } = useAuth();

  const [folder, setFolder] = useState(null);
  const [folderLoading, setFolderLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid || !folderId) return;

    const fetchFolder = async () => {
      try {
        const folderRef = doc(db, `users/${user.uid}/folders/${folderId}`);
        const folderSnap = await getDoc(folderRef);

        if (!folderSnap.exists()) {
          setFolder(null);
        } else {
          setFolder({ id: folderSnap.id, ...folderSnap.data() });
        }
      } catch (error) {
        console.error("❌ Error fetching folder:", error);
        setFolder(null);
      } finally {
        setFolderLoading(false);
      }
    };

    fetchFolder();
  }, [folderId, user?.uid]);

  if (globalLoading || folderLoading) return <p>⏳ Loading folder...</p>;
  if (!folder) return <p>❌ Folder not found.</p>;

  const folderSetIds = folder.Sets || [];
  const filteredSets = sets.filter(set => folderSetIds.includes(set.id));

  return (
    <div>
      <FolderPageHeader
        id={folder.id}
        title={folder.title || folder.name}
        description={folder.description || "No description"}
      />
      <FlashcardList sets={filteredSets} />
    </div>
  );
}

export default FolderPage;
