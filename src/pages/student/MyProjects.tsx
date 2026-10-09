import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StudentSidebar } from '../../components/dashboard/StudentSidebar';
import { StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { 
  FolderKanban, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileCheck 
} from 'lucide-react';

export const MyProjects: React.FC = () => {
  const { currentUser } = useAuth();
  const { assignments, projects, businessProfiles } = useData();

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  const myAssignments = assignments.filter((a) => a.studentId === currentUser?.id);

  const filtered = myAssignments.filter((a) => {
    if (activeTab === 'active') return a.status !== 'completed' && a.status !== 'approved';
    if (activeTab === 'completed') return a.status === 'completed' || a.status === 'approved';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <StudentSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-navy-800 tracking-tight">
                My Assigned Projects
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Collaborative micro-project workspaces with deliverables, submissions, and payouts.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'all' ? 'bg-navy-800 text-white shadow-subtle' : 'text-slate-600 hover:text-navy-800'
                }`}
              >
                All ({myAssignments.length})
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'active' ? 'bg-navy-800 text-white shadow-subtle' : 'text-slate-600 hover:text-navy-800'
                }`}
              >
                Active ({myAssignments.filter((a) => a.status !== 'completed').length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'completed' ? 'bg-navy-800 text-white shadow-subtle' : 'text-slate-600 hover:text-navy-800'
                }`}
              >
                Completed ({myAssignments.filter((a) => a.status === 'completed').length})
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={<FolderKanban className="w-6 h-6" />}
              title="No projects in this category"
              description="Apply for open micro-projects to get hired by verified startups."
              actionText="Explore Projects"
              onAction={() => window.location.href = '/projects'}
            />
          ) : (
            <div className="space-y-4">
              {filtered.map((assign) => {
                const project = projects.find((p) => p.id === assign.projectId);
                const business = project ? businessProfiles.find((b) => b.userId === project.businessId) : undefined;

                return (
                  <div
                    key={assign.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-slate-300 transition-all"
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {project?.category}
                        </span>
                        <StatusBadge status={assign.status} />
                        <span className="text-xs text-slate-400">
                          Assigned {new Date(assign.startedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-navy-800 truncate">
                        {project?.title}
                      </h3>

                      <p className="text-xs text-slate-500">
                        Client: <strong className="text-navy-800">{business?.businessName}</strong> &bull; {business?.location}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Escrow Secured</span>
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <FileCheck className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {assign.deliverablesChecklist?.filter((d) => d.completed).length || 0} / {assign.deliverablesChecklist?.length || 0} deliverables ready
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3 flex-shrink-0">
                      <div>
                        <span className="text-xl font-black text-navy-800">
                          ₹{project?.budget.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-400 block text-right">Stipend</span>
                      </div>

                      <Link to={`/student/workspace/${project?.id}`}>
                        <Button
                          variant="accent"
                          size="sm"
                          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          Open Workspace
                        </Button>
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
