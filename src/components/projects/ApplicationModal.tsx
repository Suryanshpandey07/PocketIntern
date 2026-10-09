import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  GraduationCap 
} from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const { currentUser, isStudent, switchUser } = useAuth();
  const { submitApplication, getStudentProfile, getApplicationByProjectAndStudent } = useData();
  const { success, error } = useToast();

  const studentProfile = currentUser ? getStudentProfile(currentUser.id) : undefined;
  const existingApp = (project && currentUser) ? getApplicationByProjectAndStudent(project.id, currentUser.id) : undefined;

  const [proposal, setProposal] = useState('');
  const [relevantSkills, setRelevantSkills] = useState<string[]>([]);
  const [relevantExperience, setRelevantExperience] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Auto-fill student profile data
  useEffect(() => {
    if (studentProfile) {
      setPortfolioUrl(studentProfile.portfolioUrl || '');
      // Match project skills with student's skills
      if (project) {
        const matched = project.skills.filter((s) =>
          studentProfile.skills.some((sk) => sk.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(sk.toLowerCase()))
        );
        setRelevantSkills(matched.length > 0 ? matched : project.skills.slice(0, 2));
      }
    }
  }, [studentProfile, project, isOpen]);

  if (!project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!currentUser || !isStudent) {
      setFormError('You must be signed in as a student to submit an application.');
      return;
    }

    if (proposal.trim().length < 25) {
      setFormError('Please write a slightly more detailed proposal (at least 25 characters) describing your approach.');
      return;
    }

    if (!confirmed) {
      setFormError('Please check the confirmation box before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = submitApplication(project.id, currentUser.id, {
        proposal: proposal.trim(),
        relevantSkills,
        relevantExperience: relevantExperience.trim() || 'Active college coursework & self-guided projects.',
        portfolioUrl: portfolioUrl.trim() || studentProfile?.portfolioUrl || 'https://portfolio.demo',
        attachmentName: attachmentName.trim() || undefined,
      });

      if (res.success) {
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch (e) {
          // ignore if confetti fails
        }
        success('Application Submitted!', `Your proposal for "${project.title}" has been sent to the business.`);
        onClose();
        // Reset form
        setProposal('');
        setRelevantExperience('');
        setConfirmed(false);
      } else {
        setFormError(res.message || 'Unable to submit application.');
        error('Application Error', res.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Apply for: ${project.title}`}
      description={`Budget: ₹${project.budget.toLocaleString('en-IN')} • Estimated duration: ${project.duration}`}
      maxWidth="xl"
    >
      {!isStudent ? (
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-sm">
          <div className="flex items-center gap-2 font-bold mb-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>Student Account Required</span>
          </div>
          <p className="mb-4 text-xs leading-relaxed">
            You are currently viewing as a business or guest account. To test submitting an application as a student, switch to demo student Aarav Sharma.
          </p>
          <Button
            size="sm"
            variant="accent"
            leftIcon={<GraduationCap className="w-4 h-4" />}
            onClick={() => switchUser('student-1')}
          >
            Switch to Demo Student (Aarav Sharma)
          </Button>
        </div>
      ) : existingApp && existingApp.status !== 'withdrawn' ? (
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-sm text-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <h4 className="font-bold">Application Already Submitted</h4>
          <p className="text-xs text-emerald-700 mt-1 mb-4">
            You have already applied for this project. Current status: <strong className="capitalize">{existingApp.status}</strong>.
          </p>
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{formError}</span>
            </div>
          )}

          {/* Quick Profile Summary Banner */}
          {studentProfile && (
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-navy-800">{currentUser?.name}</p>
                  <p className="text-[11px] text-slate-500">{studentProfile.college} &bull; {studentProfile.year}</p>
                </div>
              </div>
              <span className="text-highlight font-semibold text-[11px] bg-highlight/10 px-2 py-0.5 rounded-full">
                ★ {studentProfile.averageRating} Rating
              </span>
            </div>
          )}

          {/* Short Proposal */}
          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Short Proposal & Approach <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              placeholder="Explain how you will complete this project, your timeline, and why you are the ideal student for this task..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 leading-relaxed"
            />
            <p className="text-[10px] text-slate-400 mt-0.5">Tip: Mention specific deliverables and turn-around time.</p>
          </div>

          {/* Relevant Experience */}
          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Relevant Coursework or Past Work
            </label>
            <input
              type="text"
              value={relevantExperience}
              onChange={(e) => setRelevantExperience(e.target.value)}
              placeholder="e.g., Designed cultural fest posters; Built React e-commerce demo"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Portfolio URL */}
            <div>
              <label className="block text-xs font-bold text-navy-800 mb-1">
                Portfolio or GitHub Link
              </label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://yourportfolio.com"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
              />
            </div>

            {/* Optional Attachment */}
            <div>
              <label className="block text-xs font-bold text-navy-800 mb-1">
                Sample Attachment Reference
              </label>
              <input
                type="text"
                value={attachmentName}
                onChange={(e) => setAttachmentName(e.target.value)}
                placeholder="e.g. Design_Sample_Deck.pdf"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
              />
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5 rounded text-accent focus:ring-accent h-4 w-4 border-slate-300"
              />
              <span>
                I confirm I have the required skills and commit to delivering the listed deliverables before the deadline.
              </span>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="accent"
              size="sm"
              isLoading={isSubmitting}
              leftIcon={<Send className="w-3.5 h-3.5" />}
            >
              Submit Application
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
