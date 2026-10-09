import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  IndianRupee, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Clock,
  Star,
  FileCheck,
  Send,
  UserCheck
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'businesses'>('students');

  const studentSteps = [
    {
      num: '1',
      title: 'Create Your Student Profile',
      desc: 'Set up your profile with your college, degree, major, skills, and links to your GitHub or design portfolio. Takes less than 2 minutes.',
      detail: 'No corporate resume needed. We highlight real skills and your availability.'
    },
    {
      num: '2',
      title: 'Discover Micro-Projects',
      desc: 'Search our marketplace for short gigs tailored for students. Filter by category, tools you know (Canva, React, Excel), and budget.',
      detail: 'Projects range from ₹1,500 to ₹5,000 and take between 2 to 7 days.'
    },
    {
      num: '3',
      title: 'Apply With a Focused Proposal',
      desc: 'Submit a concise proposal explaining your approach, timeline, and link any relevant course sample or personal project.',
      detail: 'No 3-page cover letters. Businesses evaluate your practical approach.'
    },
    {
      num: '4',
      title: 'Complete the Work in the Workspace',
      desc: 'When hired, use the dedicated project workspace to track deliverables checklist, upload drafts, and communicate progress.',
      detail: 'You have guaranteed escrow security: the business reserves funds before you start.'
    },
    {
      num: '5',
      title: 'Get Paid Promptly After Approval',
      desc: 'Once the business signs off on your final deliverables, the stipend is released directly into your earnings balance.',
      detail: 'If revisions are needed, the business provides clear written guidelines.'
    },
    {
      num: '6',
      title: 'Showcase Proof on Your Public Portfolio',
      desc: 'Each approved gig generates a verified review and rating from the founder, adding real proof-of-work to your shareable portfolio.',
      detail: 'Share your PocketIntern portfolio link on LinkedIn and your resume.'
    }
  ];

  const businessSteps = [
    {
      num: '1',
      title: 'Create a Business Account',
      desc: 'Register your startup or SMB with your company name, industry, and location in Delhi NCR or anywhere in India.',
      detail: 'Verify your company profile to earn the trusted employer badge.'
    },
    {
      num: '2',
      title: 'Post a Clearly Scoped Micro-Project',
      desc: 'Define the task requirements, bulleted list of deliverables, project deadline, and fixed budget in INR.',
      detail: 'Ideal for spreadsheet cleanup, QA testing, blog posts, or UI widgets.'
    },
    {
      num: '3',
      title: 'Review Eager Student Applicants',
      desc: 'Compare proposals, student colleges (DTU, SRCC, NIFT, LSR), past client ratings, and sample portfolios.',
      detail: 'Shortlist top contenders or decline applicants with one click.'
    },
    {
      num: '4',
      title: 'Select and Hire Your Student',
      desc: 'Accept the best student candidate. The project budget is held safely in escrow to ensure commitment from both sides.',
      detail: 'The collaborative workspace activates automatically.'
    },
    {
      num: '5',
      title: 'Review Deliverables & Request Changes',
      desc: 'Review submitted work against the deliverables checklist. Request targeted revisions or approve with comments.',
      detail: 'Keep the entire revision history organized in one centralized thread.'
    },
    {
      num: '6',
      title: 'Approve & Release Payment',
      desc: 'One-click sign-off approves the project, releases the stipend to the student, and unlocks reciprocal reviews.',
      detail: 'Rate the student to help them build their college career proof.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-accent uppercase tracking-wider">
          Complete Operational Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-800 tracking-tight">
          How PocketIntern Works
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          The skill-first marketplace connecting ambitious college students with high-growth startups for short, paid micro-projects.
        </p>

        {/* Tab Toggle */}
        <div className="pt-4 flex justify-center">
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setActiveTab('students')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'students'
                  ? 'bg-navy-800 text-white shadow-subtle'
                  : 'text-slate-600 hover:text-navy-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>For College Students</span>
            </button>

            <button
              onClick={() => setActiveTab('businesses')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'businesses'
                  ? 'bg-navy-800 text-white shadow-subtle'
                  : 'text-slate-600 hover:text-navy-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>For Startups & Businesses</span>
            </button>
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === 'students' ? studentSteps : businessSteps).map((step) => (
          <div
            key={step.num}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle flex flex-col justify-between hover:border-slate-300 transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-xl bg-accent/10 text-accent font-black text-sm flex items-center justify-center">
                  {step.num}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Phase {step.num}
                </span>
              </div>
              <h3 className="text-sm font-bold text-navy-800 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {step.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic bg-slate-50/70 p-2.5 rounded-xl">
              &ldquo;{step.detail}&rdquo;
            </div>
          </div>
        ))}
      </div>

      {/* Escrow & Trust Callout */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-navy-700 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-highlight text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Escrow Stipend Guarantee</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Real Pay Guaranteed for Every Approved Milestone
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Businesses fund project stipends before students start. Students deliver verified work according to agreed checklists. No unpaid work, no missed deadlines.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/projects">
            <Button variant="accent" size="md">
              Explore Live Gigs
            </Button>
          </Link>
          <Link to="/business/post-project">
            <Button variant="outline" size="md" className="bg-navy-800 text-white border-navy-700 hover:bg-navy-700">
              Post a Project
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
