import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./auth_context";

const AppDataContext = createContext(null);

const AppDataProvider = ({ children }) => {
  const { user, authLoading } = useAuth();
  const userId = user?.uid;

  const [sets, setSets] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !userId) return;

    const setsRef = collection(db, `users/${userId}/flashcardSets`);
    const foldersRef = collection(db, `users/${userId}/folders`);

    const unsubscribeSets = onSnapshot(setsRef, (snapshot) => {
      setSets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    const unsubscribeFolders = onSnapshot(foldersRef, (snapshot) => {
      setFolders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeSets();
      unsubscribeFolders();
    };
  }, [userId, authLoading]);

  const contextValue = useMemo(
    () => ({ sets, folders, loading }),
    [sets, folders, loading]
  );

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};

AppDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAppData = () => useContext(AppDataContext);

export { AppDataProvider, useAppData };