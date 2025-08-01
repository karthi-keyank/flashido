import { useAuth } from "../context/auth_context";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ children }) {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Checking authentication...</p>;
  if (!user) return <Navigate to="/login" />;

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
