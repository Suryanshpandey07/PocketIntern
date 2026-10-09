import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { StudentSidebar } from '../../components/dashboard/StudentSidebar';
import { Button } from '../../components/common/Button';
import { Bell, ShieldCheck, RotateCcw, Save } from 'lucide-react';

export const StudentSettings: React.FC = () => {
  const { currentUser } = useAuth();
  const { resetToSeedData } = useData();
  const { success } = useToast();

  const [notifHires, setNotifHires] = useState(true);
  const [notifRevisions, setNotifRevisions] = useState(true);
  const [notifPayouts, setNotifPayouts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Settings Saved', 'Your notifications preferences have been updated.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <StudentSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div>
            <h1 className="text-2xl font-black text-navy-800 tracking-tight">
              Student Account Settings
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage in-app alert triggers and prototype demonstration session.
            </p>
          </div>

          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-6">
            <h3 className="text-sm font-bold text-navy-800 flex items-center gap-2">
              <Bell className="w-4 h-4 text-accent" />
              <span>In-App &amp; Email Notifications</span>
            </h3>

            <div className="space-y-4 text-xs">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifHires}
                  onChange={(e) => setNotifHires(e.target.checked)}
                  className="mt-0.5 rounded text-accent focus:ring-accent h-4 w-4 border-slate-300"
                />
                <div>
                  <span className="font-bold text-navy-800 block">Hire &amp; Selection Alerts</span>
                  <span className="text-slate-500">Receive immediate notifications when a startup accepts your proposal.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifRevisions}
                  onChange={(e) => setNotifRevisions(e.target.checked)}
                  className="mt-0.5 rounded text-accent focus:ring-accent h-4 w-4 border-slate-300"
                />
                <div>
                  <span className="font-bold text-navy-800 block">Workspace Review Feedback</span>
                  <span className="text-slate-500">Notify me whenever a business leaves feedback or revision requests on deliverables.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifPayouts}
                  onChange={(e) => setNotifPayouts(e.target.checked)}
                  className="mt-0.5 rounded text-accent focus:ring-accent h-4 w-4 border-slate-300"
                />
                <div>
                  <span className="font-bold text-navy-800 block">Simulated Stipend Releases</span>
                  <span className="text-slate-500">Notify me when escrow payouts are cleared and added to available earnings.</span>
                </div>
              </label>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="accent" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
                Save Preferences
              </Button>
            </div>
          </form>

          {/* Sandbox Reset */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-navy-800">Restore Initial Demonstration State</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Resets all local applications, projects, reviews, and test earnings back to seed data.
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
