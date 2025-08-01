import { createContext, useContext, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            if (data.username) {
              setUsername(data.username);
            } else {
              console.warn("Username not set in user document.");
              setUsername(null);
            }
          } else {
            console.warn("User document does not exist.");
            setUsername(null);
          }
        } catch (err) {
          console.error("Error fetching user document:", err.code, err.message);
          setUsername(null);
        }
      } else {
        setUsername(null);
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  const contextValue = useMemo(() => ({
    user,
    username,
    authLoading,
    loginWithGoogle,
    logout,
  }), [user, username, authLoading]);

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
