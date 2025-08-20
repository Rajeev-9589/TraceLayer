import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSs8iZEe8ipC541IyLUcDLkhWPBd31dNI",
  authDomain: "tracelayer.firebaseapp.com",
  projectId: "tracelayer",
  storageBucket: "tracelayer.firebasestorage.app",
  messagingSenderId: "186080900933",
  appId: "1:186080900933:web:5c2e14588a0c1b9b36302c",
  measurementId: "G-5PGP4NXLPR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
