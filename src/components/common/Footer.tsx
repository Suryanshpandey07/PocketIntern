import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-slate-300 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center text-white shadow-md">
                <span className="font-extrabold text-base tracking-tighter text-highlight">P</span>
                <span className="font-extrabold text-xs -ml-0.5">I</span>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Pocket<span className="text-accent">Intern</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Skill-based micro-project marketplace connecting ambitious college students with startups and businesses for fast, paid proof-of-work.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-highlight" />
              <span>Delhi NCR &bull; New Delhi, India</span>
            </div>
          </div>

          {/* For Students */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">For Students</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">
                  Explore Paid Projects
                </Link>
              </li>
              <li>
                <Link to="/student/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/student/earnings" className="hover:text-white transition-colors">
                  Track Earnings & Payouts
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How Students Get Paid
                </Link>
              </li>
            </ul>
          </div>

          {/* For Businesses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">For Businesses</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/business/post-project" className="hover:text-white transition-colors">
                  Post a Paid Micro-Project
                </Link>
              </li>
              <li>
                <Link to="/business/dashboard" className="hover:text-white transition-colors">
                  Business Dashboard
                </Link>
              </li>
              <li>
                <Link to="/business/applications" className="hover:text-white transition-colors">
                  Review Student Portfolios
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  Hire Vetted College Talent
                </Link>
              </li>
            </ul>
          </div>

          {/* Prototype & Demo Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-highlight" />
              <span>MVP Prototype Notice</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed bg-navy-950/60 p-3 rounded-xl border border-navy-800">
              This is a fully interactive startup MVP demonstration. All user accounts, transactions, and company profiles are fictional representations created for evaluation.
            </p>
            <div className="pt-1">
              <Link
                to="/role-select"
                className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-white font-medium"
              >
                <span>Switch Demo Persona / Reset Data &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} PocketIntern Inc. Tagline: &ldquo;Real Projects. Real Pay. Real Proof.&rdquo;</p>
          <div className="flex items-center gap-6">
            <span>Built with React + TypeScript + Tailwind</span>
            <span className="text-highlight font-medium">Ready for Supabase Backend</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
