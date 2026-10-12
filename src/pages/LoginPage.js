import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Activity 
} from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('dr.sarah.chen@careflow.er');
  const [password, setPassword] = useState('Emergency2026@');
  const [role, setRole] = useState('ER Trauma Lead');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validPasswords = ['Emergency2026@', 'emergency2026', 'CareFlow2026@'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validPasswords.includes(password.trim())) {
      setErrorMessage('Invalid security password. Authorized key: Emergency2026@');
      return;
    }
    setErrorMessage('');
    // Multi-layer flow: Proceed to Patient Intake Selection screen
    navigate('/intake');
  };

  const handleQuickDemo = (demoRole, demoEmail) => {
    setEmail(demoEmail);
    setRole(demoRole);
    setPassword('Emergency2026@');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans">
      
      {/* ================= LEFT SIDE: PROFESSIONAL HEALTHCARE BRANDING ================= */}
      <div className="w-full lg:w-1/2 bg-[#1A56DB] text-white flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 relative overflow-hidden select-none">
        {/* Subtle decorative background circle accents */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-700/30 blur-3xl pointer-events-none" />

        {/* Centered Brand Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          {/* Medical Shield Icon */}
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-900/20">
            <ShieldCheck className="w-10 h-10 stroke-[2.2]" />
          </div>

          {/* CareFlow Name & Logo */}
          <div className="flex items-center space-x-2.5 mb-3">
            <Activity className="w-8 h-8 text-blue-200 stroke-[2.5]" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Care<span className="text-blue-200">Flow</span>
            </h1>
          </div>

          <p className="text-blue-100 text-sm font-medium leading-relaxed max-w-xs">
            Advanced Emergency Medical Ecosystem & Clinical Triage Portal
          </p>

          <div className="mt-8 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-blue-100 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Authorized Clinical Gateway v2.4</span>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE: ZOMATO-INSPIRED MINIMALIST FORM ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-white">
        <div className="w-full max-w-md mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome to CareFlow
            </h2>
            <p className="text-sm text-slate-500 mt-1.5">
              Secure access to your healthcare workspace
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
            {/* 1. Hospital Staff ID or Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Hospital Staff ID or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition"
                  placeholder="staff.id@careflow.er"
                />
              </div>
            </div>

            {/* 2. Security Password with Toggle & Forgot Password Link */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Security Password
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Authorized Clinical Key: Emergency2026@');
                  }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className={`w-full pl-10 pr-11 py-3.5 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition ${
                    errorMessage ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200 focus:border-blue-600'
                  }`}
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Validation Error Message */}
              {errorMessage && (
                <p className="text-xs text-rose-600 font-semibold mt-2 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  <span>{errorMessage}</span>
                </p>
              )}
            </div>

            {/* 3. Assigned Shift Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Assigned Shift Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition"
              >
                <option value="ER Trauma Lead">Dr. Sarah Chen, MD — ER Trauma Lead</option>
                <option value="Senior Paramedic">Marcus Vance, NREMT-P — Ambulance Unit 8</option>
                <option value="Triage Charge Nurse">Nurse Elena Rostova, RN — Triage Coordinator</option>
              </select>
            </div>

            {/* 4. Prominent Modern Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-4 rounded-xl bg-[#FF5722] hover:bg-[#F4511E] active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-[#FF5722]/30 transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Secondary Instant Clinical Demo Access */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 mb-2.5 font-medium">Instant Clinical Demo Access:</p>
            <div className="flex items-center justify-center space-x-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemo('ER Trauma Lead', 'dr.sarah.chen@careflow.er')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Senior Paramedic', 'paramedic.marcus@careflow.er')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
              >
                Paramedic
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Triage Charge Nurse', 'triage.elena@careflow.er')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
              >
                Nurse
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LoginPage;
