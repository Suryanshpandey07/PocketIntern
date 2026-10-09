import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { StatCard } from '../../components/dashboard/StatCard';
import { StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  FolderKanban, 
  CheckCircle2, 
  IndianRupee, 
  AlertTriangle, 
  RotateCcw, 
  Activity,
  Check,
  XCircle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { allUsers } = useAuth();
  const { projects, assignments, payments, resetToSeedData } = useData();
  const { success, info } = useToast();

  const studentsCount = allUsers.filter((u) => u.role === 'student').length;
  const businessCount = allUsers.filter((u) => u.role === 'business').length;
  const completedProjects = projects.filter((p) => p.status === 'completed').length;
  const totalVolume = payments.reduce((sum, p) => sum + p.amount, 0);

  // Demo moderation queue
  const [reportedItems, setReportedItems] = useState([
    {
      id: 'rep-1',
      title: 'Reported Project: Scrape competitor emails without rate limit',
      reason: 'Violates platform safety policy regarding automated scraping',
      status: 'pending_review',
      reportedAt: '2026-10-09T08:30:00Z',
    },
    {
      id: 'rep-2',
      title: 'Reported Review: Suspicious 1-star dispute on project #4',
      reason: 'Disputed deliverable checklist interpretation',
      status: 'pending_review',
      reportedAt: '2026-10-08T15:20:00Z',
    }
  ]);

  const handleApproveReport = (id: string) => {
    setReportedItems(reportedItems.filter((r) => r.id !== id));
    success('Report Resolved', 'Item removed or validated by admin operations.');
  };

  const handleDismissReport = (id: string) => {
    setReportedItems(reportedItems.filter((r) => r.id !== id));
    info('Report Dismissed', 'No violation found.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-accent/10 text-accent">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-accent uppercase tracking-wider">
              Platform Governance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-800 tracking-tight">
            Administrator Demonstration Console
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Global metrics, escrow transaction monitoring, and content moderation queue.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-rose-600 hover:bg-rose-50 border-rose-200"
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          onClick={() => {
            if (window.confirm('Reset all demonstration database records?')) {
              resetToSeedData();
              success('Database Reset', 'Default initial seed records restored.');
            }
          }}
        >
          Reset All Demonstration Data
        </Button>
      </div>

      {/* Global StatCards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Students"
          value={studentsCount}
          subtitle="Registered talent"
          icon={<Users className="w-5 h-5 text-accent" />}
        />

        <StatCard
          title="Total Startups"
          value={businessCount}
          subtitle="Hiring businesses"
          icon={<Building2 className="w-5 h-5 text-highlight-hover" />}
        />

        <StatCard
          title="Projects Created"
          value={projects.length}
          subtitle="Marketplace listings"
          icon={<FolderKanban className="w-5 h-5 text-navy-800" />}
        />

        <StatCard
          title="Completed Gigs"
          value={completedProjects}
          subtitle="Verified deliverables"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        />

        <StatCard
          title="Escrow Volume"
          value={`₹${totalVolume.toLocaleString('en-IN')}`}
          subtitle="Total platform gross"
          icon={<IndianRupee className="w-5 h-5 text-emerald-700" />}
        />
      </div>

      {/* Moderation & Quality Review Queue */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-navy-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Demonstration Moderation Queue ({reportedItems.length})</span>
          </h3>
          <span className="text-xs text-slate-400">Delhi NCR Trust &amp; Safety</span>
        </div>

        {reportedItems.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            Moderation queue is clean. Zero pending flags.
          </div>
        ) : (
          <div className="space-y-3">
            {reportedItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-navy-800">{item.title}</h4>
                  <p className="text-slate-600">{item.reason}</p>
                  <span className="text-[10px] text-slate-400 block">
                    Flagged {new Date(item.reportedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleDismissReport(item.id)}
                  >
                    Dismiss Flag
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleApproveReport(item.id)}
                  >
                    Take Action
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Platform Activity Feed */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-navy-800 flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent" />
          <span>Real-time Platform Activity Audit</span>
        </h3>

        <div className="space-y-3 text-xs divide-y divide-slate-100">
          <div className="pt-2 flex items-center justify-between">
            <span className="text-slate-700">Aarav Sharma submitted deliverable revision for "Test New SaaS Checkout"</span>
            <span className="text-[11px] text-slate-400">Nexora SaaS &bull; 2h ago</span>
          </div>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-slate-700">Priya Nair applied to "Create 10 Instagram Carousel Posts"</span>
            <span className="text-[11px] text-slate-400">UrbanPulse &bull; 5h ago</span>
          </div>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-slate-700">FinCraft released ₹3,500 milestone payout to student</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Payment Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
