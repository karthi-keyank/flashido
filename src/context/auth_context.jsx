// src/context/auth_context.jsx
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { auth, db } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // 👈 added loading flag

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUsername(data.username || null);
          } else {
            console.warn("⚠️ User document does not exist in Firestore.");
            setUsername(null);
          }
        } catch (err) {
          console.error("❌ Error fetching user document:", err.code, err.message);
          setUsername(null);
        }
      } else {
        // No user signed in
        setUser(null);
        setUsername(null);
      }

      // ✅ finish auth init
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  const contextValue = useMemo(
    () => ({
      user,
      username,
      setUsername,
      authLoading, // 👈 expose loading to app
      loginWithGoogle,
      logout,
    }),
    [user, username, authLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
