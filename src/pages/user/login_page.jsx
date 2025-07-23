import React from "react";
import { useAuth } from "../../context/auth_context";

function LoginPage() {
  const { loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("❌ Login error:", error);
      alert("Failed to log in. Please try again.");
    }
  };

  return (
    <div>
      <h2>Welcome Back</h2>
      <button onClick={handleLogin}>
        🔐 Sign in with Google
      </button>
    </div>
  );
}

export default LoginPage;
