import React from "react";
import { useAuth } from "../../context/auth_context";
import { FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import "../../styles/pages/login_page.css";

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
    <div className="login-page">
      <div className="login-page__topbar">
        <button onClick={handleLogin} className="login-page__login-button">
          <FiLogIn className="login-page__login-icon" />
          Login
        </button>
      </div>

      <div className="login-page__content">
        <h1 className="login-page__title">Welcome to Flashido</h1>
        <p className="login-page__subtitle">
          Your smart study companion for mastering any subject.
        </p>
        <p className="login-page__description">
          Create flashcards, organize your sets, and study efficiently anywhere, anytime. 
          Perfect for students, teachers, and lifelong learners.
        </p>

        <button onClick={handleLogin} className="login-page__get-started-button">
          <FcGoogle className="login-page__google-icon" />
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
