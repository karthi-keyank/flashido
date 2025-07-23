import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function TopBar({ onSave }) {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>{`<`}</button>
      <button onClick={onSave}>✔</button> {/* Save on click */}
    </div>
  );
}

TopBar.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default TopBar;
