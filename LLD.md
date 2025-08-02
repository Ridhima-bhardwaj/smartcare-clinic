# 📐 Low-Level Design (LLD) – SmartCare Clinic Management System

This document details the component-level design of the SmartCare project, describing modules, logic flows, user role behavior, and Firestore structure.

---

## 👥 User Roles

### 1. Doctor
- Logs in via Firebase Auth
- Redirected to `doctor.html`
- Fetches and displays patients from Firestore
- Can write prescriptions per patient
- Prescription is saved in the same Firestore document

### 2. Receptionist
- Logs in or registers via Firebase Auth
- Redirected to `receptionist.html`
- Can add patient details (name, age, gender, symptoms)
- Patients are stored in `patients` collection in Firestore

---

## 🔄 Page-Level Component Breakdown

### 🔹 `index.html`
- Entry point
- Contains links to login or register
- Includes theme toggle

### 🔹 `login.html`
- Firebase email/password login
- Redirects based on selected role (Doctor/Receptionist)

### 🔹 `register.html`
- Firebase account creation
- Selects user role during registration
- Stores credentials in Firebase Auth (not Firestore)

### 🔹 `doctor.html`
- Loads patient list from Firestore
- Adds prescription to each patient document
- Uses DOM manipulation and Firestore `updateDoc()`

### 🔹 `receptionist.html`
- Adds new patients to `patients` collection
- Displays confirmation messages
- Theme toggle persists via `localStorage`

---

## 📁 Firebase Firestore Structure

### 🔹 Collection: `patients`

Each patient document contains:

| Field        | Type     | Description                    |
|--------------|----------|--------------------------------|
| `name`       | string   | Full name of patient           |
| `age`        | number   | Age of patient                 |
| `gender`     | string   | Male/Female                    |
| `symptoms`   | string   | Initial symptoms               |
| `prescription` | string | Doctor-entered prescription    |
| `timestamp`  | timestamp | Auto-added on patient add     |

---

## 🔐 Authentication Logic

- Uses Firebase Auth for email/password login
- No manual role assignment in Firestore (relies on UI selection during login/register)
- Session state stored via Firebase
- FirebaseAuthListener not explicitly used; redirection handled immediately on login

---

## 🧱 Component-to-Component Flow

```
User → login/register → Firebase Auth success → Check role
    → If doctor → doctor.html → load Firestore patients → update prescription
    → If receptionist → receptionist.html → add patient → store in Firestore
```

---

## 🌗 Theme Toggle Logic

- Implemented across all pages
- Uses `localStorage` to store theme preference
- Uses `--css-vars` to apply dark/light theme
- Switch is styled with custom slider + label

---

## 📌 Summary

This system is built with clean modularity:
- Each role has its own page and logic
- All data flows through Firestore
- Auth and database are separate
- Reusable components (form card, toggle) across pages

---

*Maintained by Ridhima Bhardwaj | 2025*
