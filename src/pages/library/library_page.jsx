import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/library/search_bar";
import FolderList from "../../utils/list_folders";
import LibraryHeader from "../../components/library/Library_header";
import "../../styles/pages/library_page.css"

const TABS = ["Flashcard sets", "Folders"];

function Library() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("libraryActiveTab") || TABS[0];
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
    </div>
  );
}

export default Library;
