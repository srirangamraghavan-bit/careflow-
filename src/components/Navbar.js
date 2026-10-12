import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Lock, 
  UserPlus, 
  Ambulance, 
  LayoutGrid, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  Database,
  Sun,
  Moon,
  Eye
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { theme, setTheme } = useTheme();

  // Hide navbar completely on login page to remove header and prevent blank gaps
  if (location.pathname === '/login') {
    return null;
  }

  // Helper to determine active styling if viewing within the tab
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Login', path: '/login', icon: Lock },
    { name: 'Intake Type', path: '/intake', icon: UserPlus },
    { name: 'Ambulance Entry', path: '/ambulance', icon: Ambulance },
    { 
      name: '8-Bay Triage Grid', 
      path: '/triage', 
      icon: LayoutGrid,
      hasPulseBadge: true 
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand (Opens Triage in new tab) */}
          <Link
            to="/triage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 group-hover:bg-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-500/25 transition">
              <Activity className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Care<span className="text-blue-600 dark:text-blue-400">Flow</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  ER v2.4
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hidden lg:inline-flex">
                  <Database className="w-2.5 h-2.5 mr-1" />
                  Full CRUD Active
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                Advanced Emergency Medical Dashboard
              </p>
            </div>
          </Link>

          {/* Navigation Items (Target = _blank to open separate tabs) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/80 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700 text-xs font-medium">
            {navLinks.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                    active
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                  {item.hasPulseBadge && (
                    <span className="ml-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Theme Selector, Audio Toggle & Profile Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* 3-Mode Theme Selector (Light, Dark, Colorblind) */}
            <div className="flex items-center bg-slate-100/90 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setTheme('light')}
                title="Light Mode (Default Standard UI)"
                className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg flex items-center space-x-1.5 transition cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white text-blue-600 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[11px]">Light</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                title="Dark Mode (Night Shift Eye Strain Reduction)"
                className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg flex items-center space-x-1.5 transition cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900 dark:bg-slate-950 text-blue-400 shadow-xs font-bold border border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[11px]">Dark</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('colorblind')}
                title="Colorblind Mode (High-Contrast & Geometric Shapes)"
                className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg flex items-center space-x-1.5 transition cursor-pointer ${
                  theme === 'colorblind'
                    ? 'bg-amber-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[11px]">Colorblind</span>
              </button>
            </div>

            {/* Audio Telemetry Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title="Toggle ER Audio Telemetry"
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Doctor Profile Pill (Opens Login in new tab) */}
            <Link
              to="/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2.5 pl-2 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-700/80 transition cursor-pointer"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&crop=faces"
                  alt="Dr. Sarah Chen"
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">Dr. Sarah Chen, MD</p>
                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium leading-tight">Chief Trauma Lead</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
