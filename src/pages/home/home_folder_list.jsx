// src/pages/home/home_set_list.jsx
import React, { useMemo } from "react";
import { useAppData } from "../../context/app_data";
import { FiFolder } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../../styles/components/set_list_horizontal.css";

function HomesetList() {
  const { sets, loading, error } = useAppData();

  const navigate = useNavigate();

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
    copy.sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
    return copy.map((set) => ({
      id: set.id,
      name: set.title ?? "Untitled",
      description: set.description?.trim() || "No description",
      setsCount: Array.isArray(set.Sets) ? set.Sets.length : 0,
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

  if (error) {
    return (
      <div role="alert" className="set-row__error">
        Failed to load sets. Please try again.
      </div>
    );
  }

  if (!normalized.length) {
    return <p className="set-row__empty">No sets found.</p>;
  }

  return (
    <div className="home-set-section">
      <h3 className="set-row__heading">Recent sets</h3>
      <ul className="set-row" aria-label="Recent sets">
        {normalized.map((set) => (
          <li
            key={set.id}
            className="set-card"
            onClick={() => navigate(`/library/set/${set.id}`)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") navigate(`/library/set/${set.id}`);
            }}
          >
            <div className="set-card__icon">
              <FiFolder />
            </div>

            <div className="set-card__content">
              <div className="set-card__title">{set.name}</div>
              <div className="set-card__desc">{set.description}</div>
              <div className="set-card__stats">
                {set.setsCount} sets
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomesetList;
