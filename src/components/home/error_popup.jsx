// src/components/ErrorPopup.jsx
import React from "react";
import { FiXCircle } from "react-icons/fi";
import "../../styles/components/error_popup.css";

function ErrorPopup({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="error-popup__overlay">
      <div className="error-popup">
        <FiXCircle className="error-popup__icon" />
        <p className="error-popup__message">{message}</p>
        <button className="error-popup__close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;
