import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { BusinessSidebar } from '../../components/dashboard/BusinessSidebar';
import { ReviewCard } from '../../components/reviews/ReviewCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Star, MessageSquare } from 'lucide-react';

export const BusinessReviews: React.FC = () => {
  const { currentUser } = useAuth();
  const { reviews } = useData();

  // Reviews given to this business by students
  const reviewsReceived = reviews.filter((r) => r.revieweeId === currentUser?.id);
  // Reviews left by this business
  const reviewsGiven = reviews.filter((r) => r.reviewerId === currentUser?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <BusinessSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div>
            <h1 className="text-2xl font-black text-navy-800 tracking-tight">
              Company Reviews &amp; Student Feedback
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Mutual ratings and performance reviews from completed micro-projects.
            </p>
          </div>

          {/* Reviews Received from Students */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-navy-800 flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Feedback Received from Students ({reviewsReceived.length})</span>
            </h3>

            {reviewsReceived.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-xs text-slate-400">
                No reviews received from students yet. Complete gigs to collect student testimonials!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviewsReceived.map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))}
              </div>
            )}
          </div>

          {/* Reviews Left by You */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-navy-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-accent" />
              <span>Reviews Given to Students ({reviewsGiven.length})</span>
            </h3>

            {reviewsGiven.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-xs text-slate-400">
                You haven't reviewed any students yet. After approving deliverables, leave feedback to help students build proof-of-work.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviewsGiven.map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
