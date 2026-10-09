import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { BusinessSidebar } from '../../components/dashboard/BusinessSidebar';
import { StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { ApplicantProfileModal } from '../../components/dashboard/ApplicantProfileModal';
import { Application, Project } from '../../types';
import { 
  Users, 
  Eye, 
  GraduationCap, 
  Star, 
  Clock, 
  ExternalLink, 
  Filter 
} from 'lucide-react';

export const ApplicationsReceived: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useAuth();
  const { 
    projects, 
    applications, 
    allUsers, 
    getStudentProfile 
  } = useData();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    searchParams.get('projectId') || 'all'
  );
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const myProjects = projects.filter((p) => p.businessId === currentUser?.id);
  const myProjectIds = myProjects.map((p) => p.id);

  // Applications for this business's projects
  const myApplications = applications.filter((a) => myProjectIds.includes(a.projectId) && a.status !== 'withdrawn');

  const filteredApps = myApplications.filter((app) => {
    if (selectedProjectId !== 'all' && app.projectId !== selectedProjectId) return false;
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    return true;
  });

  // Modal state
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [targetProject, setTargetProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenApplicant = (app: Application) => {
    const proj = projects.find((p) => p.id === app.projectId) || null;
    setSelectedApp(app);
    setTargetProject(proj);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <BusinessSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div>
            <h1 className="text-2xl font-black text-navy-800 tracking-tight">
              Applications Received
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Review student proposals, inspect coursework &amp; portfolios, and select candidates.
            </p>
          </div>

          {/* Filters Bar: Project Dropdown & Status Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-navy-800 whitespace-nowrap">Filter by Project:</span>
              <select
                value={selectedProjectId}
                onChange={(e) => {
                  setSelectedProjectId(e.target.value);
                  setSearchParams(e.target.value === 'all' ? {} : { projectId: e.target.value });
                }}
                className="w-full sm:w-72 text-xs p-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-accent font-medium text-slate-700"
              >
                <option value="all">All Projects ({myApplications.length} total)</option>
                {myProjects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              {['all', 'pending', 'shortlisted', 'accepted', 'rejected'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                    statusFilter === st
                      ? 'bg-navy-800 text-white shadow-subtle'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Applications Cards Grid */}
          {filteredApps.length === 0 ? (
            <EmptyState
              icon={<Users className="w-6 h-6" />}
              title="No applications match your filter"
              description="Select 'All Projects' or check back as more students discover your opportunities."
            />
          ) : (
            <div className="space-y-4">
              {filteredApps.map((app) => {
                const proj = projects.find((p) => p.id === app.projectId);
                const stu = allUsers.find((u) => u.id === app.studentId);
                const stuProfile = getStudentProfile(app.studentId);

                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-subtle space-y-4 hover:border-slate-300 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={stu?.avatar}
                          alt={stu?.name}
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 flex-shrink-0"
                        />
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-navy-800">
                              {stu?.name}
                            </h3>
                            <StatusBadge status={app.status} />
                          </div>

                          <p className="text-xs text-slate-600 font-medium">
                            {stuProfile?.college} &bull; {stuProfile?.degree} ({stuProfile?.year})
                          </p>

                          <div className="flex items-center gap-3 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1 text-amber-600 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>{stuProfile?.averageRating || 5.0} Rating</span>
                            </span>
                            <span>&bull;</span>
                            <span>{stuProfile?.completedProjectsCount || 0} completed gigs</span>
                            <span>&bull;</span>
                            <span>{stuProfile?.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left sm:text-right flex-shrink-0">
                        <span className="text-[10px] text-slate-400 font-medium block">Applying for:</span>
                        <p className="text-xs font-bold text-navy-800 max-w-xs truncate">
                          {proj?.title}
                        </p>
                        <span className="text-xs font-extrabold text-navy-800 mt-0.5 block">
                          ₹{proj?.budget.toLocaleString('en-IN')} Stipend
                        </span>
                      </div>
                    </div>

                    {/* Proposal Preview Box */}
                    <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 text-xs space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Candidate Proposal:
                      </span>
                      <p className="text-slate-700 leading-relaxed italic">
                        &ldquo;{app.proposal}&rdquo;
                      </p>
                    </div>

                    {/* Action Row */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Submitted {new Date(app.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </span>

                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => handleOpenApplicant(app)}
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                      >
                        Review Candidate &amp; Decision
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Candidate Decision Modal */}
      {selectedApp && targetProject && (
        <ApplicantProfileModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedApp(null);
            setTargetProject(null);
          }}
          application={selectedApp}
          project={targetProject}
        />
      )}
    </div>
  );
};
