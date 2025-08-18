import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/library/search_bar";
import FolderList from "../../utils/list_folders";
import LibraryHeader from "../../components/library/Library_header";
import CreateFolder from "../../components/folder/CreateFolder"; // Make sure path is correct
import "../../styles/pages/library_page.css";

const TABS = ["Flashcard sets", "Folders"];

function Library() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("libraryActiveTab") || TABS[0];
  });

  const [showFolderModal, setShowFolderModal] = useState(false); // Modal state

  useEffect(() => {
    localStorage.setItem("libraryActiveTab", activeTab);
  }, [activeTab]);

  const handleAddClick = () => {
    if (activeTab === "Flashcard sets") {
      navigate("/Library/createSet");
    } else if (activeTab === "Folders") {
      setShowFolderModal(true); // Open modal instead of navigating
    }
  };

  const renderTabContent = () => {
    if (activeTab === "Flashcard sets") {
      return (
        <div className="library-tab-content">
          <SearchBar />
        </div>
      );
    }
    if (activeTab === "Folders") {
      return (
        <div className="library-tab-content">
          <h3 className="library-tab-title">Folders</h3>
          <FolderList />
        </div>
      );
    }
    return <div className="library-tab-content">No content available.</div>;
  };

  return (
    <div className="library">
      <LibraryHeader onAddClick={handleAddClick} />
      
      <div className="library-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`library-tab-button${activeTab === tab ? " library-tab-button--active" : ""}`}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {renderTabContent()}

      {/* Add the modal component here */}
      <CreateFolder
        isOpen={showFolderModal}
        onClose={() => setShowFolderModal(false)}
      />
    </div>
  );
}

export default Library;
