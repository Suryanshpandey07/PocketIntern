import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from '../../types';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  Bookmark, 
  Clock, 
  Calendar, 
  Users, 
  MapPin, 
  Globe2, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { StatusBadge } from '../common/Badge';

interface ProjectCardProps {
  project: Project;
  onApplyClick?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onApplyClick }) => {
  const { businessProfiles, isBookmarked, toggleBookmark, applications } = useData();
  const { currentUser, isStudent } = useAuth();
  const { success, info } = useToast();
  const navigate = useNavigate();

  const business = businessProfiles.find((b) => b.userId === project.businessId);
  const applicantCount = applications.filter((a) => a.projectId === project.id && a.status !== 'withdrawn').length;
  const bookmarked = currentUser ? isBookmarked(currentUser.id, project.id) : false;
  
  // Check if current user already applied
  const existingApp = currentUser
    ? applications.find((a) => a.projectId === project.id && a.studentId === currentUser.id && a.status !== 'withdrawn')
    : null;

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) {
      info('Please sign in or select a demo account to bookmark projects');
      return;
    }
    toggleBookmark(currentUser.id, project.id);
    if (!bookmarked) {
      success('Project Bookmarked', 'Saved to your bookmarked projects.');
    }
  };

  const formattedBudget = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(project.budget);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-5 sm:p-6 shadow-subtle hover:shadow-hover transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Header: Company Info & Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={business?.logo || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=128&q=80'}
              alt={business?.businessName || 'Business'}
              className="w-10 h-10 rounded-xl object-cover border border-slate-100 flex-shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-navy-800 truncate">
                  {business?.businessName || 'Verified Startup'}
                </span>
                {business?.verified && (
                  <span title="Verified Business">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                {project.isRemote ? (
                  <>
                    <Globe2 className="w-3 h-3 text-slate-400" />
                    <span>Remote &bull; Pan-India</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{project.location || 'Delhi NCR'}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-xl transition-colors ${
                bookmarked
                  ? 'bg-accent/10 text-accent'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title={bookmarked ? 'Remove bookmark' : 'Bookmark project'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-accent' : ''}`} />
            </button>
          </div>
        </div>

        {/* Project Title & Status */}
        <div className="mb-2.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              {project.category}
            </span>
            <StatusBadge status={project.status} />
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="text-base font-bold text-navy-800 hover:text-accent transition-colors line-clamp-2 block leading-snug"
          >
            {project.title}
          </Link>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-200/80"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-500">
              +{project.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="pt-4 border-t border-slate-100 mt-auto">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{project.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{applicantCount} applied</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Due {new Date(project.applicationDeadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Stipend / Pay</span>
            <span className="text-lg font-extrabold text-navy-800">
              {formattedBudget}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/projects/${project.id}`}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Details
            </Link>

            {project.status === 'open' && (
              existingApp ? (
                <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Applied</span>
                </span>
              ) : (
                <button
                  onClick={() => {
                    if (onApplyClick) {
                      onApplyClick(project);
                    } else {
                      navigate(`/projects/${project.id}`);
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors shadow-subtle flex items-center gap-1"
                >
                  <span>Apply</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
