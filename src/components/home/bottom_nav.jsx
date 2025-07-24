import { Link } from "react-router-dom";
import "../../styles/components/bottom_navbar.css";
import { FaHome, FaBook } from "react-icons/fa";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-home">
        <Link to="/">
          <FaHome className="nav-icon" />
        </Link>
      </div>
      <div className="navbar-library">
        <Link to="/Library">
          <FaBook className="nav-icon" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
