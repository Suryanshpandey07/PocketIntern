import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { StudentSidebar } from '../../components/dashboard/StudentSidebar';
import { StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { 
  FileText, 
  Clock, 
  Building2, 
  IndianRupee, 
  ArrowRight, 
  XCircle, 
  ExternalLink 
} from 'lucide-react';

export const MyApplications: React.FC = () => {
  const { currentUser } = useAuth();
  const { applications, projects, businessProfiles, withdrawApplication } = useData();
  const { success } = useToast();

  const [activeTab, setActiveTab] = useState<string>('all');

  const myApplications = applications.filter((a) => a.studentId === currentUser?.id);

  const filteredApps = myApplications.filter((app) => {
    if (activeTab === 'all') return true;
    return app.status === activeTab;
  });

  const handleWithdraw = (appId: string, projectTitle: string) => {
    if (window.confirm(`Withdraw your application for "${projectTitle}"?`)) {
      withdrawApplication(appId);
      success('Application Withdrawn', 'Your application has been withdrawn.');
    }
  };

  const tabs = [
    { id: 'all', label: 'All Applications', count: myApplications.length },
    { id: 'pending', label: 'Pending Review', count: myApplications.filter((a) => a.status === 'pending').length },
    { id: 'shortlisted', label: 'Shortlisted', count: myApplications.filter((a) => a.status === 'shortlisted').length },
    { id: 'accepted', label: 'Hired / Accepted', count: myApplications.filter((a) => a.status === 'accepted').length },
    { id: 'rejected', label: 'Not Selected', count: myApplications.filter((a) => a.status === 'rejected').length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <StudentSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div>
            <h1 className="text-2xl font-black text-navy-800 tracking-tight">
              My Project Applications
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track submitted proposals, shortlists, and hiring decisions.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-navy-800 text-white shadow-subtle'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-navy-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Applications List */}
          {filteredApps.length === 0 ? (
            <EmptyState
              icon={<FileText className="w-6 h-6" />}
              title="No applications in this view"
              description="Browse the marketplace to find open gigs that match your college skillset."
              actionText="Explore Projects"
              onAction={() => window.location.href = '/projects'}
            />
          ) : (
            <div className="space-y-4">
              {filteredApps.map((app) => {
                const project = projects.find((p) => p.id === app.projectId);
                const business = project ? businessProfiles.find((b) => b.userId === project.businessId) : undefined;

                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-subtle space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {project?.category}
                          </span>
                          <StatusBadge status={app.status} />
                          <span className="text-xs text-slate-400">
                            Applied {new Date(app.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <Link
                          to={`/projects/${project?.id}`}
                          className="text-base font-bold text-navy-800 hover:text-accent transition-colors"
                        >
                          {project?.title}
                        </Link>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Business: <strong className="text-navy-800">{business?.businessName}</strong> &bull; {business?.location}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-lg font-black text-navy-800">
                          ₹{project?.budget.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-slate-400 block">{project?.duration} duration</span>
                      </div>
                    </div>

                    {/* Proposal Snippet */}
                    <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Your Submitted Proposal:
                      </span>
                      <p className="leading-relaxed line-clamp-2 italic">
                        &ldquo;{app.proposal}&rdquo;
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        {app.status === 'pending' && (
                          <button
                            onClick={() => handleWithdraw(app.id, project?.title || 'project')}
                            className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Withdraw Application</span>
                          </button>
                        )}
                        {app.status === 'accepted' && (
                          <Link
                            to={`/student/workspace/${project?.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors"
                          >
                            <span>Open Project Workspace &rarr;</span>
                          </Link>
                        )}
                      </div>

                      <Link
                        to={`/projects/${project?.id}`}
                        className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                      >
                        <span>View Project Details</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
