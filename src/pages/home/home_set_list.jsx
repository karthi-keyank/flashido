// src/pages/home/home_set_list.jsx
import React, { useMemo } from "react";
import { useAppData } from "../../context/app_data";
import { FiLayers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../../styles/components/set_list_horizontal.css";

function HomeSetList() {
  const { sets, loading } = useAppData();
  const navigate = useNavigate();

  // Normalize sets (recent first)
  const normalized = useMemo(() => {
    const arr = Array.isArray(sets) ? sets : [];
    const toMillis = (ts) => {
      if (!ts) return 0;
      if (typeof ts.toMillis === "function") return ts.toMillis();
      if (ts instanceof Date) return ts.getTime();
      if (typeof ts === "number") return ts;
      return 0;
    };
    const copy = [...arr];
    copy.sort((a, b) => toMillis(b.updatedAt) - toMillis(a.updatedAt));
    return copy.map((set) => ({
      id: set.id,
      title: set.title ?? "Untitled Set",
      description: set.description?.trim() || "No description",
      cardCount: Array.isArray(set.cards) ? set.cards.length : 0,
    }));
  }, [sets]);

  if (loading) {
    return (
      <div aria-busy="true" className="set-row set-row--loading">
        <output aria-live="polite" className="set-row__status">
          Loading sets…
        </output>
        <div className="set-card skeleton" />
        <div className="set-card skeleton" />
        <div className="set-card skeleton" />
      </div>
    );
  }

  if (!normalized.length) {
    return <p className="set-row__empty">No sets found.</p>;
  }

  return (
    <div className="home-set-section">
      <h3 className="set-row__heading">Recent Sets</h3>
      <ul className="set-row" aria-label="Recent sets">
        {normalized.map((set) => (
          <li
            key={set.id}
            className="set-card"
            title={set.title}
            onClick={() => navigate(`/flashcard/${set.id}`)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") navigate(`/flashcard/${set.id}`);
            }}
          >
            <div className="set-card__icon">
              <FiLayers />
            </div>
            <div className="set-card__meta">
              <div className="set-card__title">{set.title}</div>
              <div className="set-card__stats">{set.cardCount} cards</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeSetList;
