import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/library/search_bar";
import FolderList from "../../utils/list_folders";
import LibraryHeader from "../../components/library/Library_header";

const tabs = ["Flashcard sets", "Folders"];

function Library() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("libraryActiveTab") || "Flashcard sets";
  });

  useEffect(() => {
    localStorage.setItem("libraryActiveTab", activeTab);
  }, [activeTab]);

  const handleAddClick = () => {
    if (activeTab === "Flashcard sets") {
      navigate("/Library/createSet");
    } else if (activeTab === "Folders") {
      navigate("/Library/createfolder");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Flashcard sets":
        return (
          <div className="tab-content">
            <SearchBar />
          </div>
        );
      case "Folders":
        return (
          <div className="tab-content">
            <h3>Folders</h3>
            <FolderList />
          </div>
        );
      default:
        return <div className="tab-content">No content available.</div>;
    }
  };

  return (
    <div className="library-container">
      <LibraryHeader onAddClick={handleAddClick} />

      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
}

export default Library;
