import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  UserCheck 
} from 'lucide-react';

export const RoleSelection: React.FC = () => {
  const { allUsers, switchUser, currentUser } = useAuth();
  const { resetToSeedData } = useData();
  const { success, info } = useToast();
  const navigate = useNavigate();

  const students = allUsers.filter((u) => u.role === 'student');
  const businesses = allUsers.filter((u) => u.role === 'business');
  const admin = allUsers.find((u) => u.role === 'admin');

  const handleSelectUser = (userId: string, targetRoute: string, name: string) => {
    switchUser(userId);
    success(`Persona Activated`, `Now viewing prototype as ${name}`);
    navigate(targetRoute);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demonstration data to default seed values?')) {
      resetToSeedData();
      success('Database Reinitialized', 'Seed demonstration data has been restored.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Prototype Sandbox</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-800 tracking-tight">
          Select Your Demonstration Persona
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          PocketIntern includes realistic demonstration accounts across both Student and Business personas so you can evaluate all core features without registering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Student Column */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-800">Student Demonstration Experience</h2>
              <p className="text-xs text-slate-500">Apply to gigs, submit deliverables, earn simulated payouts</p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Choose Student Account
            </span>

            {students.map((stu) => (
              <div
                key={stu.id}
                onClick={() => handleSelectUser(stu.id, '/student/dashboard', stu.name)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between hover:border-accent hover:shadow-subtle ${
                  currentUser?.id === stu.id
                    ? 'border-accent bg-accent/[0.04] ring-1 ring-accent'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={stu.avatar}
                    alt={stu.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-navy-800 truncate">{stu.name}</p>
                      {currentUser?.id === stu.id && (
                        <span className="text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.2 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{stu.email}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Business Column */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-highlight/15 text-highlight-hover flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6 text-navy-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-800">Business Demonstration Experience</h2>
              <p className="text-xs text-slate-500">Post gigs, review student candidates, approve work, release escrow</p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Choose Business Account
            </span>

            {businesses.map((biz) => (
              <div
                key={biz.id}
                onClick={() => handleSelectUser(biz.id, '/business/dashboard', biz.name)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between hover:border-accent hover:shadow-subtle ${
                  currentUser?.id === biz.id
                    ? 'border-accent bg-accent/[0.04] ring-1 ring-accent'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={biz.avatar}
                    alt={biz.name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-navy-800 truncate">{biz.name}</p>
                      {currentUser?.id === biz.id && (
                        <span className="text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.2 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{biz.email}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin View & Reset Row */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm text-navy-800">
            <ShieldCheck className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-navy-800">Administrator Console View</h3>
            <p className="text-[11px] text-slate-500">Inspect platform health metrics, escrow totals, and content moderation</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {admin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectUser(admin.id, '/admin/dashboard', 'Admin Console')}
            >
              Open Admin Console
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="text-rose-600 hover:bg-rose-50"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={handleResetData}
          >
            Reset Seed Data
          </Button>
        </div>
      </div>
    </div>
  );
};
