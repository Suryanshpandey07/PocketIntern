import React, { useState } from 'react';
import { Project } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Star, MessageSquare } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  revieweeId: string;
  revieweeName: string;
  reviewerRole: 'student' | 'business';
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  project,
  revieweeId,
  revieweeName,
  reviewerRole,
}) => {
  const { currentUser } = useAuth();
  const { addReview, hasReviewed } = useData();
  const { success, error } = useToast();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentUser) return null;

  const alreadySubmitted = hasReviewed(project.id, currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      error('Please provide written feedback');
      return;
    }

    setIsSubmitting(true);
    const res = addReview({
      projectId: project.id,
      reviewerId: currentUser.id,
      revieweeId,
      reviewerRole,
      rating,
      comment: comment.trim(),
    });

    setIsSubmitting(false);

    if (res.success) {
      success('Review Submitted!', `Thank you for reviewing ${revieweeName}.`);
      onClose();
    } else {
      error('Review Error', res.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Review ${revieweeName}`}
      description={`Project: "${project.title}"`}
      maxWidth="md"
    >
      {alreadySubmitted ? (
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
          <p className="text-xs font-semibold text-emerald-800">
            You have already submitted a review for this project.
          </p>
          <div className="mt-3">
            <Button size="sm" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Star Rating Selector */}
          <div>
            <label className="block text-xs font-bold text-navy-800 mb-2">
              Overall Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 text-slate-300 hover:scale-110 transition-transform focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm font-bold text-navy-800">
                {hoverRating || rating} / 5
              </span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Feedback & Comments <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                reviewerRole === 'business'
                  ? 'Describe the student speed, deliverable quality, and communication...'
                  : 'Describe how clear the requirements were, payment turnaround, and experience...'
              }
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="accent"
              size="sm"
              isLoading={isSubmitting}
              leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
            >
              Post Review
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
