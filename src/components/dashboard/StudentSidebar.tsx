import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Compass, 
  FileText, 
  FolderKanban, 
  User, 
  IndianRupee, 
  Star, 
  Settings,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const StudentSidebar: React.FC = () => {
  const { currentUser } = useAuth();
  const { applications, assignments } = useData();

  const userApps = applications.filter((a) => a.studentId === currentUser?.id && a.status !== 'withdrawn');
  const activeAssignments = assignments.filter(
    (a) => a.studentId === currentUser?.id && a.status !== 'completed'
  );

  const links = [
    { to: '/student/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/projects', label: 'Discover Projects', icon: Compass },
    { 
      to: '/student/applications', 
      label: 'My Applications', 
      icon: FileText,
      badge: userApps.length > 0 ? userApps.length : undefined 
    },
    { 
      to: '/student/projects', 
      label: 'My Projects', 
      icon: FolderKanban,
      badge: activeAssignments.length > 0 ? activeAssignments.length : undefined,
      badgeColor: 'bg-highlight text-navy-950 font-bold'
    },
    { to: '/student/profile', label: 'Portfolio & Profile', icon: User },
    { to: '/student/earnings', label: 'Earnings & Payouts', icon: IndianRupee },
    { to: '/student/reviews', label: 'Reviews', icon: Star },
    { to: '/student/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-subtle h-fit">
      <div className="px-3 py-2 mb-3 bg-accent/5 rounded-xl border border-accent/10 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="text-xs font-bold text-navy-800">Student Portal</span>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/student/dashboard'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-navy-800 text-white font-semibold shadow-subtle'
                    : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{link.label}</span>
              </div>
              {link.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    link.badgeColor || 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
