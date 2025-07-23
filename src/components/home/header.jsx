import { useAuth } from "../../context/auth_context";
import LogoutButton from "./log_out";
import "../../styles/components/header.css";

function Header() {
  const { username, authLoading } = useAuth();

  let userSectionContent;
  if (authLoading) {
    userSectionContent = (
      <span className="header__loading">Loading user...</span>
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
        <LogoutButton className="header__logout-btn" />
      </div>
    </header>
  );
}

export default Header;
