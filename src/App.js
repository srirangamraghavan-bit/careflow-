import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import IntakePage from './pages/IntakePage';
import AmbulancePage from './pages/AmbulancePage';
import TriagePage from './pages/TriagePage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 transition-colors duration-200">
          {/* Global Refactored Navbar with Theme Selector */}
          <Navbar />

          {/* Distinct Route Views */}
          <main className="flex-1">
            <Routes>
              {/* Default Route starts at Secure Login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* 1. Secure Login Route */}
              <Route path="/login" element={<LoginPage />} />

              {/* 2. Patient Intake Selection Route */}
              <Route path="/intake" element={<IntakePage />} />

              {/* 3. Ambulance Data Entry Route */}
              <Route path="/ambulance" element={<AmbulancePage />} />

              {/* 4. 8-Bay ER Triage Dashboard Route */}
              <Route path="/triage" element={<TriagePage />} />

              {/* Fallback 404 Route */}
              <Route path="*" element={<Navigate to="/triage" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
