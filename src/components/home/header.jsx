import { useAuth } from "../../context/auth_context";
import LogoutButton from "./log_out";
import "../../styles/components/header.css";
import { FaSignOutAlt } from "react-icons/fa"; // Icon for logout

function Header() {
  const { username, authLoading } = useAuth();

  let userSectionContent;
  if (authLoading) {
    userSectionContent = (
      <span className="header__loading shimmer">Loading...</span>
    );
  } else if (username) {
    userSectionContent = (
      <span className="header__username">
        <i className="header__icon" aria-label="User">👤</i> {username}
      </span>
    );
  } else {
    userSectionContent = (
      <span className="header__no-username">No username</span>
    );
  }

  return (
    <header className="header">
      <div className="header__user-section">
        {userSectionContent}
        <LogoutButton>
          <FaSignOutAlt />
        </LogoutButton>
      </div>
    </header>
  );
}

export default Header;
