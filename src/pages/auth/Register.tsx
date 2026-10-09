import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { UserRole } from '../../types';
import { 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  User as UserIcon, 
  Mail, 
  Lock, 
  MapPin, 
  BookOpen 
} from 'lucide-react';

export const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { register } = useAuth();
  const { updateStudentProfile, updateBusinessProfile, studentProfiles, businessProfiles } = useData();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const initialRole = (searchParams.get('role') as UserRole) || 'student';
  const [role, setRole] = useState<UserRole>(initialRole);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [entityName, setEntityName] = useState(''); // College or Business Name
  const [location, setLocation] = useState('Delhi NCR');
  const [skillsOrIndustry, setSkillsOrIndustry] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      error('Please fill in required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const newUser = register({
        name: name.trim(),
        email: email.trim(),
        role,
        entityName: entityName.trim(),
      });

      // Initialize matching profile
      if (role === 'student') {
        updateStudentProfile(newUser.id, {
          userId: newUser.id,
          college: entityName.trim() || 'Delhi Technological University (DTU)',
          degree: 'B.Tech / Bachelor Degree',
          year: '2nd Year',
          location: location.trim() || 'Delhi NCR',
          bio: 'Enthusiastic college student looking for real projects to build my portfolio and prove skills.',
          skills: skillsOrIndustry ? skillsOrIndustry.split(',').map((s) => s.trim()) : ['React', 'Figma', 'Excel'],
          portfolioUrl: 'https://portfolio.demo',
          availability: '10-15 hrs/week',
          isPortfolioPublic: true,
          completedProjectsCount: 0,
          averageRating: 5.0,
          totalEarnings: 0,
        });
        success('Student Profile Created!', 'Welcome to PocketIntern! Start exploring live projects.');
        navigate('/student/dashboard');
      } else {
        updateBusinessProfile(newUser.id, {
          userId: newUser.id,
          businessName: entityName.trim() || 'Fast Growth Venture',
          tagline: 'Modern startup scaling in Delhi NCR',
          description: 'We frequently hire talented students for agile micro-projects across tech, design, and growth.',
          industry: skillsOrIndustry || 'Technology & E-commerce',
          website: 'https://example-startup.in',
          location: location.trim() || 'Gurugram, Haryana',
          logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=256&q=80',
          verified: true,
          projectsPostedCount: 0,
          totalSpent: 0,
        });
        success('Business Profile Created!', 'You can now post micro-projects and hire student talent.');
        navigate('/business/dashboard');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8 text-left">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Join PocketIntern</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-navy-800 tracking-tight">
          Create Your Demo Account
        </h1>
        <p className="text-xs text-slate-500">
          Choose whether you want to participate as a Student or as a Hiring Business.
        </p>
      </div>

      {/* Role Switcher Pill */}
      <div className="grid grid-cols-2 gap-3 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setRole('student')}
          className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            role === 'student'
              ? 'bg-navy-800 text-white shadow-subtle'
              : 'text-slate-600 hover:text-navy-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>I am a Student</span>
        </button>

        <button
          type="button"
          onClick={() => setRole('business')}
          className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            role === 'business'
              ? 'bg-navy-800 text-white shadow-subtle'
              : 'text-slate-600 hover:text-navy-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>I am a Business</span>
        </button>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-4">
        <div>
          <label className="block text-xs font-bold text-navy-800 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'student' ? 'e.g. Suryansh Sharma' : 'e.g. Vikram Malhotra'}
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-navy-800 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'student' ? 'e.g. student@dtu.ac.in' : 'e.g. founder@mystartup.in'}
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              {role === 'student' ? 'College / University Name' : 'Company / Brand Name'} <span className="text-rose-500">*</span>
            </label>
            <input
              required
              type="text"
              value={entityName}
              onChange={(e) => setEntityName(e.target.value)}
              placeholder={role === 'student' ? 'e.g. DTU Delhi / SRCC' : 'e.g. UrbanPulse Media'}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Delhi NCR / Gurugram"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-navy-800 mb-1">
            {role === 'student' ? 'Key Skills (comma separated)' : 'Industry / Domain'}
          </label>
          <input
            type="text"
            value={skillsOrIndustry}
            onChange={(e) => setSkillsOrIndustry(e.target.value)}
            placeholder={role === 'student' ? 'e.g. React, Figma, Excel, Canva' : 'e.g. D2C, SaaS, Fintech'}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="accent"
            size="md"
            className="w-full"
            isLoading={isSubmitting}
          >
            Complete Registration &amp; Enter Dashboard
          </Button>
        </div>

        <div className="pt-2 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold text-accent hover:underline">
            Sign In with Demo Persona
          </Link>
        </div>
      </form>
    </div>
  );
};
