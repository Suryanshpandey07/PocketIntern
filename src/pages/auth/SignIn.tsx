import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Lock,
  UserCheck
} from 'lucide-react';

export const SignIn: React.FC = () => {
  const { switchUser, login, allUsers } = useAuth();
  const { success, error, info } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickLogin = (userId: string, targetPath: string, personaName: string) => {
    switchUser(userId);
    success(`Logged in as ${personaName}`, 'Welcome to PocketIntern demonstration session.');
    navigate(targetPath);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      error('Please enter an email');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const ok = login(email, password);
      if (ok) {
        success('Signed In Successfully');
        navigate('/projects');
      } else {
        info('Email not found in seed data. Logging in as default demo student.');
        switchUser('student-1');
        navigate('/student/dashboard');
      }
    }, 400);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8 text-left">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Prototype Sign In</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-navy-800 tracking-tight">
          Welcome to PocketIntern
        </h1>
        <p className="text-xs text-slate-500">
          Select a sample persona below for instant 1-click login or enter credentials.
        </p>
      </div>

      {/* Quick 1-Click Demo Accounts */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Instant 1-Click Demo Logins
        </span>

        <button
          onClick={() => handleQuickLogin('student-1', '/student/dashboard', 'Aarav Sharma (Student)')}
          className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-accent hover:bg-accent/[0.02] transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=128&q=80"
              alt="Aarav"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-bold text-navy-800 group-hover:text-accent">
                Aarav Sharma &bull; Student
              </p>
              <p className="text-[11px] text-slate-500">
                DTU B.Tech &bull; Active Gigs & Payouts
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => handleQuickLogin('biz-1', '/business/dashboard', 'Vikram Malhotra (UrbanPulse)')}
          className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-accent hover:bg-accent/[0.02] transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=128&q=80"
              alt="UrbanPulse"
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div>
              <p className="text-xs font-bold text-navy-800 group-hover:text-accent">
                UrbanPulse Media &bull; Business
              </p>
              <p className="text-[11px] text-slate-500">
                Delhi NCR D2C Brand &bull; 5 Posted Projects
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => handleQuickLogin('biz-2', '/business/dashboard', 'Nexora SaaS (Assigned to Aarav)')}
          className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-accent hover:bg-accent/[0.02] transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=128&q=80"
              alt="Nexora"
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div>
              <p className="text-xs font-bold text-navy-800 group-hover:text-accent">
                Nexora SaaS &bull; Business (In Progress)
              </p>
              <p className="text-[11px] text-slate-500">
                Noida &bull; Project assigned to Aarav
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>

      {/* Manual Form Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-brandbg px-3 text-slate-400 font-semibold">Or Sign In With Email</span>
        </div>
      </div>

      {/* Manual Sign In Form */}
      <form onSubmit={handleManualSubmit} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4">
        <div>
          <label className="block text-xs font-bold text-navy-800 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. aarav.sharma@dtu.ac.in"
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-navy-800 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
            />
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Demo note: Password checking is bypassed in prototype mode.
          </span>
        </div>

        <Button
          type="submit"
          variant="accent"
          size="md"
          className="w-full"
          isLoading={isLoading}
        >
          Sign In
        </Button>

        <div className="pt-2 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-accent hover:underline">
            Register Here
          </Link>
        </div>
      </form>
    </div>
  );
};
