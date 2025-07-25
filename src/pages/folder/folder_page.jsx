import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAppData } from "../../context/app_data";
import { useAuth } from "../../context/auth_context";
import FolderPageHeader from "../../components/folder/folder_page_header";
import FlashcardList from "../../utils/FlashcardList";
import LoadingSpinner from "../../components/loading_spinner";
import "../../styles/pages/folder_page.css";

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

   if (globalLoading || folderLoading) return <LoadingSpinner />;
   if (!folder) return <p className="folder-page__error">❌ Folder not found.</p>;

  const folderSetIds = folder.Sets || [];
  const filteredSets = sets.filter(set => folderSetIds.includes(set.id));

  return (
    <div className="folder-page">
      <FolderPageHeader
        id={folder.id}
        title={folder.title || folder.name}
        description={folder.description || "No description"}
      />
      <div className="flashcard__list">
        <FlashcardList sets={filteredSets} />
      </div>
    </div>
  );
}

export default FolderPage;
