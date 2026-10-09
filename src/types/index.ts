export type UserRole = 'student' | 'business' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
}

export interface StudentProfile {
  userId: string;
  college: string;
  degree: string;
  year: string; // e.g. "2nd Year"
  location: string; // e.g. "Delhi NCR"
  bio: string;
  skills: string[];
  portfolioUrl: string;
  availability: string; // e.g. "10-15 hrs/week"
  isPortfolioPublic: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
  completedProjectsCount: number;
  averageRating: number;
  totalEarnings: number;
}

export interface BusinessProfile {
  userId: string;
  businessName: string;
  tagline: string;
  description: string;
  industry: string;
  website: string;
  location: string;
  logo: string;
  verified: boolean;
  projectsPostedCount: number;
  totalSpent: number;
}

export type ProjectCategory = 
  | 'Design'
  | 'Data Analytics'
  | 'Technology'
  | 'Content'
  | 'Marketing'
  | 'Video & Media'
  | 'Research';

export type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface Project {
  id: string;
  businessId: string;
  title: string;
  description: string;
  category: ProjectCategory;
  skills: string[];
  deliverables: string[];
  budget: number; // In INR (₹)
  duration: string; // e.g., "3 days", "1 week"
  applicationDeadline: string;
  projectDeadline: string;
  status: ProjectStatus;
  openings: number;
  isRemote: boolean;
  location?: string;
  additionalInstructions?: string;
  createdAt: string;
  assignedStudentId?: string;
}

export type ApplicationStatus = 'pending' | 'shortlisted' | 'accepted' | 'rejected' | 'withdrawn';

export interface Application {
  id: string;
  projectId: string;
  studentId: string;
  proposal: string;
  relevantSkills: string[];
  relevantExperience: string;
  portfolioUrl: string;
  attachmentName?: string;
  status: ApplicationStatus;
  createdAt: string;
  reviewedAt?: string;
}

export type AssignmentStatus = 
  | 'in_progress' 
  | 'submitted' 
  | 'revision_requested' 
  | 'resubmitted' 
  | 'approved' 
  | 'completed';

export interface ProjectAssignment {
  id: string;
  projectId: string;
  studentId: string;
  businessId: string;
  status: AssignmentStatus;
  startedAt: string;
  completedAt?: string;
  deliverablesChecklist?: { id: string; title: string; completed: boolean }[];
}

export interface Submission {
  id: string;
  assignmentId: string;
  projectId: string;
  studentId: string;
  description: string;
  attachmentUrl?: string;
  attachmentName?: string;
  externalLink?: string;
  revisionNumber: number;
  submittedAt: string;
  feedback?: string;
  status: 'pending_review' | 'revision_requested' | 'approved';
}

export type PaymentStatus = 'awaiting_approval' | 'approved' | 'payment_simulated' | 'completed';

export interface Payment {
  id: string;
  projectId: string;
  studentId: string;
  businessId: string;
  amount: number; // In INR
  status: PaymentStatus;
  createdAt: string;
  completedAt?: string;
  referenceNumber: string;
  description: string;
}

export interface Review {
  id: string;
  projectId: string;
  reviewerId: string;
  revieweeId: string;
  reviewerRole: 'student' | 'business';
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  isDemo?: boolean;
}

export type NotificationType = 
  | 'application' 
  | 'shortlist'
  | 'hire' 
  | 'submission' 
  | 'revision' 
  | 'approval' 
  | 'payment' 
  | 'review' 
  | 'system';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
  type: NotificationType;
}

export interface Bookmark {
  id: string;
  studentId: string;
  projectId: string;
  createdAt: string;
}
