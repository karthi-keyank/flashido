import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { FaSortAlphaDown } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import CardGrid from "../components/flashcard/card_grid";
import "../styles/components/flash_card_list.css";
import { useNavigate } from "react-router-dom";
function FlashcardList({ sets }) {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("flashSortBy") || "alpha";
  });

  useEffect(() => {
    localStorage.setItem("flashSortBy", sortBy);
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
    return (
    <div className="flashcard-list__empty">
      <p>
        <span>Take the first step towards better marks.</span> <br />
        <span>Create a flashcard set</span>
      </p>
      <button
        className="flashcard-list__create-btn"
        onClick={() => navigate("/library/createSet")}
      >
        Create a set
      </button>
    </div>
  );
  }

  return (
    <div className="flashcard-list">
      <h4 className="flashcard-list__title">Flashcard Sets</h4>
      <div className="flashcard-list__controls">
        <button
          onClick={toggleSort}
          className="flashcard-list__sort-btn"
          title={sortBy === "alpha" ? "Sort by time (newest)" : "Sort A–Z"}
          type="button"
        >
          {sortBy === "alpha" ? (
            <FaSortAlphaDown size={18} />
          ) : (
            <FiClock size={18} />
          )}
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
