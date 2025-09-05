import React, { useState, useMemo, useEffect } from "react";
import FolderGrid from "../components/folder/folder_grid";
import CreateFolder from "../components/folder/CreateFolder"; // ✅ import your modal
import { useAppData } from "../context/app_data";
import { FaSortAlphaDown } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import "../styles/components/list_folders.css";

function FolderList() {
  const { folders, loading } = useAppData();
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("folderSortBy") || "alpha";
  });

  const [isCreateOpen, setIsCreateOpen] = useState(false); // ✅ new state

  useEffect(() => {
    localStorage.setItem("folderSortBy", sortBy);
  }, [sortBy]);

  const toggleSort = () => {
    setSortBy((prev) => (prev === "alpha" ? "time" : "alpha"));
  };

  const toDateMs = (val) => {
    if (!val) return 0;
    if (val instanceof Date) return val.getTime();
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const t = Date.parse(val);
      return Number.isNaN(t) ? 0 : t;
    }
    if (typeof val === "object") {
      if (typeof val.seconds === "number") return val.seconds * 1000;
      if (typeof val._seconds === "number") return val._seconds * 1000;
    }
    return 0;
  };

  const sortedFolders = useMemo(() => {
    const list = Array.isArray(folders) ? [...folders] : [];
    if (sortBy === "alpha") {
      list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else {
      list.sort((a, b) => toDateMs(b.createdAt) - toDateMs(a.createdAt));
    }
    return list;
  }, [folders, sortBy]);

  if (loading) return <p className="folder-list__loading">Loading folders...</p>;

  return (
    <div className="folder-list">
      {/* Controls */}
      <div className="folder-list__controls">
        <button
          onClick={toggleSort}
          className="folder-list__sort-btn"
          title={sortBy === "alpha" ? "Sort by time (newest)" : "Sort A–Z"}
          type="button"
        >
          {sortBy === "alpha" ? <FaSortAlphaDown size={18} /> : <FiClock size={18} />}
          <span className="folder-list__sort-label">
            {sortBy === "alpha" ? "A–Z" : "Newest"}
          </span>
        </button>
      </div>

      {/* Grid */}
      {sortedFolders.length > 0 ? (
        sortedFolders.map((folder) => (
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
        <div className="folder-list__empty">
          <p>Organise your flashcards sets by subject, topic, etc.</p>
          <button
            className="folder-list__create-btn"
            onClick={() => setIsCreateOpen(true)} // ✅ open modal
          >
            Create a Folder
          </button>
        </div>
      )}

      {/* Modal Component */}
      <CreateFolder
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)} // ✅ close modal
      />
    </div>
  );
}

export default FolderList;
