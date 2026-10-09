import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { BusinessSidebar } from '../../components/dashboard/BusinessSidebar';
import { StatCard } from '../../components/dashboard/StatCard';
import { StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ApplicantProfileModal } from '../../components/dashboard/ApplicantProfileModal';
import { Application, Project } from '../../types';
import { 
  FolderKanban, 
  Users, 
  UserCheck, 
  IndianRupee, 
  PlusCircle, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Eye, 
  FileText 
} from 'lucide-react';

export const BusinessDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { 
    getBusinessProfile, 
    projects, 
    applications, 
    assignments, 
    payments,
    allUsers,
    getStudentProfile 
  } = useData();
  const navigate = useNavigate();

  const business = currentUser ? getBusinessProfile(currentUser.id) : undefined;

  // Business-specific entities
  const myProjects = projects.filter((p) => p.businessId === currentUser?.id);
  const myProjectIds = myProjects.map((p) => p.id);
  
  const openProjects = myProjects.filter((p) => p.status === 'open');
  const myApplications = applications.filter((a) => myProjectIds.includes(a.projectId) && a.status !== 'withdrawn');
  const pendingApplications = myApplications.filter((a) => a.status === 'pending');
  
  const myAssignments = assignments.filter((a) => a.businessId === currentUser?.id);
  const activeHires = myAssignments.filter((a) => a.status !== 'completed');

  // Total spending (completed payments)
  const myPayments = payments.filter((p) => p.businessId === currentUser?.id);
  const totalSpent = myPayments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  // Applicant Review Modal
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false);

  const handleOpenApplicant = (app: Application) => {
    const proj = projects.find((p) => p.id === app.projectId) || null;
    setSelectedApplication(app);
    setSelectedProject(proj);
    setIsApplicantModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <BusinessSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          {/* Company Welcome Banner */}
          <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={business?.logo || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=256&q=80'}
                alt={business?.businessName || 'Business'}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-highlight shadow-sm flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-highlight uppercase tracking-wider">
                    Startup Console
                  </span>
                  {business?.verified && (
                    <span className="flex items-center gap-1 text-[10px] bg-highlight/20 text-highlight px-2 py-0.2 rounded-full font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Employer</span>
                    </span>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {business?.businessName || currentUser?.name}
                </h1>
                <p className="text-xs text-slate-300 mt-0.5">
                  {business?.industry} &bull; {business?.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link to="/business/post-project">
                <Button
                  variant="accent"
                  size="sm"
                  className="bg-highlight hover:bg-highlight-hover text-navy-950 font-bold"
                  leftIcon={<PlusCircle className="w-4 h-4 text-navy-950" />}
                >
                  Post a Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Business Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              title="Projects Posted"
              value={myProjects.length}
              subtitle="All-time micro-gigs"
              icon={<FolderKanban className="w-5 h-5 text-accent" />}
              onClick={() => navigate('/business/projects')}
            />

            <StatCard
              title="Open Postings"
              value={openProjects.length}
              subtitle="Accepting applicants"
              icon={<FolderKanban className="w-5 h-5 text-emerald-600" />}
              onClick={() => navigate('/business/projects')}
            />

            <StatCard
              title="Applications"
              value={myApplications.length}
              subtitle={`${pendingApplications.length} pending review`}
              icon={<Users className="w-5 h-5 text-amber-500" />}
              onClick={() => navigate('/business/applications')}
            />

            <StatCard
              title="Active Hires"
              value={activeHires.length}
              subtitle="Working students"
              icon={<UserCheck className="w-5 h-5 text-highlight-hover" />}
              onClick={() => navigate('/business/hires')}
            />

            <StatCard
              title="Total Spent"
              value={`₹${totalSpent.toLocaleString('en-IN')}`}
              subtitle="Completed milestones"
              icon={<IndianRupee className="w-5 h-5 text-navy-800" />}
            />
          </div>

          {/* Active Hires & In-Progress Projects */}
          {activeHires.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-navy-800 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>Active Hires In Progress</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Review deliverables submitted by students or request revisions.
                  </p>
                </div>
                <Link to="/business/hires" className="text-xs font-semibold text-accent hover:underline">
                  View All &rarr;
                </Link>
              </div>

              <div className="space-y-3">
                {activeHires.map((assign) => {
                  const proj = projects.find((p) => p.id === assign.projectId);
                  const stu = allUsers.find((u) => u.id === assign.studentId);
                  const stuProfile = getStudentProfile(assign.studentId);

                  return (
                    <div
                      key={assign.id}
                      className="p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={stu?.avatar}
                          alt={stu?.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-navy-800 truncate">
                              {stu?.name}
                            </span>
                            <StatusBadge status={assign.status} />
                          </div>
                          <p className="text-xs text-slate-600 truncate font-medium">
                            {proj?.title}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {stuProfile?.college} &bull; Stipend: ₹{proj?.budget.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>

                      <Link to={`/business/workspace/${proj?.id}`}>
                        <Button
                          variant="accent"
                          size="sm"
                          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          Open Workspace &amp; Review
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Candidate Applications */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-navy-800 flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  <span>Recent Candidate Applications</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Click a candidate to view their proposal, coursework, and hire them.
                </p>
              </div>
              <Link to="/business/applications" className="text-xs font-semibold text-accent hover:underline">
                View All ({myApplications.length}) &rarr;
              </Link>
            </div>

            {myApplications.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">
                No applications received yet. Post a project to receive student proposals!
              </div>
            ) : (
              <div className="space-y-3">
                {myApplications.slice(0, 4).map((app) => {
                  const proj = projects.find((p) => p.id === app.projectId);
                  const stu = allUsers.find((u) => u.id === app.studentId);
                  const stuProfile = getStudentProfile(app.studentId);

                  return (
                    <div
                      key={app.id}
                      className="p-4 rounded-xl border border-slate-200/80 hover:border-accent hover:bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <img
                          src={stu?.avatar}
                          alt={stu?.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0 mt-0.5"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-navy-800">
                              {stu?.name}
                            </span>
                            <StatusBadge status={app.status} />
                            <span className="text-[10px] text-slate-400">
                              ★ {stuProfile?.averageRating || 5.0} Rating
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 font-medium truncate">
                            For: {proj?.title}
                          </p>
                          <p className="text-[11px] text-slate-500 italic line-clamp-1 mt-0.5">
                            &ldquo;{app.proposal}&rdquo;
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenApplicant(app)}
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                      >
                        Review Candidate
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Applicant Profile Modal */}
      {selectedApplication && selectedProject && (
        <ApplicantProfileModal
          isOpen={isApplicantModalOpen}
          onClose={() => {
            setIsApplicantModalOpen(false);
            setSelectedApplication(null);
            setSelectedProject(null);
          }}
          application={selectedApplication}
          project={selectedProject}
        />
      )}
    </div>
  );
};
