import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Clock, 
  Flame, 
  CheckCheck, 
  Activity,
  ChevronRight,
  ShieldCheck,
  Receipt,
  Check,
  Lock,
  Download,
  X,
  FileText,
  AlertTriangle,
  Heart,
  Droplets,
  Thermometer,
  Zap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const initialPatients = [
  {
    id: 'AMB-8012',
    mrn: 'CF-90812',
    name: 'Marcus Sterling',
    age: 58,
    gender: 'Male',
    blood: 'O+',
    bay: 'BAY-01',
    arrival: '2m ago',
    condition: 'Acute STEMI / Cardiogenic Shock',
    severity: 'High',
    severityScore: 98,
    admissionStatus: 'Approved',
    vitals: { hr: 138, bp: '185/110', sugar: 210, temp: 99.4, spo2: 88 },
    equipment: ['Defibrillator (AED)', '12-Lead ECG Monitor', 'Oxygen Concentrator'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    contact: '+91 98765 43210 (Eleanor - Spouse)',
    admissions: [
      { date: 'Oct 2023', hospital: 'Apollo Heart Institute', reason: 'Emergency Angioplasty & Stent Placement', physician: 'Dr. K. Vance' },
      { date: 'Feb 2021', hospital: 'CareFlow Super Specialty', reason: 'Unstable Angina & Telemetry Monitoring', physician: 'Dr. L. Myers' }
    ],
    labs: [
      { test: 'Troponin I', value: '2.40 ng/mL', ref: '0.00 - 0.04 ng/mL', status: 'CRITICAL', isAlert: true },
      { test: 'Serum Potassium', value: '5.4 mEq/L', ref: '3.5 - 5.0 mEq/L', status: 'ELEVATED', isAlert: true },
      { test: 'Blood Glucose', value: '210 mg/dL', ref: '70 - 99 mg/dL', status: 'ELEVATED', isAlert: true },
      { test: 'WBC Count', value: '11.8 K/uL', ref: '4.5 - 11.0 K/uL', status: 'SLIGHT HIGH', isAlert: false }
    ],
    healthIssues: [
      { title: 'Coronary Artery Disease (CAD)', type: 'Chronic', desc: 'Prior DES stent in LAD (2023)' },
      { title: 'Hypertension (Stage 2)', type: 'Chronic', desc: 'Prescribed Lisinopril 20mg daily' },
      { title: 'Allergy: Penicillin & Cephalosporins', type: 'Allergy', desc: 'Anaphylaxis risk — flagged high priority' }
    ],
    insurance: {
      carrier: 'Star Health Premier Platinum',
      policyId: 'SH-89240192',
      groupNum: 'GRP-994',
      coveragePercent: 80,
      subscription: 'CareFlow TeleHealth Care Concierge (₹2,999/mo - Active)'
    },
    billing: [
      { item: 'Emergency ALS Paramedic Transit & Dispatch', code: 'A0427', cost: 15000 },
      { item: 'Level 5 ER Trauma Resuscitation Bay Care', code: '99285', cost: 42000 },
      { item: 'Emergency 12-Lead Continuous ECG Telemetry', code: '93005', cost: 8500 },
      { item: 'Emergency Cardiac Catheterization Activation', code: '93458', cost: 35000 },
      { item: 'IV Thrombolytics & Continuous Oxygen Supply', code: 'J3490', cost: 12500 }
    ]
  },
  {
    id: 'AMB-8015',
    mrn: 'CF-84419',
    name: 'Elena Rostova',
    age: 34,
    gender: 'Female',
    blood: 'A-',
    bay: 'BAY-02',
    arrival: '6m ago',
    condition: 'Severe Polytrauma & Hemorrhagic Shock',
    severity: 'High',
    severityScore: 94,
    admissionStatus: 'Approved',
    vitals: { hr: 128, bp: '85/55', sugar: 115, temp: 97.2, spo2: 91 },
    equipment: ['Cervical Collar', 'IV Infusion Pump', 'Suction Unit'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces',
    contact: '+91 98451 22340 (Mikhail - Father)',
    admissions: [
      { date: 'Dec 2022', hospital: 'CareFlow Trauma Care', reason: 'Orthopedic Fracture Fixation', physician: 'Dr. R. Menon' }
    ],
    labs: [
      { test: 'Hemoglobin (Hb)', value: '6.8 g/dL', ref: '12.0 - 15.5 g/dL', status: 'CRITICAL LOW', isAlert: true },
      { test: 'Lactate (Blood Gas)', value: '4.8 mmol/L', ref: '0.5 - 2.2 mmol/L', status: 'ACIDOSIS', isAlert: true }
    ],
    healthIssues: [
      { title: 'Mild Exercise-Induced Asthma', type: 'Respiratory', desc: 'Albuterol inhaler PRN' }
    ],
    insurance: {
      carrier: 'HDFC ERGO Health Suraksha',
      policyId: 'HE-5541092',
      groupNum: 'GRP-308',
      coveragePercent: 85,
      subscription: 'HDFC ERGO Emergency Shield (₹1,999/mo - Active)'
    },
    billing: [
      { item: 'ALS Trauma Emergency Ambulance Response', code: 'A0427', cost: 14000 },
      { item: 'Trauma Team Level 1 Rapid Activation', code: '99285-TG', cost: 48000 },
      { item: 'Whole Blood Transfusion (2 Units Emergency O-)', code: 'P9021', cost: 22000 },
      { item: 'Immediate Whole Body Trauma Pan-Scan CT', code: '74178', cost: 18500 },
      { item: 'Spinal Immobility Orthopedic Kit & IV Access', code: 'A4550', cost: 6800 }
    ]
  },
  {
    id: 'AMB-8019',
    mrn: 'CF-76231',
    name: 'Arthur Pendelton',
    age: 72,
    gender: 'Male',
    blood: 'B+',
    bay: 'BAY-03',
    arrival: '11m ago',
    condition: 'Acute ARDS & Severe COPD Exacerbation',
    severity: 'High',
    severityScore: 90,
    admissionStatus: 'Approved',
    vitals: { hr: 118, bp: '160/98', sugar: 180, temp: 102.1, spo2: 86 },
    equipment: ['Portable Ventilator', 'Nebulizer Kit', 'Oxygen Concentrator'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    contact: '+91 97112 33451 (Claire - Daughter)',
    admissions: [
      { date: 'Jan 2024', hospital: 'CareFlow Pulmonary Pavilion', reason: 'Bacterial Pneumonia Admission', physician: 'Dr. W. Foster' }
    ],
    labs: [
      { test: 'PaO2 (Arterial Gas)', value: '56 mmHg', ref: '75 - 100 mmHg', status: 'CRITICAL HYPOXIC', isAlert: true },
      { test: 'White Blood Cell (WBC)', value: '16.4 K/uL', ref: '4.5 - 11.0 K/uL', status: 'ELEVATED INFECTION', isAlert: true }
    ],
    healthIssues: [
      { title: 'COPD (Stage 4)', type: 'Pulmonary', desc: 'Home oxygen dependent 2L/min' },
      { title: 'Sulfa Drug Allergy', type: 'Allergy', desc: 'Skin rash & hives' }
    ],
    insurance: {
      carrier: 'Care Health Advantage Care',
      policyId: 'CH-908124',
      groupNum: 'GRP-MED1',
      coveragePercent: 80,
      subscription: 'Senior Chronic Monitoring (₹1,499/mo - Active)'
    },
    billing: [
      { item: 'ALS Emergency Paramedic Transit', code: 'A0427', cost: 12500 },
      { item: 'Emergency Endotracheal & Mechanical Ventilation', code: '94002', cost: 28000 },
      { item: 'Arterial Blood Gas Lab Analysis Panel', code: '82803', cost: 5500 },
      { item: 'Emergency IV Corticosteroids & Bronchodilators', code: 'J1040', cost: 7200 },
      { item: 'High-Flow Continuous Oxygen Support Bay', code: 'A4615', cost: 8500 }
    ]
  },
  {
    id: 'AMB-8022',
    mrn: 'CF-65209',
    name: 'Sophia Lin',
    age: 28,
    gender: 'Female',
    blood: 'O-',
    bay: 'BAY-04',
    arrival: '18m ago',
    condition: 'Acute Abdominal Pain (Suspected Appendicitis)',
    severity: 'Middle',
    severityScore: 68,
    admissionStatus: 'Approved',
    vitals: { hr: 92, bp: '124/82', sugar: 104, temp: 100.8, spo2: 98 },
    equipment: ['IV Infusion Pump', 'Monitoring Sensors'],
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces',
    contact: '+91 99123 44556 (Kevin - Brother)',
    admissions: [],
    labs: [
      { test: 'WBC Count', value: '14.2 K/uL', ref: '4.5 - 11.0 K/uL', status: 'ELEVATED', isAlert: true },
      { test: 'C-Reactive Protein (CRP)', value: '38 mg/L', ref: '< 3.0 mg/L', status: 'INFLAMED', isAlert: true }
    ],
    healthIssues: [
      { title: 'Mild Asthma', type: 'Respiratory', desc: 'Controlled, no recent attacks' }
    ],
    insurance: {
      carrier: 'Bajaj Allianz Health Guard',
      policyId: 'BA-771923',
      groupNum: 'GRP-441',
      coveragePercent: 80,
      subscription: 'Bajaj Health Rewards (₹999/mo - Active)'
    },
    billing: [
      { item: 'Basic Paramedic Rapid Response & Triage', code: 'A0426', cost: 8500 },
      { item: 'Emergency Abdominal Contrast CT Scan', code: '74160', cost: 16500 },
      { item: 'Surgical Consult & Pre-Op Clearance', code: '99254', cost: 9500 },
      { item: 'IV Hydration & Analgesia Administration', code: '96360', cost: 4800 }
    ]
  },
  {
    id: 'AMB-8025',
    mrn: 'CF-58190',
    name: 'David Kalu',
    age: 45,
    gender: 'Male',
    blood: 'AB+',
    bay: 'BAY-05',
    arrival: '24m ago',
    condition: 'Deep Forearm Laceration & Hemostasis',
    severity: 'Middle',
    severityScore: 62,
    admissionStatus: 'Not Approved',
    vitals: { hr: 88, bp: '130/85', sugar: 120, temp: 98.6, spo2: 99 },
    equipment: ['Hemostatic Bandage', 'IV Access'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces',
    contact: '+91 96543 21098 (Amara - Wife)',
    admissions: [],
    labs: [
      { test: 'Complete Blood Count (CBC)', value: 'Normal', ref: 'Reference Normal', status: 'NORMAL', isAlert: false }
    ],
    healthIssues: [
      { title: 'Mild Dyslipidemia', type: 'Metabolic', desc: 'Diet controlled' }
    ],
    insurance: {
      carrier: 'ICICI Lombard Complete Health',
      policyId: 'IL-440192',
      groupNum: 'GRP-712',
      coveragePercent: 85,
      subscription: 'Corporate Health Shield (₹1,250/mo - Active)'
    },
    billing: [
      { item: 'Ambulance First Responder Response', code: 'A0426', cost: 7500 },
      { item: 'Complex Laceration Repair & Exploration', code: '12034', cost: 14500 },
      { item: 'Tetanus Prophylaxis & Local Anesthesia', code: '90715', cost: 3200 },
      { item: 'Wound Dressing & Sterile Supplies', code: 'A6209', cost: 2400 }
    ]
  },
  {
    id: 'AMB-8028',
    mrn: 'CF-51928',
    name: 'Maria Gomez',
    age: 61,
    gender: 'Female',
    blood: 'B-',
    bay: 'BAY-06',
    arrival: '31m ago',
    condition: 'Atrial Fibrillation with Controlled Rate',
    severity: 'Middle',
    severityScore: 59,
    admissionStatus: 'Approved',
    vitals: { hr: 96, bp: '138/88', sugar: 145, temp: 98.4, spo2: 96 },
    equipment: ['12-Lead ECG Monitor', 'IV Infusion Pump'],
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&h=150&fit=crop&crop=faces',
    contact: '+91 98110 99887 (Rosa - Sister)',
    admissions: [],
    labs: [
      { test: 'Serum Digoxin Level', value: '1.2 ng/mL', ref: '0.8 - 2.0 ng/mL', status: 'THERAPEUTIC', isAlert: false }
    ],
    healthIssues: [
      { title: 'Paroxysmal Atrial Fibrillation', type: 'Cardiac', desc: 'Takes Metoprolol 50mg daily' }
    ],
    insurance: {
      carrier: 'Niva Bupa Health Companion',
      policyId: 'NB-661092',
      groupNum: 'GRP-551',
      coveragePercent: 80,
      subscription: 'Niva Family Shield (₹1,850/mo - Active)'
    },
    billing: [
      { item: 'Cardiac Telemetry Paramedic Response', code: 'A0426', cost: 8000 },
      { item: '12-Lead Rhythm Strip Telemetry Analysis', code: '93000', cost: 6500 },
      { item: 'Cardiology Specialist ER Consultation', code: '99244', cost: 11000 },
      { item: 'IV Rate-Control Infusion Management', code: '96365', cost: 5500 }
    ]
  },
  {
    id: 'AMB-8031',
    mrn: 'CF-44109',
    name: 'Lucas Vance',
    age: 19,
    gender: 'Male',
    blood: 'A+',
    bay: 'BAY-07',
    arrival: '38m ago',
    condition: 'Heat Exhaustion & Mild Dehydration',
    severity: 'Zero',
    severityScore: 22,
    admissionStatus: 'Not Approved',
    vitals: { hr: 78, bp: '118/76', sugar: 92, temp: 99.1, spo2: 99 },
    equipment: ['Oral Electrolyte Rehydration', 'Cold Compress Kit'],
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces',
    contact: '+91 97788 66554 (Linda - Mother)',
    admissions: [],
    labs: [
      { test: 'Basic Metabolic Panel', value: 'Normal', ref: 'Reference Normal', status: 'NORMAL', isAlert: false }
    ],
    healthIssues: [
      { title: 'No Chronic Illness', type: 'General', desc: 'Active student athlete' }
    ],
    insurance: {
      carrier: 'Tata AIG MediCare Premier',
      policyId: 'TA-331092',
      groupNum: 'GRP-102',
      coveragePercent: 85,
      subscription: 'Student Campus Care (₹750/mo - Active)'
    },
    billing: [
      { item: 'Basic Paramedic Evaluation In-Transit', code: 'A0426', cost: 4500 },
      { item: 'Oral Rehydration & Cooling Protocol', code: '99281', cost: 3500 },
      { item: 'Vital Signs Observation & Discharge Clearance', code: '99211', cost: 1800 }
    ]
  },
  {
    id: 'AMB-8035',
    mrn: 'CF-33019',
    name: 'Chloe Bennett',
    age: 24,
    gender: 'Female',
    blood: 'O+',
    bay: 'BAY-08',
    arrival: '45m ago',
    condition: 'Mild Allergic Urticaria (Resolved in Vehicle)',
    severity: 'Zero',
    severityScore: 18,
    admissionStatus: 'Not Approved',
    vitals: { hr: 72, bp: '112/74', sugar: 88, temp: 98.6, spo2: 100 },
    equipment: ['Antihistamine Protocol', 'Skin Monitoring'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    contact: '+91 98980 12345 (Self)',
    admissions: [],
    labs: [
      { test: 'Serum IgE Level', value: 'Slight High', ref: '< 100 kU/L', status: 'ALLERGIC', isAlert: false }
    ],
    healthIssues: [
      { title: 'Seasonal Pollen Rhinitis', type: 'Allergy', desc: 'OTC Antihistamines' }
    ],
    insurance: {
      carrier: 'Aditya Birla Activ Health',
      policyId: 'AB-882019',
      groupNum: 'GRP-909',
      coveragePercent: 80,
      subscription: 'Wellness Active Program (₹899/mo - Active)'
    },
    billing: [
      { item: 'Paramedic First Aid & Allergic Triage', code: 'A0426', cost: 4200 },
      { item: 'Oral Antihistamine Administration & Observation', code: '96372', cost: 2800 },
      { item: 'Outpatient ER Release Evaluation', code: '99282', cost: 2500 }
    ]
  }
];

// Helper to format currency in Indian Rupees with Indian numbering system
const formatINR = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const TriagePage = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { theme } = useTheme();

  // Colorblind and Dark mode urgency detail helper
  const getUrgencyDetails = (severity, index) => {
    if (theme === 'colorblind') {
      if (severity === 'High') {
        return {
          shape: '▲',
          label: `HIGH #${index + 1}`,
          badgeClass: 'bg-orange-100 text-orange-950 border-2 border-orange-600 shadow-xs font-black',
          borderClass: 'border-orange-500 border-l-[6px] hover:border-orange-600',
          waveformClass: 'text-orange-600'
        };
      } else if (severity === 'Middle') {
        return {
          shape: '●',
          label: `MID #${index + 1}`,
          badgeClass: 'bg-sky-100 text-sky-950 border-2 border-sky-600 shadow-xs font-black',
          borderClass: 'border-sky-500 border-l-[6px] hover:border-sky-600',
          waveformClass: 'text-sky-600'
        };
      } else {
        return {
          shape: '■',
          label: `ZERO #${index + 1}`,
          badgeClass: 'bg-indigo-100 text-indigo-950 border-2 border-indigo-600 shadow-xs font-black',
          borderClass: 'border-indigo-600 border-l-[6px] hover:border-indigo-700',
          waveformClass: 'text-indigo-600'
        };
      }
    }

    if (theme === 'dark') {
      if (severity === 'High') {
        return {
          shape: '▲',
          label: `HIGH #${index + 1}`,
          badgeClass: 'bg-red-950/80 text-red-300 border border-red-800/60 font-extrabold',
          borderClass: 'border-slate-700 hover:border-red-400',
          waveformClass: 'text-red-400'
        };
      } else if (severity === 'Middle') {
        return {
          shape: '●',
          label: `MID #${index + 1}`,
          badgeClass: 'bg-amber-950/80 text-amber-300 border border-amber-800/60 font-extrabold',
          borderClass: 'border-slate-700 hover:border-amber-400',
          waveformClass: 'text-amber-400'
        };
      } else {
        return {
          shape: '■',
          label: `ZERO #${index + 1}`,
          badgeClass: 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-extrabold',
          borderClass: 'border-slate-700 hover:border-emerald-400',
          waveformClass: 'text-emerald-400'
        };
      }
    }

    // Light Mode (default)
    if (severity === 'High') {
      return {
        shape: '▲',
        label: `HIGH #${index + 1}`,
        badgeClass: 'bg-red-100 text-red-700 border border-red-200 font-extrabold',
        borderClass: 'border-slate-200/80 hover:border-red-400',
        waveformClass: 'text-red-500'
      };
    } else if (severity === 'Middle') {
      return {
        shape: '●',
        label: `MID #${index + 1}`,
        badgeClass: 'bg-amber-100 text-amber-700 border border-amber-200 font-extrabold',
        borderClass: 'border-slate-200/80 hover:border-amber-400',
        waveformClass: 'text-amber-500'
      };
    } else {
      return {
        shape: '■',
        label: `ZERO #${index + 1}`,
        badgeClass: 'bg-emerald-100 text-emerald-700 border border-emerald-200 font-extrabold',
        borderClass: 'border-slate-200/80 hover:border-emerald-400',
        waveformClass: 'text-emerald-500'
      };
    }
  };

  // Real-time vital simulation ticker: gently fluctuate vitals every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => prev.map(p => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const newHr = Math.max(55, Math.min(180, p.vitals.hr + delta));
        return {
          ...p,
          vitals: { ...p.vitals, hr: newHr }
        };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-sort hierarchy: High (top) -> Middle -> Zero (bottom)
  const sortedPatients = [...patients].sort((a, b) => {
    const weights = { High: 300, Middle: 200, Zero: 100 };
    return (weights[b.severity] + b.severityScore) - (weights[a.severity] + a.severityScore);
  });

  const filteredPatients = sortedPatients.filter((p) => {
    const matchesFilter = activeFilter === 'all' || p.severity === activeFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.condition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate billing calculations for selected patient
  const calculateBilling = (patient) => {
    if (!patient || !patient.billing) return { subtotal: 0, coverageAmount: 0, copay: 0, total: 0 };
    const subtotal = patient.billing.reduce((acc, curr) => acc + curr.cost, 0);
    const coverageRate = (patient.insurance?.coveragePercent || 80) / 100;
    const coverageAmount = subtotal * coverageRate;
    const copay = 500; // in INR
    const total = (subtotal - coverageAmount) + copay;
    return { subtotal, coverageAmount, copay, total };
  };

  const billSummary = calculateBilling(selectedPatient);

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Main ER Triage Dashboard</h1>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>8-Screen Split Active</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Auto-ranked: <span className="font-semibold text-red-600">High (Top Panels)</span> &rarr; <span className="font-semibold text-amber-600">Middle</span> &rarr; <span className="font-semibold text-emerald-600">Zero (Bottom Panels)</span> &bull; All billing converted to <span className="font-bold text-slate-800">INR (₹)</span>
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter patient or ID..."
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition w-44"
            />
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400">
            {[
              { id: 'all', label: 'All 8 Bays' },
              { id: 'High', label: '▲ High' },
              { id: 'Middle', label: '● Middle' },
              { id: 'Zero', label: '■ Zero' }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  activeFilter === id
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <a
            href="/ambulance"
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Case</span>
          </a>
        </div>
      </div>

      {/* Metric Counters Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-sm">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">High Urgency</p>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-1">
              <span className="text-sm">▲</span>
              <span>{patients.filter(p => p.severity === 'High').length}</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Middle Urgency</p>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-1">
              <span className="text-sm">●</span>
              <span>{patients.filter(p => p.severity === 'Middle').length}</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
            <CheckCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Zero (Curable)</p>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-1">
              <span className="text-sm">■</span>
              <span>{patients.filter(p => p.severity === 'Zero').length}</span>
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Bays Monitored</p>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">{patients.length} / 8</span>
          </div>
        </div>
      </div>

      {/* 8-Screen Multi-Card Triage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredPatients.map((patient, index) => {
          const details = getUrgencyDetails(patient.severity, index);

          return (
            <div
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-5 border ${details.borderClass} shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group`}
            >
              <div>
                {/* 1. Top Header: Ambulance ID, Bay Number, Status Tag, Priority Badge */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">{patient.id}</span>
                    <span className="text-slate-300 dark:text-slate-600">&bull;</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{patient.bay.split(' ')[0]}</span>
                    {patient.admissionStatus === 'Approved' ? (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        APPROVED
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        HOLD
                      </span>
                    )}
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase px-2 py-0.5 rounded-md flex items-center space-x-1 ${details.badgeClass}`}>
                      <span className="text-[11px] leading-none">{details.shape}</span>
                      <span>{details.label}</span>
                    </span>
                  </div>
                </div>

                {/* 2. Patient Details: Photo/avatar, Name, Age, Gender, Blood Group, Condition */}
                <div className="flex items-start space-x-3.5 mb-3.5">
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-700 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition truncate">
                      {patient.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {patient.age} yrs &bull; {patient.gender} &bull; <span className="font-semibold text-slate-700 dark:text-slate-300">{patient.blood}</span>
                    </p>
                    <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 line-clamp-1 mt-1 leading-snug">
                      {patient.condition}
                    </p>
                  </div>
                </div>

                {/* 3. Live Telemetry Metrics: HEART, BP, GLUCOSE */}
                <div className="bg-slate-50/80 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 grid grid-cols-3 gap-1.5 text-center mb-2.5">
                  <div>
                    <span className="text-[9px] font-semibold text-slate-400 block uppercase">Heart</span>
                    <span className={`text-xs font-bold ${patient.vitals.hr > 120 ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {patient.vitals.hr} <span className="text-[9px] font-normal text-slate-400">bpm</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-slate-400 block uppercase">BP</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{patient.vitals.bp}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-slate-400 block uppercase">Glucose</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {patient.vitals.sugar} <span className="text-[9px] font-normal text-slate-400">mg</span>
                    </span>
                  </div>
                </div>

                {/* 4. Colored Live Waveform / Sparkline Indicator Graph */}
                <div className="h-6 w-full rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700 flex items-center px-2 mb-3">
                  <svg
                    className={`w-full h-4 ${details.waveformClass}`}
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M0,10 L25,10 L30,4 L35,16 L40,2 L45,18 L50,10 L75,10 L80,5 L85,15 L90,10 L100,10" />
                  </svg>
                </div>

                {/* 5. Active Medical Equipment Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {(patient.equipment || []).slice(0, 3).map((eq) => (
                    <span
                      key={eq}
                      className="inline-flex items-center text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md truncate max-w-[130px]"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              {/* 6. Footer Action Link: "View History & Bill" */}
              <div className="pt-3 mt-1 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {patient.arrival}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPatient(patient);
                  }}
                  className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:translate-x-0.5 transition"
                >
                  <span>View History & Bill</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= PATIENT HISTORY & BILLING MODAL (INR ₹ CURRENCY) ================= */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 max-w-4xl w-full my-auto overflow-hidden max-h-[92vh] flex flex-col">
            
            {/* Modal Top Bar */}
            <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedPatient.avatar}
                  alt={selectedPatient.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/20 shadow-md"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{selectedPatient.name}</h2>
                    <span className={`text-[10px] uppercase px-2.5 py-0.5 rounded-full flex items-center space-x-1 ${
                      theme === 'colorblind'
                        ? (selectedPatient.severity === 'High' ? 'bg-orange-100 text-orange-950 border-2 border-orange-600 font-black' :
                           selectedPatient.severity === 'Middle' ? 'bg-sky-100 text-sky-950 border-2 border-sky-600 font-black' :
                           'bg-indigo-100 text-indigo-950 border-2 border-indigo-600 font-black')
                        : (selectedPatient.severity === 'High' ? 'bg-red-500/20 text-red-300 border border-red-500/30 font-extrabold' :
                           selectedPatient.severity === 'Middle' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-extrabold' :
                           'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-extrabold')
                    }`}>
                      <span>{selectedPatient.severity === 'High' ? '▲' : selectedPatient.severity === 'Middle' ? '●' : '■'}</span>
                      <span>{selectedPatient.severity} Priority</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    MRN: <span className="font-mono text-white">{selectedPatient.mrn}</span> &bull; 
                    Case: <span className="font-mono text-white">{selectedPatient.id}</span> &bull; 
                    Assigned: <span className="font-semibold text-blue-300">{selectedPatient.bay}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPatient(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                title="Close Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
              
              {/* Vitals Summary Strip */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
                  <div className="flex items-center justify-center space-x-1 text-slate-400 text-[10px] font-bold uppercase">
                    <Heart className="w-3 h-3 text-red-500" />
                    <span>Heart Rate</span>
                  </div>
                  <p className="text-lg font-extrabold text-slate-900 mt-0.5">{selectedPatient.vitals.hr} <span className="text-xs font-normal text-slate-400">bpm</span></p>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
                  <div className="flex items-center justify-center space-x-1 text-slate-400 text-[10px] font-bold uppercase">
                    <Activity className="w-3 h-3 text-blue-500" />
                    <span>Blood Pressure</span>
                  </div>
                  <p className="text-lg font-extrabold text-slate-900 mt-0.5">{selectedPatient.vitals.bp}</p>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
                  <div className="flex items-center justify-center space-x-1 text-slate-400 text-[10px] font-bold uppercase">
                    <Droplets className="w-3 h-3 text-purple-500" />
                    <span>Glucose</span>
                  </div>
                  <p className="text-lg font-extrabold text-slate-900 mt-0.5">{selectedPatient.vitals.sugar} <span className="text-xs font-normal text-slate-400">mg/dL</span></p>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
                  <div className="flex items-center justify-center space-x-1 text-slate-400 text-[10px] font-bold uppercase">
                    <Thermometer className="w-3 h-3 text-amber-500" />
                    <span>Body Temp</span>
                  </div>
                  <p className="text-lg font-extrabold text-slate-900 mt-0.5">{selectedPatient.vitals.temp} <span className="text-xs font-normal text-slate-400">°F</span></p>
                </div>
              </div>

              {/* Clinical History & Insurance Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Past Admissions */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-slate-100">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Previous Hospital Admissions</h3>
                  </div>
                  <div className="space-y-2 text-xs">
                    {selectedPatient.admissions && selectedPatient.admissions.length > 0 ? (
                      selectedPatient.admissions.map((adm, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>{adm.hospital}</span>
                            <span className="text-slate-400 text-[10px]">{adm.date}</span>
                          </div>
                          <p className="text-slate-600 mt-0.5">{adm.reason}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Physician: {adm.physician}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 italic">No prior ER admissions on record.</p>
                    )}
                  </div>
                </div>

                {/* Health Insurance & Policy */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Active Health Insurance (INR)</h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Verified
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <p className="font-bold text-slate-900">{selectedPatient.insurance?.carrier}</p>
                      <p className="text-[11px]">Policy ID: <span className="font-mono font-semibold">{selectedPatient.insurance?.policyId}</span></p>
                      <p className="text-[11px]">Group Code: <span className="font-mono font-semibold">{selectedPatient.insurance?.groupNum}</span></p>
                      <p className="text-[11px] text-emerald-700 font-semibold">Coverage: {selectedPatient.insurance?.coveragePercent}% Cashless In-Network</p>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-blue-900">
                      <Zap className="w-3.5 h-3.5 inline mr-1 text-blue-600" />
                      {selectedPatient.insurance?.subscription}
                    </div>
                  </div>
                </div>

              </div>

              {/* ================= SCREEN 5: TREATMENT & BILLING MODULE (INR ₹) ================= */}
              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200/80 shadow-sm">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Treatment & Emergency Billing Module</h3>
                      <p className="text-xs text-slate-400">Itemized Indian Rupee (₹) estimation & insurance settlement</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    Invoice: #CF-2026-IN{selectedPatient.id.replace('AMB-', '')}
                  </span>
                </div>

                {/* Table Header */}
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
                  <span>Itemized Treatment & Services</span>
                  <span>Amount (INR ₹)</span>
                </div>

                {/* Line Items */}
                <div className="divide-y divide-slate-100 py-2 space-y-2">
                  {(selectedPatient.billing || []).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between pt-2 text-xs">
                      <div>
                        <span className="font-semibold text-slate-800">{item.item}</span>
                        <span className="text-[10px] font-mono text-slate-400 ml-2">CPT: {item.code}</span>
                      </div>
                      <span className="font-bold text-slate-900 font-mono">
                        {formatINR(item.cost)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculations Summary */}
                <div className="pt-4 mt-2 border-t border-slate-200/80 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal Estimated Clinical Charges:</span>
                    <span className="font-bold text-slate-800 font-mono">{formatINR(billSummary.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Insurance Cashless Coverage ({selectedPatient.insurance?.coveragePercent || 80}%):</span>
                    <span className="font-bold font-mono">-{formatINR(billSummary.coverageAmount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Hospital Registration & Bay Copay:</span>
                    <span className="font-bold text-slate-800 font-mono">{formatINR(billSummary.copay)}</span>
                  </div>

                  {/* Final Total (Prominent INR Display) */}
                  <div className="pt-3 mt-2 border-t-2 border-slate-200 flex items-baseline justify-between">
                    <div>
                      <span className="text-sm font-extrabold text-slate-900 block">Total Patient Responsibility</span>
                      <span className="text-[11px] text-slate-400">Final payable co-insurance balance (INR)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight font-mono">
                        {formatINR(billSummary.total)}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 block">Indian Rupees (₹)</span>
                    </div>
                  </div>
                </div>

                {/* Modal Bottom Actions */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Direct Electronic Cashless TPA Settlement Enabled</span>
                  </div>

                  <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => alert(`Treatment Plan Authorized for ${selectedPatient.name}. Cashless billing confirmed: ${formatINR(billSummary.total)}`)}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve & Authorize</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center justify-center cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      <span>Export Bill</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default TriagePage;
