import { useAuth } from "../../context/auth_context";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function LogoutButton({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      try {
        await logout();
        navigate("/login");
        alert("✅ Logged out successfully.");
      } catch (error) {
        console.error("Error during logout:", error);
        alert("❌ Logout failed.");
      }
    }
  };

  return (
    <button onClick={handleLogout} className="header__logout-btn">
      {children ?? 'Logout'}
    </button>
  );
}
LogoutButton.propTypes = {
  children: PropTypes.node
};

export default LogoutButton;
