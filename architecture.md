# 🏗️ System Architecture – SmartCare Clinic Management System

This document outlines the high-level system architecture of the **SmartCare Clinic Management System**, focusing on role-based access, data flow, and Firebase integration.

---

## 🧩 Overview

SmartCare is a lightweight, modular web application for clinic operations with two primary roles:
- **Receptionist** – registers patients, adds details
- **Doctor** – views patients, prescribes treatments

It is built using **HTML, CSS, JS (Vanilla)** and uses **Firebase** for:
- Authentication (Firebase Auth)
- Realtime database (Cloud Firestore)

---

## 🖼️ System Architecture Diagram (Text-based)

```
[ User (Browser) ]
       |
       V
[ index.html / login.html / register.html ]
       |
       V
[ Firebase Authentication ]
       |
       |---> On success → Redirect based on role
       |         |--> Doctor → doctor.html → doctor.js
       |         |--> Receptionist → receptionist.html → receptionist.js
       |
       V
[ Firebase Firestore (Database) ]
       |
       |---> Collections:
       |       └── patients
       |             ├── name
       |             ├── age
       |             ├── gender
       |             ├── symptoms
       |             ├── timestamp
       |             └── prescription (set by doctor)
       |
       V
[ Frontend Views Update via JS DOM ]
```

---

## 🔐 Authentication Flow

1. Users register/login through Firebase Auth
2. Role is selected from dropdown (Doctor / Receptionist)
3. On login success:
   - Doctor → redirected to `doctor.html`
   - Receptionist → redirected to `receptionist.html`

---

## 🗃️ Firestore Database Structure

### 📁 `patients` Collection
Each document contains:
- `name`: string
- `age`: number
- `gender`: string
- `symptoms`: string
- `prescription`: string (optional, added by doctor)
- `timestamp`: auto-added during creation

---

## 🌐 Hosting

The project is deployed via **GitHub Pages** and can optionally be hosted using **Firebase Hosting**.

---

## 📌 Summary

| Layer         | Technology Used            |
|---------------|----------------------------|
| Frontend      | HTML, CSS, JavaScript      |
| Auth          | Firebase Authentication    |
| Database      | Firebase Firestore         |
| Hosting       | GitHub Pages               |
| Architecture  | Role-based SPA-like layout |

---

*Maintained by Ridhima Bhardwaj | 2025*

