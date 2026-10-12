# CareFlow — Advanced Emergency Medical Dashboard

An emergency medical triage and telemetry dashboard built with a clean, modern, light-themed aesthetic.

---

## 🎨 Design System & Visual Style

* **Theme:** Solid white (`#FFFFFF`) and very light gray (`#F8FAFC`, `#F1F5F9`) backgrounds.
* **Accent Color:** Bright primary medical blue (`#2563EB` / `#1D4ED8`) for active states, interactive controls, and highlight badges.
* **Border Radii:** Soft, rounded corners (`rounded-xl` / `rounded-2xl`) across input fields, action buttons, cards, and modals.
* **Typography:** Clean, dark sans-serif (`Inter`) with system fallback, optimized contrast, and JetBrains Mono for clinical IDs & vitals.
* **Feel:** Premium, minimalist medical dashboard designed for high-stress emergency room environments.

---

## 🖥️ Interconnected Screens

### 1. Secure Login & Patient Intake Selection
* **Login Interface:** 
  * "Login to Your Account" with rounded input fields for Hospital Staff ID/Email, Security Password, and Assigned Shift Role.
  * Wide primary blue button with instant demo credentials for Doctors, Paramedics, and Triage Nurses.
* **Entry Type Selection:**
  * **"Normal Patient Entry":** Standard admissions modal capturing walk-in details (Name, Age, Gender, Emergency Contact, Chief Complaint).
  * **"Ambulance Entry":** Prominent ambulance icon with live telemetry indicators leading directly to ambulance vitals data entry.

### 2. Ambulance Data Entry Form
* **Vitals Inputs:** Rounded input fields with light borders capturing:
  * Patient / Case ID (e.g., `AMB-9048`)
  * Heart Rate (BPM)
  * Body Temperature (°F)
  * Blood Sugar Level (mg/dL)
  * Blood Pressure (mmHg)
  * Medical Equipment multi-select chips currently active in transit (Defibrillator AED, Portable Ventilator, 12-Lead ECG Monitor, IV Infusion Pump, Oxygen Concentrator, Suction Unit).
* **Dynamic Criticality Bar:**
  * Continuous visual severity meter dynamically computed from live vitals or selectable via interactive state pills:
    * **"High":** Critical condition (severe arrhythmias, trauma, acute shock) with animated red glow.
    * **"Middle":** Condition is normal and okay/stable (monitored observation).
    * **"Zero":** Condition can be cured inside the ambulance (heat dizziness, minor cuts, field hydration).
  * Direct "Transmit Payload" action which auto-ranks the patient into the ER Triage Split Grid.

### 3. Main ER Triage Dashboard (The 8-Screen Split)
* **Big Screen Layout:** Responsive 8-screen grid simulating the central ER telemetry bank with white rounded profile cards, subtle drop shadows, and live animated ECG waveforms.
* **Auto-Sorting Hierarchy:** Automatically graded and sorted by emergency level:
  * **High Urgency:** Positioned at the top panels (#1, #2, #3).
  * **Middle Urgency:** Positioned in the middle panels (#4, #5, #6).
  * **Zero Urgency:** Positioned at the bottom panels (#7, #8).
* **Top-Right Kebab Menu (Three Vertical Dots):**
  * Clean placement on the top-right of each patient card.
  * Replaces cluttered bottom icons to prevent accidental clicks in high-stress medical environments.
  * **Dropdown Actions:**
    * **Status Toggle:** Mark as *"Approved / Admitted"* (with clean green badge) or *"Not Approved / Hold"*.
    * **Edit Case & Vitals:** Opens modal to update vitals and re-grade triage severity.
    * **Delete Case:** Safe 2-step discharge confirmation dialog.
* **Streamlined Card Bottom:** Clean timestamp and single primary action: `View History & Bill →`.
* Interactive search filter, category filter pills (All, High, Middle, Zero), and simulated live telemetry refresh.

### 4. Detailed Patient History (Click-Through View)
When clicking on any patient card in the 8-bay triage grid, an in-depth clinical chart opens:
* **Profile Layout:** High-resolution patient avatar at the top with full demographics, blood group, emergency contact, attending trauma physician, and real-time telemetry badge.
* **Medical History:**
  1. **Previous Hospital Data & Past Admissions:** Historical admissions, dates, hospitals, diagnoses, and discharging physicians.
  2. **Recent Blood Checkups & Lab Results:** Formatted clinical lab table with Troponin I, Blood Glucose, Hemoglobin, WBC, Potassium, PaO2 with reference intervals and alert badges.
  3. **Known Health Issues:** Chronic medical conditions, surgical history, and allergy warnings (Latex, Penicillin, etc.).
  4. **Monthly Subscriptions & Active Insurance Policies:** Primary carrier, policy number, group ID, coverage percentage, and active wellness subscriptions.

### 5. Treatment & Billing Module
* Positioned directly at the bottom of the patient detail screen, styled as a clean checkout screen.
* Itemized emergency services table with procedure CPT codes, unit prices, and descriptions.
* Real-time calculation of subtotal, insurance coverage deduction (e.g. 80% coverage), facility copay, and **Estimated Net Amount Required**.
* Actions to **Approve Treatment Plan** and **Export / Print Superbill**.

---

## 🚀 Quick Launch Instructions

### Option 1: Standalone Browser Launch
Simply double-click `index.html` in your browser. All screens, sorting algorithms, dynamic criticality calculations, and billing modules run client-side.

### Option 2: Windows Batch Launcher
Double-click `run.bat` on Windows to start the local Python server and launch the app in your default browser.

### Option 3: Python Server
```bash
python server.py 8080
```
Open [http://localhost:8080](http://localhost:8080) in your web browser.
