// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAiz811AcvvkHpzYEVM7IR0t_miRbBn4Tw",
  authDomain: "blogit-4000.firebaseapp.com",
  projectId: "blogit-4000",
  storageBucket: "blogit-4000.appspot.com",
  messagingSenderId: "804683427326",
  appId: "1:804683427326:web:e31c6de1084291a76864af",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
