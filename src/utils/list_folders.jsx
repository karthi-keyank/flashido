import React from "react";
import FolderGrid from "../components/folder/folder_grid";
import { useAppData } from "../context/app_data";

function FolderList() {
  const { folders, loading } = useAppData();

  if (loading) return <p>Loading folders...</p>;

  return (
    <div>
      {folders.length > 0 ? (
        folders.map((folder) => (
          <FolderGrid
            key={folder.id}
            folder={{
              id: folder.id,
              name: folder.title,
              description: folder.description || "No description",
            }}
          />
        ))
      ) : (
        <p>No folders found.</p>
      )}
    </div>
  );
}

export default FolderList;
