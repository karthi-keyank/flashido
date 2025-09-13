import React, { useState } from "react";
import { useAuth } from "../../context/auth_context";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import ErrorPopup from "../../components/home/error_popup"
import "../../styles/pages/login_page.css";

function LoginPage() {
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  //TODO: const [remember, setRemember] = useState(false);
  const [error, setError] = useState(""); // ✅ state for error popup

  const handleEmailAuth = async () => {
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
    } catch (err) {
      console.error("❌ Email auth error:", err);
      setError(err.message);  // ✅ show popup
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("❌ Google login error:", err);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-card__title">{mode === "login" ? "Login" : "Register"}</h2>

        {/* Inputs */}
        <div className="input-group">
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <FiUser className="icon" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <FiLock className="icon" />
        </div>

        {/* Options row */}
        {mode === "login" && (
          <div className="options-row">
            {/* <a href="#">Forgot password?</a> */}
          </div>
        )}

        {/* Auth buttons */}
        <button className="login-button-main" onClick={handleEmailAuth}>
          <FiMail /> {mode === "login" ? "Login" : "Sign Up"}
        </button>
        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <FcGoogle className="google-login-icon" />
          Continue with Google
        </button>

        {/* Switch mode */}
        <p className="switch-mode">
          {mode === "login" ? (
            <>Don’t have an account?{" "}
              <button type="button" onClick={() => setMode("signup")}>
                Register
              </button>
            </>
          ) : (
            <>Already have an account?{" "}
              <button type="button" onClick={() => setMode("login")}>
                Login
              </button>
            </>
          )}
        </p>
      </div>

      {/* ✅ Error Popup */}
      <ErrorPopup message={error} onClose={() => setError("")} />
    </div>
  );
}

export default LoginPage;
