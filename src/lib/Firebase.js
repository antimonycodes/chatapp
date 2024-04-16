// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-33c72.firebaseapp.com",
  projectId: "reactchat-33c72",
  storageBucket: "reactchat-33c72.appspot.com",
  messagingSenderId: "418422383972",
  appId: "1:418422383972:web:f09f05e96a94a5907dc671",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// login or register
export const auth = getAuth();
// create usser info
export const db = getFirestore();
//uploading image during login
export const storage = getStorage();
