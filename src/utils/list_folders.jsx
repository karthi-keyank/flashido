import React, { useState, useMemo, useEffect } from "react";
import FolderGrid from "../components/folder/folder_grid";
import { useAppData } from "../context/app_data";
import { FaSortAlphaDown } from "react-icons/fa"; // ✅ Font Awesome
import { FiClock } from "react-icons/fi";         // ✅ Feather (exists)
import "../styles/components/list_folders.css";

function FolderList() {
  const { folders, loading } = useAppData();

  // restore last preference (default = "alpha")
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("folderSortBy") || "alpha"; // "alpha" | "time"
  });

  useEffect(() => {
    localStorage.setItem("folderSortBy", sortBy);
  }, [sortBy]);

  const toggleSort = () => {
    setSortBy((prev) => (prev === "alpha" ? "time" : "alpha"));
  };

  // robust date → ms helper (handles Firestore Timestamp, string, number, Date)
  const toDateMs = (val) => {
    if (!val) return 0;
    if (val instanceof Date) return val.getTime();
    if (typeof val === "number") return val; // already ms
    if (typeof val === "string") {
      const t = Date.parse(val);
      return Number.isNaN(t) ? 0 : t;
    }
    // Firestore: { seconds, nanoseconds } or {_seconds, _nanoseconds}
    if (typeof val === "object") {
      if (typeof val.seconds === "number") return val.seconds * 1000;
      if (typeof val._seconds === "number") return val._seconds * 1000;
    }
    return 0;
  };

  // memoized sorting
  const sortedFolders = useMemo(() => {
    const list = Array.isArray(folders) ? [...folders] : [];
    if (sortBy === "alpha") {
      list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else {
      list.sort((a, b) => toDateMs(b.createdAt) - toDateMs(a.createdAt)); // newest first
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
        <p className="folder-list__empty">No folders found.</p>
      )}
    </div>
  );
}

export default FolderList;
