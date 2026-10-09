import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 
    | 'primary' 
    | 'accent' 
    | 'success' 
    | 'warning' 
    | 'danger' 
    | 'neutral' 
    | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3 py-1.5 text-sm font-semibold',
  };

  const variantClasses = {
    primary: 'bg-navy-800 text-white',
    accent: 'bg-accent/10 text-accent border border-accent/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200/60',
    outline: 'border border-slate-300 text-slate-700 bg-white',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full tracking-wide transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: string; className?: string }> = ({ status, className = '' }) => {
  switch (status.toLowerCase()) {
    case 'open':
      return <Badge variant="accent" className={className}>Open for Applications</Badge>;
    case 'in_progress':
      return <Badge variant="warning" className={className}>In Progress</Badge>;
    case 'submitted':
      return <Badge variant="accent" className={className}>Work Submitted</Badge>;
    case 'revision_requested':
      return <Badge variant="danger" className={className}>Revision Requested</Badge>;
    case 'resubmitted':
      return <Badge variant="warning" className={className}>Resubmitted</Badge>;
    case 'approved':
    case 'completed':
      return <Badge variant="success" className={className}>Completed</Badge>;
    case 'shortlisted':
      return <Badge variant="accent" className={className}>Shortlisted</Badge>;
    case 'accepted':
      return <Badge variant="success" className={className}>Accepted</Badge>;
    case 'rejected':
      return <Badge variant="danger" className={className}>Not Selected</Badge>;
    case 'withdrawn':
      return <Badge variant="neutral" className={className}>Withdrawn</Badge>;
    case 'awaiting_approval':
      return <Badge variant="warning" className={className}>Escrow Reserved</Badge>;
    case 'payment_simulated':
    case 'paid':
      return <Badge variant="success" className={className}>Paid (Simulated)</Badge>;
    default:
      return <Badge variant="neutral" className={className}>{status.replace('_', ' ')}</Badge>;
  }
};
