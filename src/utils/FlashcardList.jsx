import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { FaSortAlphaDown } from "react-icons/fa"; // ✅ Font Awesome
import { FiClock } from "react-icons/fi";         // ✅ Feather
import CardGrid from "../components/flashcard/card_grid";
import "../styles/components/flash_card_list.css";

function FlashcardList({ sets }) {
  // restore last preference (default = "alpha")
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("flashSortBy") || "alpha"; // "alpha" | "time"
  });

  useEffect(() => {
    localStorage.setItem("flashSortBy", sortBy);
  }, [sortBy]);

  const toggleSort = () => {
    setSortBy((prev) => (prev === "alpha" ? "time" : "alpha"));
  };

  // robust date → ms helper
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

  // memoized sorting
  const sortedSets = useMemo(() => {
    const list = Array.isArray(sets) ? [...sets] : [];
    if (sortBy === "alpha") {
      list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else {
      list.sort((a, b) => toDateMs(b.updatedAt) - toDateMs(a.updatedAt));
    }
    return list;
  }, [sets, sortBy]);

  if (!sets || sets.length === 0) {
    return <p className="flashcard-list__empty">No flashcard sets found.</p>;
  }

  return (
    <div className="flashcard-list">
      <h4 className="flashcard-list__title">Flashcard Sets</h4>
      {/* Controls */}
      <div className="flashcard-list__controls">
        <button
          onClick={toggleSort}
          className="flashcard-list__sort-btn"
          title={sortBy === "alpha" ? "Sort by time (newest)" : "Sort A–Z"}
          type="button"
        >
          {sortBy === "alpha" ? <FaSortAlphaDown size={18} /> : <FiClock size={18} />}
          <span className="flashcard-list__sort-label">
            {sortBy === "alpha" ? "A–Z" : "Newest"}
          </span>
        </button>
      </div>
      <div className="flashcard-list__grid">
        {sortedSets.map((set) => (
          <CardGrid
            key={set.id}
            card={{
              id: set.id,
              name: set.title,
              description: set.description,
              termCount: set.termCount || 0,
              author: set.author || "unknown",
            }}
          />
        ))}
      </div>
    </div>
  );
}

FlashcardList.propTypes = {
  sets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      updatedAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
        PropTypes.object,
      ]),
    })
  ),
};

export default FlashcardList;
