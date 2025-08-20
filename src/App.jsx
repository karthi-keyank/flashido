// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/auth_context";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/home/home_page";
import Header from "./components/home/header";
import Library from "./pages/library/library_page";
import NavBar from "./components/home/bottom_nav";
import FlashCardPage from "./pages/flashcard/flashcard_page";
import FolderPage from "./pages/folder/folder_page";
import ListSet from "./pages/flashcard/get_sets";
import CreateSetPage from "./pages/flashcard/create_set";
import LoginPage from "./pages/user/login_page";
import UsernamePopup from "./pages/user/username_popup";
import { ClipLoader } from "react-spinners";
import PageWrapper from "./utils/PageWrapper";

import "./App.css";

function App() {
  const location = useLocation();
  const { user, username, authLoading } = useAuth();

  // ⏳ While Firebase is still checking auth state → show centered spinner
  if (authLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader color="#007bff" size={50} />
      </div>
    );
  }

  // 🔒 If not logged in → only allow login route
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // ✅ Show Header + NavBar only on certain routes
  const showLayout =
    location.pathname === "/" || location.pathname === "/Library";

  return (
    <div>
      <main className="app-container">
        {showLayout && location.pathname !== "/Library"&& <Header />}

        {/* Page transitions */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/home"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/Library"
              element={
                <PageWrapper>
                  <Library />
                </PageWrapper>
              }
            />
            <Route
              path="/flashcard/:id"
              element={
                <PageWrapper>
                  <FlashCardPage />
                </PageWrapper>
              }
            />
            <Route
              path="/Library/folder/:id"
              element={
                <PageWrapper>
                  <FolderPage />
                </PageWrapper>
              }
            />
            <Route
              path="/Library/folder/:id/getsets"
              element={
                <PageWrapper>
                  <ListSet />
                </PageWrapper>
              }
            />
            <Route
              path="/Library/createSet"
              element={
                <PageWrapper>
                  <CreateSetPage />
                </PageWrapper>
              }
            />
            <Route
              path="/flashcard/edit-set/:setId?"
              element={
                <PageWrapper>
                  <CreateSetPage />
                </PageWrapper>
              }
            />
            {/* Default → redirect home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>

        {showLayout && <NavBar />}
      </main>

      {/* If logged in but username not set → popup */}
      {user && !username && <UsernamePopup />}
    </div>
  );
}

export default App;
