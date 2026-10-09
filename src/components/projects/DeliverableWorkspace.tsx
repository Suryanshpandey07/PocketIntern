import React, { useState } from 'react';
import { Project, ProjectAssignment, Submission } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { ReviewModal } from '../reviews/ReviewModal';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Upload, 
  ExternalLink, 
  FileText, 
  ArrowRight, 
  CheckSquare, 
  Square, 
  IndianRupee, 
  ShieldCheck, 
  RotateCcw, 
  ThumbsUp, 
  Star,
  MessageSquare
} from 'lucide-react';

interface DeliverableWorkspaceProps {
  project: Project;
  assignment: ProjectAssignment;
}

export const DeliverableWorkspace: React.FC<DeliverableWorkspaceProps> = ({
  project,
  assignment,
}) => {
  const { currentUser, isStudent, isBusiness } = useAuth();
  const { 
    getSubmissionsByAssignment, 
    submitWork, 
    requestRevision, 
    approveWork, 
    toggleChecklistItem,
    getStudentProfile,
    getBusinessProfile,
    hasReviewed,
    allUsers
  } = useData();
  const { success, error, info } = useToast();

  const submissions = getSubmissionsByAssignment(assignment.id);
  const latestSubmission = submissions[0];

  const studentUser = allUsers.find((u) => u.id === assignment.studentId);
  const studentProfile = getStudentProfile(assignment.studentId);
  const businessProfile = getBusinessProfile(assignment.businessId);

  // Student Submission form state
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submissionLink, setSubmissionLink] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Revision modal state
  const [revisionModalOpen, setRevisionModalOpen] = useState(false);
  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [isRequestingRevision, setIsRequestingRevision] = useState(false);

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Lifecycle steps
  const steps = [
    { label: 'Assigned', active: true, done: true },
    { 
      label: 'In Progress', 
      active: assignment.status === 'in_progress', 
      done: ['submitted', 'revision_requested', 'resubmitted', 'approved', 'completed'].includes(assignment.status) 
    },
    { 
      label: 'Submitted', 
      active: assignment.status === 'submitted' || assignment.status === 'resubmitted', 
      done: ['approved', 'completed'].includes(assignment.status) 
    },
    { 
      label: 'Completed & Paid', 
      active: assignment.status === 'completed' || assignment.status === 'approved', 
      done: assignment.status === 'completed' || assignment.status === 'approved' 
    },
  ];

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionNotes.trim()) {
      error('Please write a brief summary of what you completed.');
      return;
    }

    setIsSubmitting(true);
    try {
      submitWork(assignment.id, {
        description: submissionNotes.trim(),
        attachmentName: attachmentName.trim() || 'Deliverable_Package.zip',
        externalLink: submissionLink.trim() || undefined,
      });

      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch (e) {}

      success('Deliverable Submitted!', 'The business has been notified to review your work.');
      setSubmissionNotes('');
      setSubmissionLink('');
      setAttachmentName('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionFeedback.trim()) {
      error('Please specify what changes are needed.');
      return;
    }

    setIsRequestingRevision(true);
    try {
      requestRevision(assignment.id, revisionFeedback.trim());
      success('Revision Requested', 'Feedback has been sent to the student.');
      setRevisionModalOpen(false);
      setRevisionFeedback('');
    } finally {
      setIsRequestingRevision(false);
    }
  };

  const handleApprove = () => {
    if (window.confirm(`Approve deliverables and release simulated payout of ₹${project.budget.toLocaleString('en-IN')} to ${studentUser?.name || 'the student'}?`)) {
      approveWork(assignment.id);
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
      success('Work Approved & Completed!', `Payment of ₹${project.budget.toLocaleString('en-IN')} has been released.`);
    }
  };

  const userHasReviewed = currentUser ? hasReviewed(project.id, currentUser.id) : false;

  return (
    <div className="space-y-6">
      {/* Top Banner: Project Title & Lifecycle */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {project.category}
              </span>
              <StatusBadge status={assignment.status} />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-navy-800 tracking-tight">
              {project.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Started {new Date(assignment.startedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between sm:justify-end gap-6 flex-shrink-0">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Stipend Amount</span>
              <span className="text-xl font-extrabold text-navy-800">
                ₹{project.budget.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Escrow Secured</span>
            </div>
          </div>
        </div>

        {/* Visual Lifecycle Stepper */}
        <div className="pt-5">
          <div className="flex items-center justify-between relative max-w-2xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step.done
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : step.active
                      ? 'bg-accent text-white ring-4 ring-accent/20'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className={`text-[11px] mt-2 font-medium ${step.done || step.active ? 'text-navy-800 font-semibold' : 'text-slate-400'}`}>
                  {step.label}
                </span>
              </div>
            ))}
            {/* Connecting Bar */}
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 -z-0"></div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details & Deliverables on left, Actions & Submissions on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Deliverables Checklist & Participants */}
        <div className="space-y-6">
          {/* Deliverables Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle">
            <h3 className="text-sm font-bold text-navy-800 mb-3 flex items-center justify-between">
              <span>Required Deliverables</span>
              <span className="text-xs text-slate-400 font-normal">
                {assignment.deliverablesChecklist?.filter((d) => d.completed).length || 0} of{' '}
                {assignment.deliverablesChecklist?.length || 0} completed
              </span>
            </h3>

            <div className="space-y-2.5">
              {assignment.deliverablesChecklist?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(assignment.id, item.id)}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-3 cursor-pointer transition-colors ${
                    item.completed
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-700'
                      : 'bg-slate-50/50 border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <button className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-accent">
                    {item.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  <span className={item.completed ? 'line-through text-slate-400' : 'font-medium'}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Participants Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-navy-800">Project Parties</h3>
            
            {/* Business */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <img
                src={businessProfile?.logo || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=128&q=80'}
                alt={businessProfile?.businessName || 'Business'}
                className="w-9 h-9 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Hiring Business</span>
                <p className="text-xs font-bold text-navy-800 truncate">{businessProfile?.businessName || 'Business'}</p>
                <p className="text-[11px] text-slate-500 truncate">{businessProfile?.location}</p>
              </div>
            </div>

            {/* Student */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <img
                src={studentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=128&q=80'}
                alt={studentUser?.name || 'Student'}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Selected Student</span>
                <p className="text-xs font-bold text-navy-800 truncate">{studentUser?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{studentProfile?.college}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (2 cols): Submission History & Action Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submission and Action Box */}
          {assignment.status !== 'completed' && assignment.status !== 'approved' ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-navy-800 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-accent" />
                  <span>
                    {assignment.status === 'revision_requested' ? 'Resubmit Deliverable' : 'Deliverable Submission'}
                  </span>
                </h3>
                <span className="text-xs text-slate-500">
                  Revision #{submissions.length + 1}
                </span>
              </div>

              {/* Notice for revision */}
              {assignment.status === 'revision_requested' && latestSubmission?.feedback && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Business Feedback on Revision #{latestSubmission.revisionNumber}:</span>
                  </div>
                  <p className="pl-5 italic leading-relaxed text-amber-800 font-medium">
                    &ldquo;{latestSubmission.feedback}&rdquo;
                  </p>
                </div>
              )}

              {/* Student Submit Form */}
              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Deliverable Description & Notes <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    placeholder="Describe what you completed, links to preview files, test cases passed, or changes made..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-navy-800 mb-1">
                      External Deliverable Link (Loom, Drive, GitHub, Figma)
                    </label>
                    <input
                      type="url"
                      value={submissionLink}
                      onChange={(e) => setSubmissionLink(e.target.value)}
                      placeholder="https://drive.google.com/..."
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-800 mb-1">
                      File / Archive Reference Name
                    </label>
                    <input
                      type="text"
                      value={attachmentName}
                      onChange={(e) => setAttachmentName(e.target.value)}
                      placeholder="e.g. Completed_Deliverables_v2.zip"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    The business will be notified immediately upon submission.
                  </span>
                  <Button
                    type="submit"
                    variant="accent"
                    size="sm"
                    isLoading={isSubmitting}
                    leftIcon={<Upload className="w-3.5 h-3.5" />}
                  >
                    {assignment.status === 'revision_requested' ? 'Submit Revisions' : 'Submit Work for Review'}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            /* Completed Banner */
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-emerald-950">
                Project Completed & Stipend Approved!
              </h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                The business approved all submitted deliverables. Simulated payment of ₹{project.budget.toLocaleString('en-IN')} has been released to the student's earnings account.
              </p>

              {/* Review prompt */}
              <div className="pt-2">
                {userHasReviewed ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>You have submitted your review for this project.</span>
                  </span>
                ) : (
                  <Button
                    variant="accent"
                    size="sm"
                    leftIcon={<Star className="w-4 h-4 fill-white" />}
                    onClick={() => setReviewModalOpen(true)}
                  >
                    Leave a Review
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Business Review Controls (If work has been submitted) */}
          {(assignment.status === 'submitted' || assignment.status === 'resubmitted') && (
            <div className="bg-navy-900 text-white rounded-2xl p-5 shadow-lg border border-navy-800 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-highlight" />
                    <span>Business Approval Controls</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Student has submitted work for Revision #{latestSubmission?.revisionNumber}. You can request revisions or approve and release the ₹{project.budget.toLocaleString('en-IN')} stipend.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-navy-800 text-slate-200 border-navy-700 hover:bg-navy-700"
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  onClick={() => setRevisionModalOpen(true)}
                >
                  Request Revisions
                </Button>

                <Button
                  variant="accent"
                  size="sm"
                  className="bg-highlight hover:bg-highlight-hover text-navy-950 font-bold"
                  leftIcon={<CheckCircle2 className="w-4 h-4 text-navy-950" />}
                  onClick={handleApprove}
                >
                  Approve Work & Release ₹{project.budget.toLocaleString('en-IN')}
                </Button>
              </div>
            </div>
          )}

          {/* Submissions & Revision History Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-navy-800 flex items-center justify-between">
              <span>Submission History</span>
              <span className="text-xs text-slate-400 font-normal">
                {submissions.length} {submissions.length === 1 ? 'record' : 'records'}
              </span>
            </h3>

            {submissions.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                No submissions uploaded yet.
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-slate-100">
                {submissions.map((sub) => (
                  <div key={sub.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-navy-800">
                          Revision #{sub.revisionNumber}
                        </span>
                        <StatusBadge status={sub.status} />
                      </div>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(sub.submittedAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50/70 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      {sub.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                      {sub.attachmentName && (
                        <div className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-[11px]">{sub.attachmentName}</span>
                        </div>
                      )}
                      {sub.externalLink && (
                        <a
                          href={sub.externalLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-accent hover:underline font-medium text-[11px]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Deliverable Link</span>
                        </a>
                      )}
                    </div>

                    {sub.feedback && (
                      <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs space-y-1">
                        <span className="font-bold flex items-center gap-1 text-[11px] text-amber-800">
                          <MessageSquare className="w-3 h-3" />
                          Business Feedback:
                        </span>
                        <p className="italic text-amber-800 leading-relaxed">
                          &ldquo;{sub.feedback}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Revision Request Modal */}
      <Modal
        isOpen={revisionModalOpen}
        onClose={() => setRevisionModalOpen(false)}
        title="Request Revisions from Student"
        description="Provide specific, actionable feedback explaining what needs to be changed or added."
        maxWidth="md"
      >
        <form onSubmit={handleRequestRevisionSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Required Changes & Feedback <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={revisionFeedback}
              onChange={(e) => setRevisionFeedback(e.target.value)}
              placeholder="e.g. Please format table columns, fix responsive layout on iOS Safari, or add missing slides..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setRevisionModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="accent"
              size="sm"
              isLoading={isRequestingRevision}
            >
              Send Revision Request
            </Button>
          </div>
        </form>
      </Modal>

      {/* Mutual Review Modal */}
      {reviewModalOpen && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          project={project}
          revieweeId={isStudent ? assignment.businessId : assignment.studentId}
          revieweeName={isStudent ? (businessProfile?.businessName || 'Business') : (studentUser?.name || 'Student')}
          reviewerRole={isStudent ? 'student' : 'business'}
        />
      )}
    </div>
  );
};
