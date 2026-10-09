import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  GraduationCap, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Share2, 
  Briefcase, 
  ArrowLeft,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const PublicPortfolio: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { getStudentProfile, allUsers, assignments, projects, reviews, businessProfiles } = useData();
  const { success } = useToast();

  const studentUser = allUsers.find((u) => u.id === studentId);
  const studentProfile = studentId ? getStudentProfile(studentId) : undefined;

  // Completed assignments for this student
  const completedAssignments = assignments.filter(
    (a) => a.studentId === studentId && a.status === 'completed'
  );

  // Reviews received by this student
  const studentReviews = reviews.filter((r) => r.revieweeId === studentId);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Portfolio Link Copied!', 'Shareable URL copied to clipboard.');
  };

  if (!studentUser || !studentProfile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-navy-800">Student Portfolio Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested student profile could not be located.</p>
        <div className="mt-6">
          <Link to="/projects">
            <Button variant="accent" size="sm">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        <button
          onClick={handleShare}
          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Portfolio</span>
        </button>
      </div>

      {/* Private Profile Warning if toggled off */}
      {!studentProfile.isPortfolioPublic && (
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Note: This portfolio is currently set to private by the student. Visible here in demonstration mode.</span>
        </div>
      )}

      {/* Profile Header Hero */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-5">
          <img
            src={studentUser.avatar}
            alt={studentUser.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-100 shadow-sm flex-shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-navy-800">{studentUser.name}</h1>
              <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                Verified Student
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              {studentProfile.degree} &bull; {studentProfile.year}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
              <span>{studentProfile.college}</span>
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{studentProfile.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{studentProfile.availability}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/60">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-black text-amber-950">{studentProfile.averageRating}</span>
            <span className="text-[10px] text-amber-800">/ 5.0 Rating</span>
          </div>
          <span className="text-xs font-semibold text-slate-600">
            {studentProfile.completedProjectsCount} Verified Micro-Projects
          </span>
        </div>
      </div>

      {/* About & Skills */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-5">
        <div>
          <h2 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-2">
            About Me
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {studentProfile.bio}
          </p>
        </div>

        <div className="pt-2">
          <h2 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-2.5">
            Verified Skills & Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {studentProfile.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* External Links */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
          {studentProfile.portfolioUrl && (
            <a
              href={studentProfile.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-accent hover:bg-slate-100 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Personal Website</span>
            </a>
          )}
          {studentProfile.githubUrl && (
            <a
              href={studentProfile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
          {studentProfile.linkedinUrl && (
            <a
              href={studentProfile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>

      {/* Verified Completed Projects with Client Reviews */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-navy-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Verified Completed Micro-Projects</span>
          </h2>
          <span className="text-xs text-slate-400">
            {completedAssignments.length} proof records
          </span>
        </div>

        {completedAssignments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
            No completed projects yet. Check back soon!
          </div>
        ) : (
          <div className="space-y-4">
            {completedAssignments.map((assign) => {
              const proj = projects.find((p) => p.id === assign.projectId);
              const biz = businessProfiles.find((b) => b.userId === assign.businessId);
              const review = studentReviews.find((r) => r.projectId === assign.projectId);

              return (
                <div
                  key={assign.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Verified Completion
                        </span>
                        <span className="text-xs text-slate-400">
                          {proj?.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-navy-800">
                        {proj?.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Client: <strong className="text-slate-700">{biz?.businessName}</strong> ({biz?.location})
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-extrabold text-navy-800">
                        ₹{proj?.budget.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-400 block">Stipend Paid</span>
                    </div>
                  </div>

                  {/* Deliverables Delivered */}
                  {proj?.deliverables && (
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Deliverables Verified:
                      </span>
                      <ul className="space-y-1 text-slate-600">
                        {proj.deliverables.map((d, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Business Review Quote */}
                  {review && (
                    <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-xs font-bold text-amber-950 ml-1">
                            {review.rating}.0 Client Review
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 italic leading-relaxed">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                      <p className="text-[10px] text-slate-500 font-semibold text-right">
                        &mdash; {biz?.businessName}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
