import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Project,
  Application,
  ProjectAssignment,
  Submission,
  Payment,
  Review,
  StudentProfile,
  BusinessProfile,
  Notification,
  Bookmark,
  User
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PROJECTS,
  INITIAL_APPLICATIONS,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_PAYMENTS,
  INITIAL_REVIEWS,
  INITIAL_STUDENT_PROFILES,
  INITIAL_BUSINESS_PROFILES,
  INITIAL_NOTIFICATIONS,
  INITIAL_BOOKMARKS
} from '../data/seedData';

interface DataContextType {
  // State
  projects: Project[];
  applications: Application[];
  assignments: ProjectAssignment[];
  submissions: Submission[];
  payments: Payment[];
  reviews: Review[];
  studentProfiles: StudentProfile[];
  businessProfiles: BusinessProfile[];
  notifications: Notification[];
  bookmarks: Bookmark[];
  allUsers: User[];
  getUser: (userId: string) => User | undefined;

  // Project Methods
  addProject: (data: Omit<Project, 'id' | 'createdAt' | 'status'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  getProject: (id: string) => Project | undefined;
  
  // Application Methods
  submitApplication: (
    projectId: string,
    studentId: string,
    details: { proposal: string; relevantSkills: string[]; relevantExperience: string; portfolioUrl: string; attachmentName?: string }
  ) => { success: boolean; message?: string };
  shortlistApplication: (applicationId: string) => void;
  acceptApplication: (applicationId: string) => void;
  rejectApplication: (applicationId: string) => void;
  withdrawApplication: (applicationId: string) => void;
  getApplicationByProjectAndStudent: (projectId: string, studentId: string) => Application | undefined;

  // Assignment & Submission Methods
  getAssignmentByProject: (projectId: string) => ProjectAssignment | undefined;
  getSubmissionsByAssignment: (assignmentId: string) => Submission[];
  submitWork: (
    assignmentId: string,
    data: { description: string; attachmentUrl?: string; attachmentName?: string; externalLink?: string }
  ) => void;
  requestRevision: (assignmentId: string, feedback: string) => void;
  approveWork: (assignmentId: string) => void;
  toggleChecklistItem: (assignmentId: string, itemId: string) => void;

  // Review Methods
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => { success: boolean; message?: string };
  hasReviewed: (projectId: string, reviewerId: string) => boolean;

  // Profile Methods
  getStudentProfile: (userId: string) => StudentProfile | undefined;
  getBusinessProfile: (userId: string) => BusinessProfile | undefined;
  updateStudentProfile: (userId: string, updates: Partial<StudentProfile>) => void;
  updateBusinessProfile: (userId: string, updates: Partial<BusinessProfile>) => void;

  // Bookmark Methods
  toggleBookmark: (studentId: string, projectId: string) => void;
  isBookmarked: (studentId: string, projectId: string) => boolean;

  // Notification Methods
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: (userId: string) => void;
  addNotification: (notif: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;

  // Reset
  resetToSeedData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'pocketintern_projects',
  APPLICATIONS: 'pocketintern_applications',
  ASSIGNMENTS: 'pocketintern_assignments',
  SUBMISSIONS: 'pocketintern_submissions',
  PAYMENTS: 'pocketintern_payments',
  REVIEWS: 'pocketintern_reviews',
  STUDENT_PROFILES: 'pocketintern_student_profiles',
  BUSINESS_PROFILES: 'pocketintern_business_profiles',
  NOTIFICATIONS: 'pocketintern_notifications',
  BOOKMARKS: 'pocketintern_bookmarks',
};

function getStoredOrDefault<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS)
  );
  const [applications, setApplications] = useState<Application[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS)
  );
  const [assignments, setAssignments] = useState<ProjectAssignment[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.ASSIGNMENTS, INITIAL_ASSIGNMENTS)
  );
  const [submissions, setSubmissions] = useState<Submission[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.SUBMISSIONS, INITIAL_SUBMISSIONS)
  );
  const [payments, setPayments] = useState<Payment[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS)
  );
  const [reviews, setReviews] = useState<Review[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS)
  );
  const [studentProfiles, setStudentProfiles] = useState<StudentProfile[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.STUDENT_PROFILES, INITIAL_STUDENT_PROFILES)
  );
  const [businessProfiles, setBusinessProfiles] = useState<BusinessProfile[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.BUSINESS_PROFILES, INITIAL_BUSINESS_PROFILES)
  );
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS)
  );
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.BOOKMARKS, INITIAL_BOOKMARKS)
  );
  const [allUsers] = useState<User[]>(INITIAL_USERS);
  const getUser = (userId: string) => allUsers.find((u) => u.id === userId);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
  }, [assignments]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  }, [payments]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILES, JSON.stringify(studentProfiles));
  }, [studentProfiles]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUSINESS_PROFILES, JSON.stringify(businessProfiles));
  }, [businessProfiles]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Notifications helper
  const addNotification = (notif: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotif: Notification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsAsRead = (userId: string) => {
    setNotifications((prev) => prev.map((n) => (n.userId === userId ? { ...n, isRead: true } : n)));
  };

  // Project Operations
  const addProject = (data: Omit<Project, 'id' | 'createdAt' | 'status'>): Project => {
    const newProject: Project = {
      ...data,
      id: `proj-${Date.now()}`,
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    setProjects((prev) => [newProject, ...prev]);

    // Update business profile project count
    setBusinessProfiles((prev) =>
      prev.map((bp) =>
        bp.userId === data.businessId
          ? { ...bp, projectsPostedCount: bp.projectsPostedCount + 1 }
          : bp
      )
    );

    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const getProject = (id: string) => projects.find((p) => p.id === id);

  // Application Operations
  const getApplicationByProjectAndStudent = (projectId: string, studentId: string) => {
    return applications.find((a) => a.projectId === projectId && a.studentId === studentId);
  };

  const submitApplication = (
    projectId: string,
    studentId: string,
    details: { proposal: string; relevantSkills: string[]; relevantExperience: string; portfolioUrl: string; attachmentName?: string }
  ) => {
    const existing = getApplicationByProjectAndStudent(projectId, studentId);
    if (existing && existing.status !== 'withdrawn') {
      return { success: false, message: 'You have already submitted an active application for this project.' };
    }

    const project = getProject(projectId);
    if (!project || project.status !== 'open') {
      return { success: false, message: 'This project is not open for applications.' };
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      projectId,
      studentId,
      ...details,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setApplications((prev) => [newApp, ...prev]);

    // Notify Business
    addNotification({
      userId: project.businessId,
      title: 'New Project Application Received',
      message: `A student submitted an application for "${project.title}".`,
      link: `/business/applications`,
      type: 'application',
    });

    return { success: true };
  };

  const shortlistApplication = (applicationId: string) => {
    const app = applications.find((a) => a.id === applicationId);
    if (!app) return;

    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status: 'shortlisted' } : a))
    );

    const project = getProject(app.projectId);
    addNotification({
      userId: app.studentId,
      title: 'Application Shortlisted!',
      message: `Your application for "${project?.title || 'a project'}" has been shortlisted.`,
      link: '/student/applications',
      type: 'shortlist',
    });
  };

  const acceptApplication = (applicationId: string) => {
    const app = applications.find((a) => a.id === applicationId);
    if (!app) return;

    const project = getProject(app.projectId);
    if (!project) return;

    // 1. Accept this application and reject others for this project
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === applicationId) return { ...a, status: 'accepted', reviewedAt: new Date().toISOString() };
        if (a.projectId === app.projectId && a.status === 'pending') {
          return { ...a, status: 'rejected', reviewedAt: new Date().toISOString() };
        }
        return a;
      })
    );

    // 2. Update Project to in_progress & assignedStudentId
    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id
          ? { ...p, status: 'in_progress', assignedStudentId: app.studentId }
          : p
      )
    );

    // 3. Create Deliverables Checklist & Assignment
    const deliverablesList = (project.deliverables || ['Complete project requirements']).map((d, index) => ({
      id: `del-${Date.now()}-${index}`,
      title: d,
      completed: false,
    }));

    const newAssignment: ProjectAssignment = {
      id: `assign-${Date.now()}`,
      projectId: project.id,
      studentId: app.studentId,
      businessId: project.businessId,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      deliverablesChecklist: deliverablesList,
    };

    setAssignments((prev) => [newAssignment, ...prev]);

    // 4. Create Simulated Escrow Payment Record
    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      projectId: project.id,
      studentId: app.studentId,
      businessId: project.businessId,
      amount: project.budget,
      status: 'awaiting_approval',
      createdAt: new Date().toISOString(),
      referenceNumber: `PI-ESCROW-${Date.now().toString().slice(-6)}`,
      description: `Escrow reserved for "${project.title}"`,
    };

    setPayments((prev) => [newPayment, ...prev]);

    // 5. Notify Student
    addNotification({
      userId: app.studentId,
      title: '🎉 You were hired!',
      message: `Congratulations! Your application for "${project.title}" was accepted. You can start working now in your Project Workspace.`,
      link: `/student/workspace/${project.id}`,
      type: 'hire',
    });
  };

  const rejectApplication = (applicationId: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status: 'rejected', reviewedAt: new Date().toISOString() } : a))
    );
  };

  const withdrawApplication = (applicationId: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status: 'withdrawn' } : a))
    );
  };

  // Workspace Operations
  const getAssignmentByProject = (projectId: string) => {
    return assignments.find((a) => a.projectId === projectId);
  };

  const getSubmissionsByAssignment = (assignmentId: string) => {
    return submissions.filter((s) => s.assignmentId === assignmentId).sort((a, b) => b.revisionNumber - a.revisionNumber);
  };

  const toggleChecklistItem = (assignmentId: string, itemId: string) => {
    setAssignments((prev) =>
      prev.map((assign) => {
        if (assign.id !== assignmentId || !assign.deliverablesChecklist) return assign;
        return {
          ...assign,
          deliverablesChecklist: assign.deliverablesChecklist.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
        };
      })
    );
  };

  const submitWork = (
    assignmentId: string,
    data: { description: string; attachmentUrl?: string; attachmentName?: string; externalLink?: string }
  ) => {
    const assign = assignments.find((a) => a.id === assignmentId);
    if (!assign) return;

    const previousSubs = submissions.filter((s) => s.assignmentId === assignmentId);
    const revisionNumber = previousSubs.length + 1;
    const isResubmission = assign.status === 'revision_requested';

    const newSub: Submission = {
      id: `sub-${Date.now()}`,
      assignmentId,
      projectId: assign.projectId,
      studentId: assign.studentId,
      description: data.description,
      attachmentUrl: data.attachmentUrl,
      attachmentName: data.attachmentName,
      externalLink: data.externalLink,
      revisionNumber,
      submittedAt: new Date().toISOString(),
      status: 'pending_review',
    };

    setSubmissions((prev) => [newSub, ...prev]);

    // Update assignment status
    setAssignments((prev) =>
      prev.map((a) => (a.id === assignmentId ? { ...a, status: isResubmission ? 'resubmitted' : 'submitted' } : a))
    );

    const project = getProject(assign.projectId);

    // Notify Business
    addNotification({
      userId: assign.businessId,
      title: isResubmission ? 'Deliverable Resubmitted' : 'New Deliverable Submitted',
      message: `Work has been submitted for "${project?.title}". Please review the submission in your workspace.`,
      link: `/business/workspace/${assign.projectId}`,
      type: 'submission',
    });
  };

  const requestRevision = (assignmentId: string, feedback: string) => {
    const assign = assignments.find((a) => a.id === assignmentId);
    if (!assign) return;

    setAssignments((prev) =>
      prev.map((a) => (a.id === assignmentId ? { ...a, status: 'revision_requested' } : a))
    );

    // Update latest submission with feedback
    const latestSub = submissions
      .filter((s) => s.assignmentId === assignmentId)
      .sort((a, b) => b.revisionNumber - a.revisionNumber)[0];

    if (latestSub) {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === latestSub.id ? { ...s, feedback, status: 'revision_requested' } : s))
      );
    }

    const project = getProject(assign.projectId);

    // Notify student
    addNotification({
      userId: assign.studentId,
      title: 'Revision Requested on Project',
      message: `Feedback provided: "${feedback}". Please make updates and resubmit.`,
      link: `/student/workspace/${assign.projectId}`,
      type: 'revision',
    });
  };

  const approveWork = (assignmentId: string) => {
    const assign = assignments.find((a) => a.id === assignmentId);
    if (!assign) return;

    const project = getProject(assign.projectId);
    if (!project) return;

    const completedTime = new Date().toISOString();

    // 1. Mark assignment as completed
    setAssignments((prev) =>
      prev.map((a) => (a.id === assignmentId ? { ...a, status: 'completed', completedAt: completedTime } : a))
    );

    // 2. Update latest submission as approved
    const latestSub = submissions
      .filter((s) => s.assignmentId === assignmentId)
      .sort((a, b) => b.revisionNumber - a.revisionNumber)[0];

    if (latestSub) {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === latestSub.id ? { ...s, status: 'approved' } : s))
      );
    }

    // 3. Mark project completed
    setProjects((prev) =>
      prev.map((p) => (p.id === assign.projectId ? { ...p, status: 'completed' } : p))
    );

    // 4. Update payment status to completed
    setPayments((prev) =>
      prev.map((pay) =>
        pay.projectId === assign.projectId
          ? {
              ...pay,
              status: 'completed',
              completedAt: completedTime,
              description: `Completed payment for "${project.title}"`,
            }
          : pay
      )
    );

    // 5. Update Student profile metrics
    setStudentProfiles((prev) =>
      prev.map((sp) =>
        sp.userId === assign.studentId
          ? {
              ...sp,
              completedProjectsCount: sp.completedProjectsCount + 1,
              totalEarnings: sp.totalEarnings + project.budget,
            }
          : sp
      )
    );

    // 6. Update Business profile metrics
    setBusinessProfiles((prev) =>
      prev.map((bp) =>
        bp.userId === assign.businessId
          ? { ...bp, totalSpent: bp.totalSpent + project.budget }
          : bp
      )
    );

    // 7. Notify Student
    addNotification({
      userId: assign.studentId,
      title: '🎉 Project Approved & Payment Released!',
      message: `Your work for "${project.title}" has been approved! ₹${project.budget.toLocaleString('en-IN')} has been added to your simulated earnings. Please leave a review!`,
      link: `/student/earnings`,
      type: 'payment',
    });
  };

  // Reviews
  const hasReviewed = (projectId: string, reviewerId: string) => {
    return reviews.some((r) => r.projectId === projectId && r.reviewerId === reviewerId);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    if (hasReviewed(reviewData.projectId, reviewData.reviewerId)) {
      return { success: false, message: 'You have already submitted a review for this project.' };
    }

    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setReviews((prev) => [newRev, ...prev]);

    // Recalculate average rating for reviewee
    if (reviewData.reviewerRole === 'business') {
      // Reviewee is student
      const studentRevs = [...reviews.filter((r) => r.revieweeId === reviewData.revieweeId), newRev];
      const avg = studentRevs.reduce((acc, curr) => acc + curr.rating, 0) / studentRevs.length;
      setStudentProfiles((prev) =>
        prev.map((sp) =>
          sp.userId === reviewData.revieweeId ? { ...sp, averageRating: Math.round(avg * 10) / 10 } : sp
        )
      );
    }

    // Notify reviewee
    addNotification({
      userId: reviewData.revieweeId,
      title: 'New Review Received!',
      message: `You received a ${reviewData.rating}-star review for your completed project.`,
      link: reviewData.reviewerRole === 'business' ? '/student/reviews' : '/business/reviews',
      type: 'review',
    });

    return { success: true };
  };

  // Profiles
  const getStudentProfile = (userId: string) => studentProfiles.find((sp) => sp.userId === userId);
  const getBusinessProfile = (userId: string) => businessProfiles.find((bp) => bp.userId === userId);

  const updateStudentProfile = (userId: string, updates: Partial<StudentProfile>) => {
    setStudentProfiles((prev) =>
      prev.map((sp) => (sp.userId === userId ? { ...sp, ...updates } : sp))
    );
  };

  const updateBusinessProfile = (userId: string, updates: Partial<BusinessProfile>) => {
    setBusinessProfiles((prev) =>
      prev.map((bp) => (bp.userId === userId ? { ...bp, ...updates } : bp))
    );
  };

  // Bookmarks
  const toggleBookmark = (studentId: string, projectId: string) => {
    setBookmarks((prev) => {
      const exists = prev.find((b) => b.studentId === studentId && b.projectId === projectId);
      if (exists) {
        return prev.filter((b) => b.id !== exists.id);
      } else {
        return [...prev, { id: `bm-${Date.now()}`, studentId, projectId, createdAt: new Date().toISOString() }];
      }
    });
  };

  const isBookmarked = (studentId: string, projectId: string) => {
    return bookmarks.some((b) => b.studentId === studentId && b.projectId === projectId);
  };

  // Reset to Seed
  const resetToSeedData = () => {
    setProjects(INITIAL_PROJECTS);
    setApplications(INITIAL_APPLICATIONS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setPayments(INITIAL_PAYMENTS);
    setReviews(INITIAL_REVIEWS);
    setStudentProfiles(INITIAL_STUDENT_PROFILES);
    setBusinessProfiles(INITIAL_BUSINESS_PROFILES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setBookmarks(INITIAL_BOOKMARKS);

    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        applications,
        assignments,
        submissions,
        payments,
        reviews,
        studentProfiles,
        businessProfiles,
        notifications,
        bookmarks,
        allUsers,
        getUser,
        addProject,
        updateProject,
        getProject,
        submitApplication,
        shortlistApplication,
        acceptApplication,
        rejectApplication,
        withdrawApplication,
        getApplicationByProjectAndStudent,
        getAssignmentByProject,
        getSubmissionsByAssignment,
        submitWork,
        requestRevision,
        approveWork,
        toggleChecklistItem,
        addReview,
        hasReviewed,
        getStudentProfile,
        getBusinessProfile,
        updateStudentProfile,
        updateBusinessProfile,
        toggleBookmark,
        isBookmarked,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        resetToSeedData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
