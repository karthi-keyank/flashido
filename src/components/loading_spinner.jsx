// src/components/ui/LoadingSpinner.jsx
import React from "react";
import "../styles/components/loading_spinner.css";
function LoadingSpinner() {
  return (
    <div className="loading-spinner__overlay">
      <div className="loading-spinner__container">
        <div className="loading-spinner__circle" />
        <p className="loading-spinner__text">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
