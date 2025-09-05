// src/pages/home/home_folder_list.jsx
import React, { useMemo, useState } from "react";
import { useAppData } from "../../context/app_data";
import { FiFolder } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CreateFolder from "../../components/folder/CreateFolder";
import "../../styles/components/folder_list_horizontal.css";

function HomeFolderList() {
  const { folders, loading, error } = useAppData();
  const navigate = useNavigate();

  // ✅ state to control CreateFolder modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const normalized = useMemo(() => {
    const arr = Array.isArray(folders) ? folders : [];
    const toMillis = (ts) => {
      if (!ts) return 0;
      if (typeof ts.toMillis === "function") return ts.toMillis();
      if (ts instanceof Date) return ts.getTime();
      if (typeof ts === "number") return ts;
      return 0;
    };
    const copy = [...arr];
    copy.sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
    return copy.map((folder) => ({
      id: folder.id,
      name: folder.title ?? "Untitled",
      description: folder.description?.trim() || "No description",
      setsCount: Array.isArray(folder.Sets) ? folder.Sets.length : 0,
    }));
  }, [folders]);

  if (loading) {
    return (
      <div aria-busy="true" className="folder-row folder-row--loading">
        <output aria-live="polite" className="folder-row__status">
          Loading folders…
        </output>
        <div className="folder-card skeleton" />
        <div className="folder-card skeleton" />
        <div className="folder-card skeleton" />
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="folder-row__error">
        Failed to load folders. Please try again.
      </div>
    );
  }

  if (!normalized.length) {
    return (
      <div className="folder-list__empty">
        <p>Organise your flashcards sets by subject, topic, etc.</p>
        <button
          className="folder-list__create-btn"
          onClick={() => setIsCreateOpen(true)} // ✅ open modal
        >
          Create a Folder
        </button>

        {/* ✅ Render CreateFolder modal */}
        <CreateFolder isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      </div>
    );
  }

  return (
    <div className="home-folder-section">
      <h3 className="folder-row__heading">Recent folders</h3>
      <ul className="folder-row" aria-label="Recent folders">
        {normalized.map((folder) => (
          <li
            key={folder.id}
            className="folder-card"
            title={folder.name}
            onClick={() => navigate(`/library/folder/${folder.id}`)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") navigate(`/library/folder/${folder.id}`);
            }}
          >
            <div className="folder-card__icon">
              <FiFolder />
            </div>
            <div className="folder-card__meta">
              <div className="folder-card__title">{folder.name}</div>
              <div className="folder-card__desc">{folder.description}</div>
              <div className="folder-card__stats">{folder.setsCount} sets</div>
            </div>
          </li>
        ))}
      </ul>

      {/* Optional: floating create button even if folders exist */}
      {/* <button className="fab-create" onClick={() => setIsCreateOpen(true)}>＋</button>
      <CreateFolder isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} /> */}
    </div>
  );
}

export default HomeFolderList;
