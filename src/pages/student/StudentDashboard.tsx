import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StudentSidebar } from '../../components/dashboard/StudentSidebar';
import { StatCard } from '../../components/dashboard/StatCard';
import { StatusBadge } from '../../components/common/Badge';
import { 
  FileText, 
  FolderKanban, 
  CheckCircle2, 
  IndianRupee, 
  Compass, 
  Star, 
  ArrowRight, 
  Clock, 
  ExternalLink, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { 
    getStudentProfile, 
    applications, 
    assignments, 
    projects, 
    payments, 
    reviews,
    businessProfiles
  } = useData();
  const navigate = useNavigate();

  const studentProfile = currentUser ? getStudentProfile(currentUser.id) : undefined;
  
  // Student metrics
  const myApps = applications.filter((a) => a.studentId === currentUser?.id && a.status !== 'withdrawn');
  const activeAssignments = assignments.filter((a) => a.studentId === currentUser?.id && a.status !== 'completed');
  const completedAssignments = assignments.filter((a) => a.studentId === currentUser?.id && a.status === 'completed');
  
  // Total earned from completed payments
  const studentPayments = payments.filter((p) => p.studentId === currentUser?.id);
  const totalEarned = studentPayments
    .filter((p) => p.status === 'completed')
    .reduce((sum, curr) => sum + curr.amount, 0);

  // Recommended projects based on student skills
  const studentSkills = studentProfile?.skills || [];
  const recommendedProjects = projects
    .filter((p) => p.status === 'open')
    .filter((p) => p.skills.some((s) => studentSkills.some((sk) => sk.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(sk.toLowerCase()))))
    .slice(0, 3);

  // Active assignment in progress
  const currentActive = activeAssignments[0];
  const activeProject = currentActive ? projects.find((p) => p.id === currentActive.projectId) : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        {/* Left Sidebar */}
        <StudentSidebar />

        {/* Main Content Area */}
        <div className="flex-1 space-y-6 min-w-0">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-highlight shadow-sm"
              />
              <div>
                <span className="text-[11px] font-semibold text-highlight uppercase tracking-wider">
                  College Student Dashboard
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Welcome back, {currentUser?.name}!
                </h1>
                <p className="text-xs text-slate-300 mt-0.5">
                  {studentProfile?.college} &bull; {studentProfile?.degree} ({studentProfile?.year})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link to="/projects">
                <Button variant="accent" size="sm" leftIcon={<Compass className="w-4 h-4" />}>
                  Explore Gigs
                </Button>
              </Link>
              <Link to="/student/profile">
                <Button variant="outline" size="sm" className="bg-navy-800 text-white border-navy-700 hover:bg-navy-700">
                  Edit Portfolio
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Applications"
              value={myApps.length}
              subtitle={`${myApps.filter((a) => a.status === 'pending').length} pending review`}
              icon={<FileText className="w-5 h-5 text-accent" />}
              onClick={() => navigate('/student/applications')}
            />

            <StatCard
              title="Active Gigs"
              value={activeAssignments.length}
              subtitle="Working in workspace"
              icon={<FolderKanban className="w-5 h-5 text-amber-500" />}
              onClick={() => navigate('/student/projects')}
            />

            <StatCard
              title="Completed Gigs"
              value={completedAssignments.length}
              subtitle="Verified on portfolio"
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              onClick={() => navigate('/student/projects')}
            />

            <StatCard
              title="Total Earned"
              value={`₹${totalEarned.toLocaleString('en-IN')}`}
              subtitle="Simulated escrow payout"
              icon={<IndianRupee className="w-5 h-5 text-emerald-600" />}
              onClick={() => navigate('/student/earnings')}
            />
          </div>

          {/* Active Assignment Alert / Callout */}
          {currentActive && activeProject && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase">
                    Active Project Milestone
                  </span>
                  <StatusBadge status={currentActive.status} />
                </div>
                <h3 className="text-sm font-bold text-navy-800">
                  {activeProject.title}
                </h3>
                <p className="text-xs text-slate-600">
                  Stipend: <strong className="text-navy-800">₹{activeProject.budget.toLocaleString('en-IN')}</strong> &bull; Deadline: {new Date(activeProject.projectDeadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </p>
              </div>

              <Link to={`/student/workspace/${activeProject.id}`}>
                <Button variant="accent" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Open Workspace
                </Button>
              </Link>
            </div>
          )}

          {/* Two-Column Layout: Recommended Projects & Application Tracker */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recommended Projects Based on Skills */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-navy-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>Recommended For Your Skills</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Matches: {studentSkills.slice(0, 3).join(', ')}
                  </p>
                </div>
                <Link to="/projects" className="text-xs font-semibold text-accent hover:underline">
                  View All &rarr;
                </Link>
              </div>

              <div className="space-y-3">
                {recommendedProjects.map((p) => {
                  const biz = businessProfiles.find((b) => b.userId === p.businessId);
                  return (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-xl border border-slate-200/80 hover:border-accent hover:bg-slate-50/50 transition-all flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {p.category}
                        </span>
                        <h4 className="text-xs font-bold text-navy-800 group-hover:text-accent truncate">
                          {p.title}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {biz?.businessName} &bull; {p.duration}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-black text-navy-800 block">
                          ₹{p.budget.toLocaleString('en-IN')}
                        </span>
                        <Link
                          to={`/projects/${p.id}`}
                          className="text-[11px] font-bold text-accent hover:underline mt-1 inline-block"
                        >
                          Details &rarr;
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Application Status Tracker */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-navy-800 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-accent" />
                  <span>Recent Applications</span>
                </h3>
                <Link to="/student/applications" className="text-xs font-semibold text-accent hover:underline">
                  All ({myApps.length}) &rarr;
                </Link>
              </div>

              {myApps.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No applications yet. Browse live projects and submit a proposal!
                </div>
              ) : (
                <div className="space-y-3">
                  {myApps.slice(0, 3).map((app) => {
                    const proj = projects.find((p) => p.id === app.projectId);
                    return (
                      <div
                        key={app.id}
                        className="p-3.5 rounded-xl border border-slate-200/80 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-navy-800 truncate max-w-[200px] sm:max-w-[240px]">
                            {proj?.title}
                          </h4>
                          <StatusBadge status={app.status} />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>Stipend: ₹{proj?.budget.toLocaleString('en-IN')}</span>
                          <span>Applied {new Date(app.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
