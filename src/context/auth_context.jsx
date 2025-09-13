// src/context/auth_context.jsx
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { auth, db } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

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
        setUser(null);
        setUsername(null);
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- AUTH METHODS ---
  const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    return await signInWithPopup(auth, provider);
  } catch (err) {
    if (err.code === "auth/account-exists-with-different-credential") {
      const pendingCred = GoogleAuthProvider.credentialFromError(err);
      const email = err.customData?.email;

      try {
        // Ask user for their password to sign in with Email provider
        const password = prompt(`🔐 Enter password for ${email} to link with Google`);
        const emailUser = await signInWithEmailAndPassword(auth, email, password);

        // Link Google credential with this existing email user
        if (emailUser && pendingCred) {
          await linkWithCredential(emailUser.user, pendingCred);
          console.log("✅ Google linked to existing email account");
        }
      } catch (linkErr) {
        console.error("❌ Failed to link Google account:", linkErr.message);
        throw linkErr;
      }
    } else {
      throw err;
    }
  }
};


  const signupWithEmail = async (email, password) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    // Send verification mail
    await sendEmailVerification(userCred.user);
    return userCred;
  };

  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logout = () => signOut(auth);

  const contextValue = useMemo(
    () => ({
      user,
      username,
      setUsername,
      authLoading,
      loginWithGoogle,
      signupWithEmail,
      loginWithEmail,
      resetPassword,
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
