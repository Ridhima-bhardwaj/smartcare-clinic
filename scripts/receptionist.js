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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Adding...";

    const name = form.name.value.trim();
    const age = form.age.value.trim();
    const gender = form.gender.value;
    const symptoms = form.symptoms.value.trim();
    const today = new Date().toISOString().split("T")[0];

    try {
      // ✅ Query patients only for today's date to find max token
      const q = query(collection(db, "patients"), where("date", "==", today));
      const snapshot = await getDocs(q);

      let maxToken = 0;
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.token > maxToken) {
          maxToken = data.token;
        }
      });

      const newToken = maxToken + 1;

      // ✅ Add patient with today's date and unique token
      await addDoc(collection(db, "patients"), {
        name,
        age,
        gender,
        symptoms,
        token: newToken,
        status: "waiting",
        prescription: "",
        billGenerated: false,
        date: today,
        createdAt: new Date()
      });

      confirmation.textContent = `✅ Patient added successfully. Assigned Token #${newToken}`;
      form.reset();
      loadBillingRequests();
    } catch (err) {
      console.error(err);
      confirmation.textContent = "❌ Failed to add patient.";
    } finally {
      btn.disabled = false;
      btn.textContent = "Add Patient";
    }
  });

  // ✅ Load billing requests (prescribed but not billed)
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

  // ✅ Bill generation
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
