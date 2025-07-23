// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache
} from 'firebase/firestore';

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB04B8upn1zroCEGucbvXdZXsCcJpRXMDk",
  authDomain: "practice-a98e2.firebaseapp.com",
  projectId: "practice-a98e2",
  storageBucket: "practice-a98e2.firebasestorage.app",
  messagingSenderId: "713682975812",
  appId: "1:713682975812:web:42086f941f23bf76495011",
  measurementId: "G-HF5L5ZLMMC"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Enable Firestore with persistent cache
const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
});

export { db };
export const auth = getAuth(app);
