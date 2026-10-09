import React from 'react';
import { Review } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Star, CheckCircle, Clock } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { allUsers } = useAuth();
  const { getProject } = useData();

  const reviewer = allUsers.find((u) => u.id === review.reviewerId);
  const project = getProject(review.projectId);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <img
            src={reviewer?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&q=80'}
            alt={reviewer?.name || 'Reviewer'}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-navy-800">
                {reviewer?.name || 'Verified Member'}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 capitalize">
                {review.reviewerRole}
              </span>
            </div>
            {project && (
              <p className="text-[11px] text-slate-500 truncate max-w-xs sm:max-w-md">
                Project: {project.title}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/60">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-amber-900">{review.rating}.0</span>
        </div>
      </div>

      <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50/60 p-3 rounded-xl border border-slate-100 mb-2">
        &ldquo;{review.comment}&rdquo;
      </p>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-emerald-500" />
          <span>Verified Completed Micro-Project</span>
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {new Date(review.createdAt).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
};
