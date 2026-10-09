import React from 'react';
import { Application, Project } from '../../types';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/Badge';
import { 
  GraduationCap, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  UserCheck, 
  XCircle, 
  Bookmark 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApplicantProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
  project: Project | null;
}

export const ApplicantProfileModal: React.FC<ApplicantProfileModalProps> = ({
  isOpen,
  onClose,
  application,
  project,
}) => {
  const { allUsers } = useAuth();
  const { 
    getStudentProfile, 
    shortlistApplication, 
    acceptApplication, 
    rejectApplication 
  } = useData();
  const { success, error } = useToast();

  if (!application || !project) return null;

  const studentUser = allUsers.find((u) => u.id === application.studentId);
  const studentProfile = getStudentProfile(application.studentId);

  const handleShortlist = () => {
    shortlistApplication(application.id);
    success('Application Shortlisted', `${studentUser?.name} has been notified.`);
    onClose();
  };

  const handleAccept = () => {
    if (window.confirm(`Select ${studentUser?.name} for "${project.title}"? This will assign the project, escrow ₹${project.budget.toLocaleString('en-IN')}, and notify the student to begin work.`)) {
      acceptApplication(application.id);
      try {
        confetti({ particleCount: 80, spread: 70 });
      } catch (e) {}
      success('Student Hired!', `${studentUser?.name} is now assigned to the project.`);
      onClose();
    }
  };

  const handleReject = () => {
    if (window.confirm(`Decline this application?`)) {
      rejectApplication(application.id);
      success('Application Declined', 'Status has been updated.');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Candidate Application Review"
      description={`Applying for: "${project.title}"`}
      maxWidth="xl"
    >
      <div className="space-y-6 text-left">
        {/* Profile Card Header */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={studentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80'}
              alt={studentUser?.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-navy-800">
                  {studentUser?.name}
                </h3>
                <StatusBadge status={application.status} />
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {studentProfile?.college} &bull; {studentProfile?.degree} ({studentProfile?.year})
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {studentProfile?.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {studentProfile?.availability}
                </span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/60">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{studentProfile?.averageRating || 5.0}</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1">
              {studentProfile?.completedProjectsCount || 0} completed gigs
            </span>
          </div>
        </div>

        {/* Bio & Skills */}
        <div>
          <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-2">
            Student Bio & Skills
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {studentProfile?.bio}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {studentProfile?.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Application Proposal */}
        <div className="bg-accent/[0.03] border border-accent/20 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-navy-800 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-accent" />
              <span>Candidate Proposal for this Project</span>
            </h4>
            <span className="text-[10px] text-slate-400">
              Submitted {new Date(application.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-100">
            {application.proposal}
          </p>

          {application.relevantExperience && (
            <div className="pt-1">
              <span className="text-[11px] font-bold text-slate-700 block mb-1">
                Past Work & Relevant Coursework:
              </span>
              <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
                {application.relevantExperience}
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {application.portfolioUrl && (
              <a
                href={application.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-accent font-semibold hover:underline bg-white px-3 py-1.5 rounded-xl border border-accent/20"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Student Portfolio</span>
              </a>
            )}
            {application.attachmentName && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Attachment: {application.attachmentName}</span>
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            {application.status === 'pending' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleShortlist}
                leftIcon={<Bookmark className="w-3.5 h-3.5" />}
              >
                Shortlist Candidate
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {application.status !== 'rejected' && application.status !== 'accepted' && (
              <Button
                variant="ghost"
                size="sm"
                className="text-rose-600 hover:bg-rose-50"
                onClick={handleReject}
                leftIcon={<XCircle className="w-3.5 h-3.5" />}
              >
                Decline
              </Button>
            )}

            {application.status !== 'accepted' ? (
              <Button
                variant="accent"
                size="sm"
                onClick={handleAccept}
                leftIcon={<UserCheck className="w-3.5 h-3.5" />}
              >
                Accept & Hire Student
              </Button>
            ) : (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Hired & Assigned to Project</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
