import { db } from "../scripts/firebase.js";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const form = document.getElementById("patientForm");
  const confirmation = document.getElementById("confirmation");
  const billList = document.getElementById("billList");

  let tokenCounter = 1; // You can manage this better in Firestore for real systems

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Adding...";

    const name = form.name.value.trim();
    const age = form.age.value.trim();
    const gender = form.gender.value;
    const symptoms = form.symptoms.value.trim();

    try {
      // ✅ Add to Firestore
      await addDoc(collection(db, "patients"), {
        name,
        age,
        gender,
        symptoms,
        token: tokenCounter++,
        status: "waiting",              // ✅ ensures visibility on doctor side
        prescription: "",
        billGenerated: false,
        createdAt: new Date()
      });

      confirmation.textContent = "Patient added successfully.";
      form.reset();
      loadBillingRequests(); // reload updated list

    } catch (err) {
      confirmation.textContent = "Failed to add patient.";
    } finally {
      btn.disabled = false;
      btn.textContent = "Add Patient";
    }
  });

  // ✅ Load billing requests (prescribed but not billed yet)
  async function loadBillingRequests() {
    const q = query(
      collection(db, "patients"),
      where("status", "==", "prescribed"),
      where("billGenerated", "==", false)
    );

    const snapshot = await getDocs(q);
    billList.innerHTML = "";

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const li = document.createElement("li");
      li.className = "patient-card";
      li.style.animation = "fadeIn 0.3s ease";

      li.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Prescription:</strong> ${data.prescription}</p>
        <button onclick="generateBill('${docSnap.id}')">Generate Bill</button>
      `;

      billList.appendChild(li);
    });
  }

  // ✅ Billing generator
  window.generateBill = async (docId) => {
    const amount = prompt("Enter bill amount:");

    if (!amount || isNaN(amount)) {
      alert("Invalid amount.");
      return;
    }

    try {
      await updateDoc(doc(db, "patients", docId), {
        billGenerated: true,
        billAmount: amount
      });

      alert("Bill generated.");
      loadBillingRequests();
    } catch (err) {
      alert("Billing failed.");
    }
  };

  // Initial load
  loadBillingRequests();
});