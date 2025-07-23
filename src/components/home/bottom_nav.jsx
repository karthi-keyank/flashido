import { Link } from "react-router-dom";
import "../../styles/components/bottom_navbar.css"
function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-home">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-library">
        <Link to="/Library">Library</Link>
      </div>
    </nav>
  );
}

export default NavBar;
