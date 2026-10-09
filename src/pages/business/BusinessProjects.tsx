import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { BusinessSidebar } from '../../components/dashboard/BusinessSidebar';
import { StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { 
  FolderKanban, 
  PlusCircle, 
  Users, 
  ArrowRight, 
  Edit, 
  ExternalLink, 
  CheckCircle2 
} from 'lucide-react';

export const BusinessProjects: React.FC = () => {
  const { currentUser } = useAuth();
  const { projects, applications, updateProject } = useData();
  const { success } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'in_progress' | 'completed'>('all');

  const myProjects = projects.filter((p) => p.businessId === currentUser?.id);

  const filteredProjects = myProjects.filter((p) => {
    if (activeTab === 'all') return true;
    return p.status === activeTab;
  });

  const handleCloseApplications = (projectId: string, title: string) => {
    if (window.confirm(`Close applications for "${title}"?`)) {
      updateProject(projectId, { status: 'in_progress' });
      success('Applications Closed', 'Project is no longer accepting new proposals.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <BusinessSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-navy-800 tracking-tight">
                My Posted Micro-Projects
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Manage your postings, track candidate applicants, and oversee deliverable progress.
              </p>
            </div>

            <Link to="/business/post-project">
              <Button
                variant="accent"
                size="sm"
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                Post a Project
              </Button>
            </Link>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Postings', count: myProjects.length },
              { id: 'open', label: 'Open', count: myProjects.filter((p) => p.status === 'open').length },
              { id: 'in_progress', label: 'In Progress', count: myProjects.filter((p) => p.status === 'in_progress').length },
              { id: 'completed', label: 'Completed', count: myProjects.filter((p) => p.status === 'completed').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
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

          {/* Projects List */}
          {filteredProjects.length === 0 ? (
            <EmptyState
              icon={<FolderKanban className="w-6 h-6" />}
              title="No projects in this category"
              description="Post a defined micro-project to start receiving candidate applications from college students."
              actionText="Post a Project"
              onAction={() => navigate('/business/post-project')}
            />
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => {
                const applicantCount = applications.filter((a) => a.projectId === project.id && a.status !== 'withdrawn').length;

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-subtle space-y-4 hover:border-slate-300 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {project.category}
                          </span>
                          <StatusBadge status={project.status} />
                          <span className="text-xs text-slate-400">
                            Posted {new Date(project.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>

                        <Link
                          to={`/projects/${project.id}`}
                          className="text-base font-bold text-navy-800 hover:text-accent transition-colors"
                        >
                          {project.title}
                        </Link>

                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-lg font-black text-navy-800">
                          ₹{project.budget.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{project.duration}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-4 text-slate-500">
                        <Link
                          to={`/business/applications?projectId=${project.id}`}
                          className="flex items-center gap-1.5 font-bold text-accent hover:underline"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>{applicantCount} Candidate {applicantCount === 1 ? 'Application' : 'Applications'}</span>
                        </Link>

                        <span>Due: {new Date(project.projectDeadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.status === 'open' && (
                          <Link
                            to={`/business/edit-project/${project.id}`}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors flex items-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>
                        )}

                        {project.status !== 'open' && (
                          <Link
                            to={`/business/workspace/${project.id}`}
                            className="px-3 py-1.5 rounded-xl bg-accent text-white font-semibold text-xs hover:bg-accent-hover transition-colors flex items-center gap-1"
                          >
                            <span>Open Workspace</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}

                        <Link
                          to={`/projects/${project.id}`}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                        >
                          Public Preview
                        </Link>
                      </div>
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
