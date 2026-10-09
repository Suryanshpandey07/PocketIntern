import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StudentSidebar } from '../../components/dashboard/StudentSidebar';
import { ReviewCard } from '../../components/reviews/ReviewCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Star, MessageSquare } from 'lucide-react';

export const StudentReviews: React.FC = () => {
  const { currentUser } = useAuth();
  const { reviews, getStudentProfile } = useData();

  const profile = currentUser ? getStudentProfile(currentUser.id) : undefined;
  const myReviews = reviews.filter((r) => r.revieweeId === currentUser?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <StudentSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-navy-800 tracking-tight">
                Client Reviews &amp; Ratings
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Verified written feedback and performance ratings left by startup founders.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-amber-50 px-3.5 py-2 rounded-2xl border border-amber-200/60 self-start sm:self-auto">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <div>
                <span className="text-sm font-black text-amber-950">
                  {profile?.averageRating || 5.0}
                </span>
                <span className="text-[11px] text-amber-800 ml-1 font-semibold">Average Rating</span>
              </div>
            </div>
          </div>

          {myReviews.length === 0 ? (
            <EmptyState
              icon={<MessageSquare className="w-6 h-6" />}
              title="No client reviews yet"
              description="Complete micro-projects and get approved to earn verified reviews on your public portfolio."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {myReviews.map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
