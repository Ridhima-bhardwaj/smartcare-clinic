import { auth, db } from "../scripts/firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const form = document.getElementById("registerForm");
  const message = document.getElementById("message");
  const error = document.getElementById("error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Registering...";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
        createdAt: new Date()
      });

      message.textContent = `Registered as ${role}. Redirecting...`;

      setTimeout(() => {
        if (role === "doctor") {
          window.location.href = "../dashboard/doctor.html";
        } else {
          window.location.href = "../dashboard/receptionist.html";
        }
      }, 1000);

    } catch (err) {
      error.textContent = err.message;
      message.textContent = "";
    } finally {
      btn.disabled = false;
      btn.textContent = "Register";
    }
  });
});