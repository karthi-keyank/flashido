// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache
} from 'firebase/firestore';

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxjCcD8YTMjuVsbUksFQfbsF0PhHY5dxQ",
  authDomain: "flashido-ef5a3.firebaseapp.com",
  projectId: "flashido-ef5a3",
  storageBucket: "flashido-ef5a3.firebasestorage.app",
  messagingSenderId: "170531034245",
  appId: "1:170531034245:web:5a32f2f673d11984bf45ec",
  measurementId: "G-ZT6FXWDB1N"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Enable Firestore with persistent cache
const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
});

export { db };
export const auth = getAuth(app);
