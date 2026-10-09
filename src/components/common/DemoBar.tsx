import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { 
  Sparkles, 
  RotateCcw, 
  UserCheck, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  ChevronDown,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoBar: React.FC = () => {
  const { currentUser, switchUser, allUsers } = useAuth();
  const { resetToSeedData } = useData();
  const { success, info } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    if (window.confirm('Reset all demonstration data to its original initial state? Any changes you made will be reinitialized.')) {
      resetToSeedData();
      success('Demonstration Data Reset', 'Projects, applications, and simulated earnings have been restored.');
    }
  };

  const handleUserChange = (userId: string) => {
    switchUser(userId);
    setIsOpen(false);
    const target = allUsers.find(u => u.id === userId);
    if (target?.role === 'student') {
      info(`Switched to Student Demo: ${target.name}`);
      navigate('/student/dashboard');
    } else if (target?.role === 'business') {
      info(`Switched to Business Demo: ${target.name}`);
      navigate('/business/dashboard');
    } else {
      info(`Switched to Admin Demo: ${target?.name}`);
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="bg-navy-950 text-slate-200 text-xs border-b border-navy-700/60 sticky top-0 z-50 px-3 py-1.5 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-highlight"></span>
          </span>
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-highlight" />
            <span className="hidden sm:inline">PocketIntern Interactive MVP</span>
            <span className="text-slate-400 font-normal">| Prototype Mode</span>
          </span>
        </div>

        {/* Center / Right: Quick Demo Persona Switcher */}
        <div className="flex items-center gap-2">
          {/* Quick Shortcuts for primary test accounts */}
          <div className="hidden md:flex items-center gap-1 bg-navy-900/80 p-0.5 rounded-lg border border-navy-700/50">
            <button
              onClick={() => handleUserChange('student-1')}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium transition-all ${
                currentUser?.id === 'student-1'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-navy-800'
              }`}
              title="Aarav Sharma - DTU B.Tech Student"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Aarav (Student)</span>
            </button>

            <button
              onClick={() => handleUserChange('biz-1')}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium transition-all ${
                currentUser?.id === 'biz-1'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-navy-800'
              }`}
              title="Vikram Malhotra - UrbanPulse Founder"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>UrbanPulse (Business)</span>
            </button>

            <button
              onClick={() => handleUserChange('biz-2')}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium transition-all ${
                currentUser?.id === 'biz-2'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-navy-800'
              }`}
              title="Sneha Kapoor - Nexora SaaS (Assigned to Aarav)"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Nexora SaaS</span>
            </button>

            <button
              onClick={() => handleUserChange('admin-1')}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium transition-all ${
                currentUser?.id === 'admin-1'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-navy-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Persona Dropdown for mobile and other profiles */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-navy-800 hover:bg-navy-700 text-slate-200 px-2.5 py-1 rounded-lg border border-navy-700 flex items-center gap-1.5 font-medium transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-accent" />
              <span className="truncate max-w-[120px] sm:max-w-none">
                {currentUser?.name} ({currentUser?.role})
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-navy-900 border border-navy-700 rounded-xl shadow-2xl py-2 z-50">
                <div className="px-3 py-1.5 border-b border-navy-800 text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                  <span>SELECT DEMO PERSONA</span>
                  <span className="text-highlight">1-Click Switch</span>
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {allUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => handleUserChange(u.id)}
                      className={`w-full text-left px-3 py-2 flex items-center gap-2.5 hover:bg-navy-800 transition-colors ${
                        currentUser?.id === u.id ? 'bg-navy-800/80 text-white font-medium' : 'text-slate-300'
                      }`}
                    >
                      <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs truncate">{u.name}</p>
                        <p className="text-[10px] text-slate-400 capitalize">{u.role} &bull; {u.email.split('@')[1]}</p>
                      </div>
                      {currentUser?.id === u.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reset Demonstration Data */}
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-rose-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-navy-900 transition-colors"
            title="Reset to default seed data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Seed</span>
          </button>
        </div>
      </div>
    </div>
  );
};
