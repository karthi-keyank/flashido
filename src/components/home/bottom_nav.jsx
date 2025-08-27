// NavBar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/bottom_navbar.css";
import { FiHome, FiBook, FiPlus } from "react-icons/fi";
import BottomSheet from "./bottom_sheet"; // same folder as this file
import CreateFolder from "../folder/CreateFolder";

function NavBar() {
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);

  // Lifted state for folder modal so it lives outside BottomSheet
  const [showFolderModal, setShowFolderModal] = useState(false);

  return (
    <>
      <nav className="navbar">
        {/* Home */}
        <Link
          to="/"
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
        >
          <FiHome className="nav-icon" />
          <span className="nav-label">Home</span>
        </Link>

        {/* Create - opens bottom sheet */}
        <button
          type="button"
          className={`nav-item ${sheetOpen ? "active" : ""}`}
          onClick={() => setSheetOpen(true)}
        >
          <FiPlus className="nav-icon" />
          <span className="nav-label">Create</span>
        </button>

        {/* Library */}
        <Link
          to="/Library"
          className={`nav-item ${
            location.pathname.startsWith("/Library") ? "active" : ""
          }`}
        >
          <FiBook className="nav-icon" />
          <span className="nav-label">Library</span>
        </Link>
      </nav>

      {/* BottomSheet: pass onOpenFolder so BottomSheet can request opening modal */}
      <BottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onOpenFolder={() => setShowFolderModal(true)}
      />

      {/* CreateFolder modal lives here (parent). Independent of BottomSheet */}
      {showFolderModal && (
        <CreateFolder
          isOpen={showFolderModal}
          onClose={() => setShowFolderModal(false)}
        />
      )}
    </>
  );
}

export default NavBar;
