import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ambulance, Activity, Send, AlertTriangle, CheckCircle, ArrowLeft, Signal } from 'lucide-react';

const AmbulancePage = () => {
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState('AMB-9048');
  const [patientName, setPatientName] = useState('Julian Ramirez');
  const [age, setAge] = useState('52');
  const [gender, setGender] = useState('Male');
  
  // Vitals
  const [hr, setHr] = useState(134);
  const [temp, setTemp] = useState(101.4);
  const [sugar, setSugar] = useState(230);
  const [bp, setBp] = useState('175/105');
  const [notes, setNotes] = useState('Acute chest discomfort radiating to left jaw, diaphoresis. ST-elevation suspected.');

  // Equipment list
  const [equipment, setEquipment] = useState([
    'Defibrillator (AED)',
    '12-Lead ECG Monitor',
    'Portable Ventilator',
    'Oxygen Concentrator'
  ]);

  // Criticality override
  const [criticalityOverride, setCriticalityOverride] = useState(null);

  const availableEquipment = [
    'Defibrillator (AED)',
    'Portable Ventilator',
    '12-Lead ECG Monitor',
    'IV Infusion Pump',
    'Oxygen Concentrator',
    'Suction Unit'
  ];

  const toggleEquipment = (item) => {
    setEquipment(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  // Evaluate criticality
  const computeCriticality = () => {
    if (criticalityOverride) return criticalityOverride;
    if (hr > 125 || hr < 45 || sugar > 240 || temp > 102.5 || equipment.length >= 3) {
      return 'High';
    } else if (hr >= 65 && hr <= 95 && sugar <= 130 && equipment.length === 0) {
      return 'Zero';
    }
    return 'Middle';
  };

  const currentCriticality = computeCriticality();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Ambulance Payload Transmitted! Case ${patientId} auto-ranked as [${currentCriticality}]. Navigating to ER Triage.`);
    navigate('/triage');
  };

  return (
    <div className="py-6 max-w-3xl mx-auto px-4 sm:px-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/intake" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition">
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Back to Intake Selection
        </Link>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          <Signal className="w-3 h-3 mr-1 text-emerald-500 animate-pulse" />
          Ambulance Telemetry Hub Active
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
        
        {/* Title */}
        <div className="flex items-center space-x-3.5 pb-6 mb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <Ambulance className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Ambulance Data Entry Form</h1>
            <p className="text-xs text-slate-500">Live Paramedic Field Stream & Criticality Grading</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Patient Core Identification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Patient / Case ID
              </label>
              <input
                type="text"
                required
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Patient Full Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Age & Gender
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>

          {/* Vitals Inputs */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-blue-600" />
                <span>Real-Time Physiological Vitals</span>
              </h2>
              <span className="text-[11px] text-slate-400">Values dynamically tune Criticality Bar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Heart Rate (BPM)</label>
                <input
                  type="number"
                  value={hr}
                  onChange={(e) => setHr(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Temperature (°F)</label>
                <input
                  type="number"
                  step="0.1"
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Sugar Level (mg/dL)</label>
                <input
                  type="number"
                  value={sugar}
                  onChange={(e) => setSugar(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Blood Pressure (BP)</label>
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>
          </div>

          {/* Medical Equipment */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Medical Equipment in Active Use
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {availableEquipment.map((eq) => {
                const checked = equipment.includes(eq);
                return (
                  <button
                    key={eq}
                    type="button"
                    onClick={() => toggleEquipment(eq)}
                    className={`p-3 rounded-xl border text-left transition select-none flex items-center space-x-2.5 ${
                      checked
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <input type="checkbox" checked={checked} readOnly className="rounded text-blue-600" />
                    <span className="text-xs">{eq}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Criticality Bar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Dynamic Criticality Bar</span>
                <p className="text-[11px] text-slate-500">Live clinical assessment of patient stability</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                currentCriticality === 'High' ? 'bg-red-50 text-red-600 border border-red-200' :
                currentCriticality === 'Middle' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                'bg-emerald-50 text-emerald-600 border border-emerald-200'
              }`}>
                {currentCriticality} Urgency
              </span>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  currentCriticality === 'High' ? 'w-[95%] bg-red-500 shadow-sm shadow-red-500/50' :
                  currentCriticality === 'Middle' ? 'w-[60%] bg-amber-500' :
                  'w-[25%] bg-emerald-500'
                }`}
              />
            </div>

            {/* 3 State Selector Buttons */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setCriticalityOverride('High')}
                className={`p-3 rounded-xl text-left transition border ${
                  currentCriticality === 'High' ? 'border-2 border-red-500 bg-red-50/80 font-bold' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-red-700">
                  <span>High</span>
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Critical emergency</p>
              </button>

              <button
                type="button"
                onClick={() => setCriticalityOverride('Middle')}
                className={`p-3 rounded-xl text-left transition border ${
                  currentCriticality === 'Middle' ? 'border-2 border-amber-500 bg-amber-50/80 font-bold' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-amber-700">
                  <span>Middle</span>
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Stable / monitored</p>
              </button>

              <button
                type="button"
                onClick={() => setCriticalityOverride('Zero')}
                className={`p-3 rounded-xl text-left transition border ${
                  currentCriticality === 'Zero' ? 'border-2 border-emerald-500 bg-emerald-50/80 font-bold' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-emerald-700">
                  <span>Zero</span>
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Curable in ambulance</p>
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              EMT Field Clinical Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            />
          </div>

          {/* Transmit Button */}
          <button
            type="submit"
            className="w-full py-4 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-blue-600/30 transition flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Transmit & Auto-Rank into ER Triage (8-Bay Grid)</span>
          </button>

        </form>

      </div>
    </div>
  );
};

export default AmbulancePage;
