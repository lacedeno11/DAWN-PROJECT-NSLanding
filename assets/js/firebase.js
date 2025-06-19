import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, onValue, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAEdVHtw9kjfr7NomBer69rLfNLoGUXG4",
  authDomain: "landing-p-6b7c0.firebaseapp.com",
  projectId: "landing-p-6b7c0",
  storageBucket: "landing-p-6b7c0.firebasestorage.app",
  messagingSenderId: "820228974882",
  appId: "1:820228974882:web:7b11b85922ffb4c0451d7b",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };