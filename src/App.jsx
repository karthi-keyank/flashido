import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/auth_context";
import Home from "./pages/home/home_page";
import Header from "./components/home/header";
import Library from "./pages/library/library_page";
import NavBar from "./components/home/bottom_nav";
import FlashCardPage from "./pages/flashcard/flashcard_page";
import FolderPage from "./pages/folder/folder_page";
import AddFolder from "./utils/create_folder";
import ListSet from "./pages/flashcard/get_sets";
import CreateSetPage from "./pages/flashcard/create_set";
import LoginPage from "./pages/user/login_page";
import UsernamePage from "./pages/user/username_page";
import "./App.css";

function App() {
  const { user, username, authLoading } = useAuth();

  if (authLoading) return <p>Loading...</p>;

  if (!user) {
    // If not logged in: only show login page
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (user && !username) {
    // If logged in but username not set
    return (
      <Routes>
        <Route path="/username" element={<UsernamePage />} />
        <Route path="*" element={<Navigate to="/username" replace />} />
      </Routes>
    );
  }

  // If user and username both exist, show full app
  return (
    <div>
      <main className="app-container">
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Library" element={<Library />} />
          <Route path="/flashcard/:id" element={<FlashCardPage />} />
          <Route path="/Library/folder/:id" element={<FolderPage />} />
          <Route path="/Library/createfolder" element={<AddFolder />} />
          <Route path="/Library/folder/:id/getsets" element={<ListSet />} />
          <Route path="/Library/createSet" element={<CreateSetPage />} />
          <Route path="/flashcard/edit-set/:setId?" element={<CreateSetPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <NavBar />
      </main>
    </div>
  );
}

export default App;
