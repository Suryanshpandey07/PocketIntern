import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NotificationDropdown } from './NotificationDropdown';
import { 
  Briefcase, 
  Menu, 
  X, 
  PlusCircle, 
  GraduationCap, 
  Building2, 
  LogOut, 
  Compass, 
  FolderKanban, 
  IndianRupee, 
  User as UserIcon,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { Badge } from './Badge';

export const Navbar: React.FC = () => {
  const { currentUser, currentRole, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200/80 sticky top-[29px] z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-navy-800 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-lg tracking-tighter text-highlight">P</span>
                <span className="font-extrabold text-sm text-accent -ml-0.5">I</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-navy-800 tracking-tight leading-none">
                  Pocket<span className="text-accent">Intern</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                  Real Projects. Real Pay.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <Link
                to="/projects"
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive('/projects')
                    ? 'text-accent bg-accent/5 font-semibold'
                    : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Explore Projects</span>
              </Link>

              <Link
                to="/how-it-works"
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive('/how-it-works')
                    ? 'text-accent bg-accent/5 font-semibold'
                    : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>How It Works</span>
              </Link>

              {/* Role-Specific primary links */}
              {currentRole === 'student' && (
                <>
                  <Link
                    to="/student/dashboard"
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive('/student/dashboard')
                        ? 'text-accent bg-accent/5 font-semibold'
                        : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/student/applications"
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive('/student/applications')
                        ? 'text-accent bg-accent/5 font-semibold'
                        : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                    }`}
                  >
                    Applications
                  </Link>
                  <Link
                    to="/student/projects"
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive('/student/projects')
                        ? 'text-accent bg-accent/5 font-semibold'
                        : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                    }`}
                  >
                    My Projects
                  </Link>
                  <Link
                    to="/student/earnings"
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive('/student/earnings')
                        ? 'text-accent bg-accent/5 font-semibold'
                        : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>Earnings</span>
                  </Link>
                </>
              )}

              {currentRole === 'business' && (
                <>
                  <Link
                    to="/business/dashboard"
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive('/business/dashboard')
                        ? 'text-accent bg-accent/5 font-semibold'
                        : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/business/projects"
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive('/business/projects')
                        ? 'text-accent bg-accent/5 font-semibold'
                        : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                    }`}
                  >
                    My Postings
                  </Link>
                  <Link
                    to="/business/applications"
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive('/business/applications')
                        ? 'text-accent bg-accent/5 font-semibold'
                        : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                    }`}
                  >
                    Applications
                  </Link>
                </>
              )}

              {currentRole === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/admin/dashboard')
                      ? 'text-accent bg-accent/5 font-semibold'
                      : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-accent" />
                  <span>Admin Console</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Action Button */}
            {currentRole === 'business' && (
              <Link
                to="/business/post-project"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors shadow-subtle"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Project</span>
              </Link>
            )}

            {currentRole === 'student' && (
              <Link
                to="/projects"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors shadow-subtle"
              >
                <Compass className="w-4 h-4" />
                <span>Find Projects</span>
              </Link>
            )}

            {/* Notification Center */}
            <NotificationDropdown />

            {/* User Profile / Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
              >
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-navy-800 leading-tight">
                    {currentUser?.name}
                  </span>
                  <span className="text-[10px] text-slate-500 capitalize">
                    {currentUser?.role}
                  </span>
                </div>
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-navy-800 truncate">{currentUser?.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                    <div className="mt-1">
                      <Badge variant={currentRole === 'student' ? 'accent' : 'primary'} size="sm">
                        {currentRole.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="py-1">
                    {currentRole === 'student' ? (
                      <>
                        <Link
                          to="/student/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>My Portfolio & Profile</span>
                        </Link>
                        <Link
                          to="/student/earnings"
                          onClick={() => setUserMenuOpen(false)}
                          className="px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                          <span>Earnings & Payouts</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/business/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>Company Profile</span>
                        </Link>
                        <Link
                          to="/business/projects"
                          onClick={() => setUserMenuOpen(false)}
                          className="px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <FolderKanban className="w-3.5 h-3.5 text-slate-400" />
                          <span>Manage Projects</span>
                        </Link>
                      </>
                    )}

                    <div className="my-1 border-t border-slate-100"></div>

                    <div className="px-4 py-1.5 text-[10px] font-semibold text-slate-400 uppercase">
                      Switch Role
                    </div>
                    <button
                      onClick={() => {
                        switchRole('student');
                        setUserMenuOpen(false);
                        navigate('/student/dashboard');
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-accent" />
                      <span>Student View</span>
                    </button>
                    <button
                      onClick={() => {
                        switchRole('business');
                        setUserMenuOpen(false);
                        navigate('/business/dashboard');
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-highlight" />
                      <span>Business View</span>
                    </button>

                    <div className="my-1 border-t border-slate-100"></div>

                    <Link
                      to="/role-select"
                      onClick={() => setUserMenuOpen(false)}
                      className="px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Demo Role Selector</span>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                        navigate('/');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-500" />
                      <span>Reset Demo Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <Link
            to="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Explore Projects
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            How It Works
          </Link>

          {currentRole === 'student' ? (
            <>
              <Link
                to="/student/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-accent hover:bg-slate-50"
              >
                Student Dashboard
              </Link>
              <Link
                to="/student/applications"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                My Applications
              </Link>
              <Link
                to="/student/projects"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                My Projects
              </Link>
              <Link
                to="/student/earnings"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                Earnings
              </Link>
              <Link
                to="/student/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                Portfolio & Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/business/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-accent hover:bg-slate-50"
              >
                Business Dashboard
              </Link>
              <Link
                to="/business/post-project"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                Post a Project
              </Link>
              <Link
                to="/business/projects"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                My Posted Projects
              </Link>
              <Link
                to="/business/applications"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                Candidate Applications
              </Link>
            </>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/role-select"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-accent font-semibold"
            >
              Switch Role / Demo Accounts
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
