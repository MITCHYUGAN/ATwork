import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // For database
import { getAuth } from "firebase/auth"; // For authentication (optional for later)

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDiibAGJqB5WKXXQkpAOMBYieKEUSLNupA",
    authDomain: "atwork-2fdd4.firebaseapp.com",
    projectId: "atwork-2fdd4",
    storageBucket: "atwork-2fdd4.firebasestorage.app",
    messagingSenderId: "1020714484883",
    appId: "1:1020714484883:web:d8fe82fe0329244334b966",
    measurementId: "G-N980WWP876"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth };