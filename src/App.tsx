import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Components
import { DemoBar } from './components/common/DemoBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { ExploreProjects } from './pages/public/ExploreProjects';
import { ProjectDetails } from './pages/public/ProjectDetails';
import { HowItWorks } from './pages/public/HowItWorks';
import { PublicPortfolio } from './pages/public/PublicPortfolio';

// Auth Pages
import { SignIn } from './pages/auth/SignIn';
import { Register } from './pages/auth/Register';
import { RoleSelection } from './pages/auth/RoleSelection';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { MyApplications } from './pages/student/MyApplications';
import { MyProjects } from './pages/student/MyProjects';
import { StudentWorkspacePage } from './pages/student/StudentWorkspacePage';
import { StudentEarnings } from './pages/student/StudentEarnings';
import { StudentProfile } from './pages/student/StudentProfile';
import { StudentReviews } from './pages/student/StudentReviews';
import { StudentSettings } from './pages/student/StudentSettings';

// Business Pages
import { BusinessDashboard } from './pages/business/BusinessDashboard';
import { PostProject } from './pages/business/PostProject';
import { EditProject } from './pages/business/EditProject';
import { BusinessProjects } from './pages/business/BusinessProjects';
import { ApplicationsReceived } from './pages/business/ApplicationsReceived';
import { ActiveHires } from './pages/business/ActiveHires';
import { BusinessWorkspacePage } from './pages/business/BusinessWorkspacePage';
import { BusinessReviews } from './pages/business/BusinessReviews';
import { BusinessProfilePage } from './pages/business/BusinessProfilePage';
import { BusinessSettings } from './pages/business/BusinessSettings';

// Admin Page
import { AdminDashboard } from './pages/admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <div className="min-h-screen flex flex-col bg-brandbg text-brandtext antialiased selection:bg-accent/20 selection:text-accent">
              {/* Sticky Demo Quick Switcher & Info Bar */}
              <DemoBar />

              {/* Main Responsive Header */}
              <Navbar />

              {/* Page Content */}
              <main className="flex-1">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/projects" element={<ExploreProjects />} />
                  <Route path="/projects/:projectId" element={<ProjectDetails />} />
                  <Route path="/portfolio/:studentId" element={<PublicPortfolio />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />

                  {/* Auth & Persona Switcher */}
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/role-select" element={<RoleSelection />} />

                  {/* Student Routes */}
                  <Route path="/student/dashboard" element={<StudentDashboard />} />
                  <Route path="/student/applications" element={<MyApplications />} />
                  <Route path="/student/projects" element={<MyProjects />} />
                  <Route path="/student/workspace/:projectId" element={<StudentWorkspacePage />} />
                  <Route path="/student/earnings" element={<StudentEarnings />} />
                  <Route path="/student/profile" element={<StudentProfile />} />
                  <Route path="/student/reviews" element={<StudentReviews />} />
                  <Route path="/student/settings" element={<StudentSettings />} />

                  {/* Business Routes */}
                  <Route path="/business/dashboard" element={<BusinessDashboard />} />
                  <Route path="/business/projects" element={<BusinessProjects />} />
                  <Route path="/business/post-project" element={<PostProject />} />
                  <Route path="/business/edit-project/:projectId" element={<EditProject />} />
                  <Route path="/business/applications" element={<ApplicationsReceived />} />
                  <Route path="/business/hires" element={<ActiveHires />} />
                  <Route path="/business/workspace/:projectId" element={<BusinessWorkspacePage />} />
                  <Route path="/business/reviews" element={<BusinessReviews />} />
                  <Route path="/business/profile" element={<BusinessProfilePage />} />
                  <Route path="/business/settings" element={<BusinessSettings />} />

                  {/* Admin Route */}
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />

                  {/* Catch-all fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />
            </div>
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;
