import { auth, db } from "../scripts/firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const loginForm = document.getElementById("loginForm");
  const error = document.getElementById("error");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = loginForm.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Logging in...";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const selectedRole = document.getElementById("role").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Get user role from Firestore
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User data not found.");
      }

      const role = userDoc.data().role;

      if (role !== selectedRole) {
        throw new Error(`You are not registered as a ${selectedRole}`);
      }

      // ✅ Redirect based on correct role
      if (role === "doctor") {
        window.location.href = "../dashboard/doctor.html";
      } else if (role === "receptionist") {
        window.location.href = "../dashboard/receptionist.html";
      }

    } catch (err) {
      error.textContent = err.message;
    } finally {
      btn.disabled = false;
      btn.textContent = "Login";
    }
  });
});
