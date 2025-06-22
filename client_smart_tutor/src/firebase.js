// frontend/src/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // <-- for Realtime DB

const firebaseConfig = {
  apiKey: "AIzaSyAaC5kKmyXyNtJg_jdS2PQ0-wJoLyqp7bA",
  authDomain: "webteam5.firebaseapp.com",
  databaseURL: "https://webteam5-default-rtdb.firebaseio.com",
  projectId: "webteam5",
  storageBucket: "webteam5.firebasestorage.app",
  messagingSenderId: "562562277351",
  appId: "1:562562277351:web:a807b3afb20c99913b6742",
  measurementId: "G-DRKWML56DM"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app); 

export { app, db };
