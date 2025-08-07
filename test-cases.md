# 🧪 Functional Test Cases – SmartCare Clinic Management System

This document outlines the test cases for verifying core functionalities of the SmartCare system.

---

## ✅ Login & Registration

| TC ID | Scenario                  | Input                               | Expected Output                 | Result |
| ----- | ------------------------- | ----------------------------------- | ------------------------------- | ------ |
| TC001 | Register as doctor        | email, password, role: doctor       | Redirect to `doctor.html`       | Pass   |
| TC002 | Register as receptionist  | email, password, role: receptionist | Redirect to `receptionist.html` | Pass   |
| TC003 | Login as doctor           | correct credentials                 | Redirect to `doctor.html`       | Pass   |
| TC004 | Login as receptionist     | correct credentials                 | Redirect to `receptionist.html` | Pass   |
| TC005 | Login with wrong password | invalid password                    | Show error message              | Pass   |

---

## 👩‍⚕️ Doctor Dashboard

| TC ID | Scenario           | Input        | Expected Output                        | Result |
| ----- | ------------------ | ------------ | -------------------------------------- | ------ |
| TC006 | View patient list  | page load    | Patient cards render                   | Pass   |
| TC007 | Add prescription   | text + click | Firestore updates, success alert shown | Pass   |
| TC008 | Empty prescription | empty field  | Show validation error                  | Pass   |

---

## 🧾 Receptionist Dashboard

| TC ID | Scenario                         | Input                       | Expected Output                                | Result |
| ----- | -------------------------------- | --------------------------- | ---------------------------------------------- | ------ |
| TC009 | Add patient                      | name, age, gender, symptoms | Patient added to Firestore, confirmation shown | Pass   |
| TC010 | Empty name field                 | name = ""                   | Show validation error                          | Pass   |
| TC011 | Verify patient visible to doctor | add then switch user        | Patient appears in doctor dashboard            | Pass   |

---

## 🌗 Theme Toggle

| TC ID | Scenario        | Input          | Expected Output                  | Result |
| ----- | --------------- | -------------- | -------------------------------- | ------ |
| TC012 | Switch to dark  | click toggle   | Dark theme applied               | Pass   |
| TC013 | Switch to light | uncheck toggle | Light theme applied              | Pass   |
| TC014 | Refresh page    | reload tab     | Theme persists from localStorage | Pass   |

---

## 🔒 Security & Persistence

| TC ID | Scenario                | Input                       | Expected Output       | Result |
| ----- | ----------------------- | --------------------------- | --------------------- | ------ |
| TC015 | Open dashboard directly | `doctor.html` without login | Redirected or blocked | Pass   |
| TC016 | Firebase write security | try writing unauthenticated | Access denied         | Pass   |

---

## ✅ Token Generation

| Test Case                | Input                               | Expected Output                    |
| ------------------------ | ----------------------------------- | ---------------------------------- |
| First patient on new day | Name: X                             | Token #1                           |
| Multiple patients        | Name1, Name2                        | Token #1, #2                       |
| Page refresh             | Add patient → refresh → add patient | Token should continue incrementing |
| Manual date change in DB | Set earlier date manually           | Not included in today's queue      |

---

## ✅ Doctor Date Filter

| Test Case           | Action                | Expected Result                        |
| ------------------- | --------------------- | -------------------------------------- |
| No filter           | Load doctor page      | All waiting patients shown             |
| Set date to today   | Filter date == today  | Only today's patients shown            |
| Set invalid date    | Filter to future date | "No patients found" message            |
| Submit prescription | Add prescription      | Patient status changes to "prescribed" |

---

**Maintained by Ridhima Bhardwaj | 2025**
