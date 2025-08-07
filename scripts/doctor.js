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
  const dateInput = document.getElementById("filterDate");

  // ✅ Load patients (optionally filtered by date)
  async function loadPatients(filterDate = "") {
    let q = query(collection(db, "patients"), where("status", "==", "waiting"));
    if (filterDate) {
      q = query(
        collection(db, "patients"),
        where("status", "==", "waiting"),
        where("date", "==", filterDate)
      );
    }

    const snapshot = await getDocs(q);
    patientList.innerHTML = "";

    if (snapshot.empty) {
      patientList.innerHTML = "<p>No patients found.</p>";
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

  // ✅ Handle prescription submission
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
      loadPatients(dateInput.value); // reload filtered if applicable
    } catch (err) {
      console.error("Error updating:", err);
      alert("Failed to submit prescription.");
    }
  };

  // ✅ On filter date change
  dateInput.addEventListener("change", (e) => {
    const selectedDate = e.target.value;
    loadPatients(selectedDate); // filtered
  });

  // Initial load (all patients)
  loadPatients();
});
