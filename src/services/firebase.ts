import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your updated Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTkT1dJXI3qyTu3byR6nvhRx7TkR5yEIg", // Replace with your new API key
  authDomain: "todotaskjob.firebaseapp.com", // Replace with your new authDomain
  projectId: "todotaskjob", // Replace with your new project ID
  storageBucket: "todotaskjob.firebasestorage.app", // Replace with your new storage bucket
  messagingSenderId: "235294444129", // Replace with your new messagingSenderId
  appId: "1:235294444129:web:f283e53517370d30d87820", // Replace with your new appId
  measurementId: "G-W9SH6HXRL8" // Replace with your new measurementId (for Analytics)
};

// Initialize Firebase with the new config
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication, GoogleAuthProvider, Firestore, and Analytics
export const auth = getAuth(app); // Firebase Authentication
export const googleProvider = new GoogleAuthProvider(); // Google Auth provider for sign-in
export const db = getFirestore(app); // Firestore for database access
export const analytics = getAnalytics(app); // Firebase Analytics (optional)
