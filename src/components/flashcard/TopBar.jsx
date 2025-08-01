import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaArrowLeft, FaCheck } from "react-icons/fa"; // ✅ Import icons
import "../../styles/components/TopBar.css"
function TopBar({ onSave }) {
  const navigate = useNavigate();

  return (
    <div className="topbar">
      <button className="topbar-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <button className="topbar-save-btn" onClick={onSave}>
        <FaCheck />
      </button>
    </div>
  );
}

TopBar.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default TopBar;
