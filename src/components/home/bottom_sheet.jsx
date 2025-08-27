// bottom_sheet.jsx
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/components/bottom_sheet.css";
import { FiLayers, FiFolder } from "react-icons/fi";

function BottomSheet({ isOpen, onClose, onOpenFolder }) {
  // Animation state
  const [visible, setVisible] = useState(false);
  const closeTimeout = useRef();

  // Open instantly when isOpen true, close with animation
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
    } else if (visible) {
      // Wait for animation before hiding
      closeTimeout.current = setTimeout(() => {
        setVisible(false);
        closeTimeout.current = null;
      }, 200); // 200ms for snappier close
    }
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
    };
  }, [isOpen, visible]);

  if (!isOpen && !visible) {
    return null;
  }

  // Close handler: triggers parent close, animation handled by visible state
  const handleClose = (callback) => {
    onClose();
    if (typeof callback === "function") {
      setTimeout(callback, 100); // match close animation
    }
  };

  // When user clicks Folder: close sheet then parent opens CreateFolder modal
  const handleFolderClick = () => {
    handleClose(onOpenFolder);
  };

  return (
    <div className="bottom-sheet-wrapper">
      {/* Overlay closes sheet */}
      <button
        type="button"
        className="bottom-sheet-overlay"
        onClick={() => handleClose()}
        aria-label="Close overlay"
        tabIndex={-1}
      />

      {/* Sheet content */}
      <div
        className={`bottom-sheet${isOpen ? " opening" : " closing"}`}
        aria-label="Create Options"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="sheet-header">
          <div className="sheet-handle"></div>
        </div>

        <div className="sheet-content">
          {/* Flashcard option: close sheet and let <Link> do the navigation */}
          <Link
            to="/library/createSet"
            className="sheet-item flashcard"
            onClick={() => handleClose()}
          >
            <FiLayers className="sheet-icon" />
            <span>Flashcard Set</span>
          </Link>

          {/* Folder option: close sheet then parent opens CreateFolder modal */}
          <button
            type="button"
            className="sheet-item folder"
            onClick={handleFolderClick}
          >
            <FiFolder className="sheet-icon" />
            <span>Folder</span>
          </button>
        </div>
      </div>
    </div>
  );
}


export default BottomSheet;