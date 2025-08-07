# 🏥 SmartCare – Clinic Management System

SmartCare is a modern, role-based Clinic Management System built using **HTML, CSS, JavaScript**, and **Firebase**. It aims to streamline clinic workflows with distinct interfaces for doctors and receptionists, ensuring efficient patient registration, treatment, and billing.

[![Live](https://img.shields.io/badge/Live%20App-Click%20Here-brightgreen)](https://ridhima-bhardwaj.github.io/smartcare-clinic/)

---

## 🚀 Features

🔐 Firebase Auth with role-based access (Doctor, Receptionist)

### 👩‍⚕️ Doctor

- Secure login
- View patients assigned by receptionist
* View patient queue with optional date-based filter
- Prescribe treatment for each patient
- Update patient history and notes

### 🧾 Receptionist

- Secure login
- Register new patients with age, gender, and symptoms
- Auto-token generation (on submit)
* Daily auto-token generation (ensures no duplicates)
- View billing requests
- Real-time database sync

### 🌗 Theme Toggle

- Smooth **Light/Dark mode** toggle with labeled switch (`🌞 Light / 🌙 Dark`)
- Background, text, card, and header/footer adapt to theme

---

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend & Auth:** Firebase Authentication
- **Database:** Firebase Firestore
- **Hosting:** GitHub Pages / Firebase Hosting (suggested)

---

## 📁 Project Structure

```
├── index.html
├── login.html
├── register.html
├── doctor.html
├── receptionist.html
├── styles/
│   └── style.css
├── scripts/
    ├── firebase.js
    ├── register.js
    ├── auth.js
    ├── doctor.js
    └── receptionist.js

```

---

## 🧪 How to Run Locally

1. Clone the repo:

   ```bash
   git clone https://github.com/Ridhima-bhardwaj/smartcare-clinic.git
   cd smartcare-clinic
   ```

2. Replace `firebaseConfig` in `firebase.js` with your Firebase project config.

3. Open `index.html` using **Live Server** in VS Code or similar.

---

## ⚠️ Important Notes

- Always run in a local server environment (not via `file:///`)
- All actions are logged to Firestore
* All actions are logged to Firestore
* Patient tokens reset each day and increment automatically (no duplicates)
- The system is designed to be **modular**, **safe**, and **portable**

---

## 📝 Author

Made with ❤️ by **Ridhima Bhardwaj** ([@Ridhima-bhardwaj](https://github.com/Ridhima-bhardwaj)) ·

---

## 📄 License

This project is licensed under the MIT License.
