import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { BusinessSidebar } from '../../components/dashboard/BusinessSidebar';
import { StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { 
  UserCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck 
} from 'lucide-react';

export const ActiveHires: React.FC = () => {
  const { currentUser } = useAuth();
  const { assignments, projects, allUsers, getStudentProfile } = useData();

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const myAssignments = assignments.filter((a) => a.businessId === currentUser?.id);

  const filtered = myAssignments.filter((a) => {
    if (filter === 'active') return a.status !== 'completed';
    if (filter === 'completed') return a.status === 'completed';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <BusinessSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-navy-800 tracking-tight">
                Active Hires &amp; Deliverables
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Monitor student milestones, inspect submissions, request revisions, and approve payouts.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === 'all' ? 'bg-navy-800 text-white shadow-subtle' : 'text-slate-600 hover:text-navy-800'
                }`}
              >
                All ({myAssignments.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === 'active' ? 'bg-navy-800 text-white shadow-subtle' : 'text-slate-600 hover:text-navy-800'
                }`}
              >
                Active ({myAssignments.filter((a) => a.status !== 'completed').length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === 'completed' ? 'bg-navy-800 text-white shadow-subtle' : 'text-slate-600 hover:text-navy-800'
                }`}
              >
                Completed ({myAssignments.filter((a) => a.status === 'completed').length})
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={<UserCheck className="w-6 h-6" />}
              title="No hires in this category"
              description="Review applications on your posted projects to hire students."
              actionText="View Applications"
              onAction={() => window.location.href = '/business/applications'}
            />
          ) : (
            <div className="space-y-4">
              {filtered.map((assign) => {
                const project = projects.find((p) => p.id === assign.projectId);
                const student = allUsers.find((u) => u.id === assign.studentId);
                const studentProfile = getStudentProfile(assign.studentId);

                return (
                  <div
                    key={assign.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <img
                        src={student?.avatar}
                        alt={student?.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 flex-shrink-0"
                      />
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-navy-800 truncate">
                            {student?.name}
                          </span>
                          <StatusBadge status={assign.status} />
                        </div>
                        <p className="text-xs font-semibold text-slate-700 truncate">
                          Project: {project?.title}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {studentProfile?.college} &bull; Stipend: <strong className="text-navy-800">₹{project?.budget.toLocaleString('en-IN')}</strong>
                        </p>

                        <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                          <span className="flex items-center gap-1 font-semibold text-emerald-700">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Escrow Reserved</span>
                          </span>
                          <span>&bull;</span>
                          <span>
                            {assign.deliverablesChecklist?.filter((d) => d.completed).length || 0} / {assign.deliverablesChecklist?.length || 0} checklist items checked
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3 flex-shrink-0">
                      <span className="text-lg font-black text-navy-800">
                        ₹{project?.budget.toLocaleString('en-IN')}
                      </span>

                      <Link to={`/business/workspace/${project?.id}`}>
                        <Button
                          variant="accent"
                          size="sm"
                          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          Open Workspace &amp; Review
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
