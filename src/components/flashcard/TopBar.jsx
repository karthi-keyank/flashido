import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // ✅ spinner lib
import "../../styles/components/TopBar.css";

function TopBar({ onSave }) {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (saving) return; // avoid double click
    setSaving(true);
    try {
      await onSave(); // call parent save function
    } finally {
      setSaving(false); // reset after finished
    }
  };

  return (
    <div className="topbar">
      <button className="topbar-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

      <button className="topbar-save-btn" onClick={handleSave}>
        {saving ? (
          <ClipLoader size={18} color="#fff" /> // ✅ spinner
        ) : (
          <FaCheck />
        )}
      </button>
    </div>
  );
}

TopBar.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default TopBar;
