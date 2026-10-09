import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ApplicationModal } from '../../components/projects/ApplicationModal';
import { StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Clock, 
  Calendar, 
  Users, 
  MapPin, 
  Globe2, 
  CheckCircle2, 
  ShieldCheck, 
  IndianRupee, 
  ExternalLink, 
  Sparkles,
  Building2,
  FileCheck
} from 'lucide-react';

export const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { getProject, businessProfiles, applications, isBookmarked, toggleBookmark } = useData();
  const { currentUser, isStudent, isBusiness } = useAuth();
  const { success, info } = useToast();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const project = projectId ? getProject(projectId) : undefined;
  const business = project ? businessProfiles.find((b) => b.userId === project.businessId) : undefined;
  
  const applicants = project ? applications.filter((a) => a.projectId === project.id && a.status !== 'withdrawn') : [];
  const existingApp = (project && currentUser)
    ? applications.find((a) => a.projectId === project.id && a.studentId === currentUser.id && a.status !== 'withdrawn')
    : undefined;

  const bookmarked = (project && currentUser) ? isBookmarked(currentUser.id, project.id) : false;

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-navy-800">Project Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The project you are looking for may have expired or was removed.</p>
        <div className="mt-6">
          <Link to="/projects">
            <Button variant="accent" size="sm">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Link Copied!', 'Project URL copied to your clipboard.');
  };

  const handleBookmark = () => {
    if (!currentUser) {
      info('Please select a student demo persona to bookmark projects');
      return;
    }
    toggleBookmark(currentUser.id, project.id);
    if (!bookmarked) {
      success('Project Bookmarked', 'Added to your saved projects list.');
    }
  };

  const formattedBudget = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(project.budget);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Breadcrumb / Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Share project link"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-xl border transition-colors ${
              bookmarked
                ? 'bg-accent/10 border-accent/20 text-accent'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark project'}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-accent' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Project Overview & Deliverables */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  {project.category}
                </span>
                <StatusBadge status={project.status} />
                <span className="text-xs text-slate-400 ml-auto">
                  Posted {new Date(project.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-navy-800 tracking-tight leading-snug">
                {project.title}
              </h1>
            </div>

            {/* Project Full Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                Project Overview & Requirements
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Required Deliverables */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-accent" />
                <span>Required Deliverables</span>
              </h3>
              <ul className="space-y-2.5">
                {project.deliverables.map((del, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Skills */}
            <div className="space-y-2.5 pt-2">
              <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                Required Skills & Familiarity
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Instructions */}
            {project.additionalInstructions && (
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900 space-y-1">
                <span className="font-bold block">Important Note from Business:</span>
                <p className="leading-relaxed text-amber-800 font-medium">
                  {project.additionalInstructions}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Stipend, Timeline, Apply Card & Company Profile */}
        <div className="space-y-6">
          {/* Action Box */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-5">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Fixed Project Stipend</span>
              <div className="text-3xl font-black text-navy-800 mt-0.5">
                {formattedBudget}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 mt-1 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Escrow Guaranteed Payout</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Estimated Duration</span>
                </span>
                <span className="font-bold text-navy-800">{project.duration}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Apply Before</span>
                </span>
                <span className="font-bold text-navy-800">
                  {new Date(project.applicationDeadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Users className="w-3.5 h-3.5" />
                  <span>Candidates Applied</span>
                </span>
                <span className="font-bold text-navy-800">{applicants.length} students</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Location</span>
                </span>
                <span className="font-bold text-navy-800">{project.isRemote ? 'Remote (Pan-India)' : project.location}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              {project.status !== 'open' ? (
                <div className="p-3 bg-slate-100 rounded-xl text-center text-xs font-semibold text-slate-500">
                  This project is currently {project.status.replace('_', ' ')}. Applications closed.
                </div>
              ) : existingApp ? (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                  <span className="text-xs font-bold text-emerald-800 block">
                    You have already applied!
                  </span>
                  <span className="text-[11px] text-emerald-600 capitalize">
                    Application status: {existingApp.status}
                  </span>
                  <div className="mt-2">
                    <Link to="/student/applications" className="text-xs font-semibold text-accent hover:underline">
                      View Application Details &rarr;
                    </Link>
                  </div>
                </div>
              ) : (
                <Button
                  variant="accent"
                  size="md"
                  className="w-full"
                  onClick={() => setIsApplyModalOpen(true)}
                >
                  Apply For This Project
                </Button>
              )}
            </div>
          </div>

          {/* Hiring Business Profile */}
          {business && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                About the Business
              </span>

              <div className="flex items-start gap-3">
                <img
                  src={business.logo}
                  alt={business.businessName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-navy-800">{business.businessName}</h4>
                    {business.verified && (
                      <span title="Verified Business">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{business.industry}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{business.location}</span>
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {business.description}
              </p>

              {business.website && (
                <div className="pt-1">
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold"
                  >
                    <span>Visit Company Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        project={project}
      />
    </div>
  );
};
