import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "../../components/library/search_bar";
import FolderList from "../../utils/list_folders";
import LibraryHeader from "../../components/library/Library_header";
import CreateFolder from "../../components/folder/CreateFolder";
import PageWrapper from "../../utils/PageWrapper";
import "../../styles/pages/library_page.css";

const TAB_FLASHCARDS = "Flashcard sets";
const TAB_FOLDERS = "Folders";
const TABS = [TAB_FLASHCARDS, TAB_FOLDERS];

// ✨ Animation variants
const tabVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

function Library() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("libraryActiveTab") || TAB_FLASHCARDS;
  });

  const [showFolderModal, setShowFolderModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("libraryActiveTab", activeTab);
  }, [activeTab]);

  const handleAddClick = () => {
    if (activeTab === TAB_FLASHCARDS) {
      navigate("/library/createSet");
    } else if (activeTab === TAB_FOLDERS) {
      setShowFolderModal(true);
    }
  };

  return (
    <div className="library">
      <LibraryHeader onAddClick={handleAddClick} />

      {/* Tabs */}
      <div className="library-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`library-tab-button${
              activeTab === tab ? " library-tab-button--active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Animate only tab content */}
      <div className="library-tab-content">
        <div className="library-tab-content-inner">
          <AnimatePresence mode="wait">
            {activeTab === TAB_FLASHCARDS && (
              <motion.div
                key="flashcards"
                className="tab-motion"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <PageWrapper disableAnimation>
                  <div className="library-search">
                    <SearchBar />
                  </div>
                </PageWrapper>
              </motion.div>
            )}

            {activeTab === TAB_FOLDERS && (
              <motion.div
                key="folders"
                className="tab-motion"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <h3 className="library-tab-title">Folders</h3>
                <PageWrapper disableAnimation>
                  <FolderList />
                </PageWrapper>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Folder Create Modal */}
      <CreateFolder
        isOpen={showFolderModal}
        onClose={() => setShowFolderModal(false)}
      />
    </div>
  );
}

export default Library;
