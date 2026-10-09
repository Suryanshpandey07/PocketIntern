import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  Users, 
  UserCheck, 
  Building2, 
  Star, 
  Settings,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const BusinessSidebar: React.FC = () => {
  const { currentUser } = useAuth();
  const { projects, applications, assignments } = useData();

  const businessProjects = projects.filter((p) => p.businessId === currentUser?.id);
  const myProjectIds = businessProjects.map((p) => p.id);
  
  // Pending candidate applications
  const pendingApps = applications.filter(
    (a) => myProjectIds.includes(a.projectId) && a.status === 'pending'
  );

  // Active hires
  const activeHires = assignments.filter(
    (a) => a.businessId === currentUser?.id && a.status !== 'completed'
  );

  const links = [
    { to: '/business/dashboard', label: 'Overview', icon: LayoutDashboard },
    { 
      to: '/business/projects', 
      label: 'My Postings', 
      icon: FolderKanban,
      badge: businessProjects.length > 0 ? businessProjects.length : undefined
    },
    { to: '/business/post-project', label: 'Post a Project', icon: PlusCircle, isPrimary: true },
    { 
      to: '/business/applications', 
      label: 'Applications Received', 
      icon: Users,
      badge: pendingApps.length > 0 ? pendingApps.length : undefined,
      badgeColor: 'bg-accent text-white'
    },
    { 
      to: '/business/hires', 
      label: 'Active Hires & Review', 
      icon: UserCheck,
      badge: activeHires.length > 0 ? activeHires.length : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    { to: '/business/reviews', label: 'Reviews', icon: Star },
    { to: '/business/profile', label: 'Company Profile', icon: Building2 },
    { to: '/business/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-subtle h-fit">
      <div className="px-3 py-2 mb-3 bg-highlight/10 rounded-xl border border-highlight/20 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-highlight" />
        <span className="text-xs font-bold text-navy-800">Business Console</span>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/business/dashboard'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-navy-800 text-white font-semibold shadow-subtle'
                    : link.isPrimary
                    ? 'bg-accent/10 text-accent font-semibold hover:bg-accent/15'
                    : 'text-slate-600 hover:text-navy-800 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 flex-shrink-0 ${link.isPrimary ? 'text-accent' : ''}`} />
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
