import { db } from "../scripts/firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const patientList = document.getElementById("patientList");

  // ✅ Fetch all patients who are waiting
  async function loadPatients() {
    const q = query(
      collection(db, "patients"),
      where("status", "==", "waiting")
    );

    const snapshot = await getDocs(q);
    patientList.innerHTML = "";

    if (snapshot.empty) {
      patientList.innerHTML = "<p>No patients in queue.</p>";
      return;
    }

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const div = document.createElement("div");
      div.className = "patient-card";
      div.style.animation = "fadeIn 0.4s ease";

      div.innerHTML = `
        <h3>Token #${data.token}</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Age:</strong> ${data.age} | <strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Symptoms:</strong> ${data.symptoms}</p>
        <textarea id="prescription-${docSnap.id}" placeholder="Write prescription..."></textarea>
        <button onclick="submitPrescription('${docSnap.id}')">Submit</button>
      `;

      patientList.appendChild(div);
    });
  }

  // ✅ Submit prescription to Firestore
  window.submitPrescription = async (docId) => {
    const textarea = document.getElementById(`prescription-${docId}`);
    const prescription = textarea.value.trim();

    if (!prescription) {
      alert("Please enter a prescription.");
      return;
    }

    try {
      await updateDoc(doc(db, "patients", docId), {
        prescription,
        status: "prescribed"
      });
      alert("Prescription submitted!");
      loadPatients(); // Refresh list
    } catch (err) {
      console.error("Error updating:", err);
      alert("Failed to submit prescription.");
    }
  };

  // Initial load
  loadPatients();
});
