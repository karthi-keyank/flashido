import { Link, useLocation } from "react-router-dom";
import "../../styles/components/bottom_navbar.css";
import { FiHome, FiBook } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link
        to="/"
        className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
      >
        <FiHome className="nav-icon" />
        <span className="nav-label">Home</span>
      </Link>

      <Link
        to="/"
        className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
      >
        <FiPlus className="nav-icon" />
        <span className="nav-label">Create</span>
      </Link>

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
  );
}

export default NavBar;
