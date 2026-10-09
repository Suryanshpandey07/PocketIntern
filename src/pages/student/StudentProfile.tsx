import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { StudentSidebar } from '../../components/dashboard/StudentSidebar';
import { Button } from '../../components/common/Button';
import { 
  User, 
  ExternalLink, 
  GraduationCap, 
  MapPin, 
  Clock, 
  Globe, 
  Github, 
  Linkedin, 
  CheckCircle2, 
  Save, 
  Eye, 
  Sparkles 
} from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const { getStudentProfile, updateStudentProfile } = useData();
  const { success, error } = useToast();

  const profile = currentUser ? getStudentProfile(currentUser.id) : undefined;

  const [college, setCollege] = useState(profile?.college || '');
  const [degree, setDegree] = useState(profile?.degree || '');
  const [year, setYear] = useState(profile?.year || '2nd Year');
  const [location, setLocation] = useState(profile?.location || 'Delhi NCR');
  const [bio, setBio] = useState(profile?.bio || '');
  const [skills, setSkills] = useState(profile?.skills?.join(', ') || '');
  const [portfolioUrl, setPortfolioUrl] = useState(profile?.portfolioUrl || '');
  const [githubUrl, setGithubUrl] = useState(profile?.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(profile?.linkedinUrl || '');
  const [availability, setAvailability] = useState(profile?.availability || '10-15 hrs/week');
  const [isPortfolioPublic, setIsPortfolioPublic] = useState(profile?.isPortfolioPublic ?? true);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSaving(true);
    const parsedSkills = skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateStudentProfile(currentUser.id, {
      college: college.trim(),
      degree: degree.trim(),
      year: year.trim(),
      location: location.trim(),
      bio: bio.trim(),
      skills: parsedSkills,
      portfolioUrl: portfolioUrl.trim(),
      githubUrl: githubUrl.trim(),
      linkedinUrl: linkedinUrl.trim(),
      availability: availability.trim(),
      isPortfolioPublic,
    });

    setIsSaving(false);
    success('Profile Updated!', 'Your student profile and portfolio have been saved.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <StudentSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-navy-800 tracking-tight">
                Student Profile &amp; Portfolio Editor
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Customize your bio, college credentials, tools, and shareable public portfolio.
              </p>
            </div>

            {currentUser && (
              <Link
                to={`/portfolio/${currentUser.id}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-navy-800 hover:bg-slate-50 shadow-subtle transition-all"
              >
                <Eye className="w-4 h-4 text-accent" />
                <span>View Public Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            )}
          </div>

          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-6">
            {/* Header info */}
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
              />
              <div>
                <h3 className="text-base font-bold text-navy-800">{currentUser?.name}</h3>
                <p className="text-xs text-slate-500">{currentUser?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ★ {profile?.averageRating || 5.0} Rating
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {profile?.completedProjectsCount || 0} completed gigs
                  </span>
                </div>
              </div>
            </div>

            {/* Public Portfolio Visibility Toggle */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-navy-800 block">
                  Public Shareable Portfolio
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Allow startup founders and evaluators to access your portfolio via a public web link.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPortfolioPublic}
                  onChange={(e) => setIsPortfolioPublic(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                College &amp; Academic Background
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    College / University Name
                  </label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Delhi Technological University (DTU)"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Degree &amp; Major
                  </label>
                  <input
                    type="text"
                    required
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. B.Tech Computer Science"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Year of Study
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Rohini, Delhi NCR"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Availability
                  </label>
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    placeholder="e.g. 10-15 hrs/week"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Bio & Skills */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                Profile Description &amp; Skills
              </h4>

              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">
                  Short Professional Biography
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a short summary of what you love building and your goals..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">
                  Skills &amp; Tools (comma separated)
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. React, TypeScript, Tailwind CSS, Manual Testing, Figma, Canva"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                />
              </div>
            </div>

            {/* External Links */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                External Portfolio &amp; Social Links
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Personal Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://aaravsharma.dev"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <Button
                type="submit"
                variant="accent"
                size="md"
                isLoading={isSaving}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Profile Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
