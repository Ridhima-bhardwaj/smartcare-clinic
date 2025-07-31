// ✅ CDN-based Firebase import (correct for browser ES modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDct9g_ThQddXbN-QKzfDj6PMehGXovlh4",
  authDomain: "clinicmanagementsystem-3b800.firebaseapp.com",
  projectId: "clinicmanagementsystem-3b800",
  storageBucket: "clinicmanagementsystem-3b800.appspot.com",
  messagingSenderId: "182366276175",
  appId: "1:182366276175:web:44c6f758e3ad26fa6f783a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
