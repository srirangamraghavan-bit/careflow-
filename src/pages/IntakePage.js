import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, UserPlus, Ambulance, Check, ArrowRight, ClipboardList } from 'lucide-react';

const IntakePage = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Greeting and Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200 mb-3">
          <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
          Authentication Verified: ER Trauma Portal
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Patient Intake Selection</h1>
        <p className="text-sm text-slate-500 mt-2">
          Select intake channel to initiate clinical triaging or stream active paramedic telemetry.
        </p>
      </div>

      {/* Two Distinct Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Option 1: Normal Patient Entry */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <UserPlus className="w-7 h-7 stroke-[2]" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Normal Patient Entry</h2>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">Walk-In / Routine</span>
            </div>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              Standard admissions channel for non-immediate emergencies, walk-ins, and routine doctor referrals. Captures basic identification, demographics, and contact info.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-500 mr-2" /> Captures basic demographic & contact data</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-500 mr-2" /> General triage queue placement</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-500 mr-2" /> Standard clinic billing profile</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => alert('Normal patient enrollment dialog opened.')}
              className="w-full py-3 px-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-[0.99] font-semibold text-sm transition flex items-center justify-center space-x-2"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Enroll Normal Patient</span>
            </button>
          </div>
        </div>

        {/* Option 2: Ambulance Entry (Prominent Ambulance Icon) */}
        <div className="bg-white rounded-2xl p-7 border-2 border-blue-500 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
            High Priority Telemetry
          </div>

          <div>
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-5 shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <Ambulance className="w-9 h-9 stroke-[2.2]" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Ambulance Entry</h2>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
                Urgent Telemetry
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              Field paramedic inbound payload pipeline. Direct sync with dynamic criticality grading, real-time vitals streaming, and emergency equipment allocation.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-blue-600 mr-2" /> Real-time vitals (HR, BP, Glucose, Temp)</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-blue-600 mr-2" /> Dynamic Criticality Bar (High / Mid / Zero)</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-blue-600 mr-2" /> Instant insertion into ER 8-Bay Split Grid</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <Link
              to="/ambulance"
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-blue-600/25 transition flex items-center justify-center space-x-2"
            >
              <span>Launch Ambulance Data Entry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* Return to Dashboard */}
      <div className="mt-8 text-center">
        <Link
          to="/triage"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          Skip to Main ER Triage Dashboard (8-Screen Grid) &rarr;
        </Link>
      </div>

    </div>
  );
};

export default IntakePage;
