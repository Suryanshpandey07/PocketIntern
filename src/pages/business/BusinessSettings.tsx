import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { BusinessSidebar } from '../../components/dashboard/BusinessSidebar';
import { Button } from '../../components/common/Button';
import { Bell, ShieldCheck, RotateCcw, Save } from 'lucide-react';

export const BusinessSettings: React.FC = () => {
  const { resetToSeedData } = useData();
  const { success } = useToast();

  const [notifApplications, setNotifApplications] = useState(true);
  const [notifSubmissions, setNotifSubmissions] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Settings Saved', 'Business notification preferences updated.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <BusinessSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div>
            <h1 className="text-2xl font-black text-navy-800 tracking-tight">
              Business Settings
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Configure hiring notifications, milestone alerts, and demo session state.
            </p>
          </div>

          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-6">
            <h3 className="text-sm font-bold text-navy-800 flex items-center gap-2">
              <Bell className="w-4 h-4 text-accent" />
              <span>Hiring Notifications</span>
            </h3>

            <div className="space-y-4 text-xs">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifApplications}
                  onChange={(e) => setNotifApplications(e.target.checked)}
                  className="mt-0.5 rounded text-accent focus:ring-accent h-4 w-4 border-slate-300"
                />
                <div>
                  <span className="font-bold text-navy-800 block">New Candidate Applications</span>
                  <span className="text-slate-500">Alert me as soon as a student submits a proposal for any of my posted projects.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifSubmissions}
                  onChange={(e) => setNotifSubmissions(e.target.checked)}
                  className="mt-0.5 rounded text-accent focus:ring-accent h-4 w-4 border-slate-300"
                />
                <div>
                  <span className="font-bold text-navy-800 block">Deliverable Submissions &amp; Revisions</span>
                  <span className="text-slate-500">Notify me immediately when a hired student uploads deliverables to the workspace.</span>
                </div>
              </label>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="accent" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
                Save Preferences
              </Button>
            </div>
          </form>

          {/* Reset Box */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-navy-800">Reset Demonstration Workspace</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Restores original sample projects, candidate applications, and simulated escrow ledgers.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-rose-600 hover:bg-rose-50 border-rose-200"
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={() => {
                if (window.confirm('Reset all demonstration data?')) {
                  resetToSeedData();
                  success('Data Reset', 'Default demonstration data restored.');
                }
              }}
            >
              Reset Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
