import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ApplicationModal } from '../../components/projects/ApplicationModal';
import { Project } from '../../types';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  IndianRupee, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  TrendingUp, 
  Star, 
  ChevronRight, 
  Palette, 
  Code2, 
  Database, 
  FileEdit, 
  Video, 
  Search,
  Building2,
  Users
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { projects } = useData();
  const { switchUser } = useAuth();
  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);

  const featuredProjects = projects.filter((p) => p.status === 'open').slice(0, 4);

  const handleApplyClick = (project: Project) => {
    setSelectedProject(project);
    setIsApplyModalOpen(true);
  };

  const categories = [
    { name: 'Technology & Web', icon: Code2, count: '12 projects', desc: 'Frontend, React, Bug Testing, QA' },
    { name: 'Design & Creatives', icon: Palette, count: '15 projects', desc: 'Canva, Figma, Pitch Decks, Social Creatives' },
    { name: 'Data & Analytics', icon: Database, count: '9 projects', desc: 'Excel, Data Cleaning, Lead Verification' },
    { name: 'Content & Writing', icon: FileEdit, count: '11 projects', desc: 'SEO Articles, Copywriting, Newsletters' },
    { name: 'Video & Media', icon: Video, count: '7 projects', desc: 'Reels Editing, Subtitles, YouTube Shorts' },
    { name: 'Market Research', icon: Search, count: '8 projects', desc: 'Competitor Audits, User Interviews' },
  ];

  const studentSteps = [
    { num: '01', title: 'Create Your Profile', desc: 'Highlight your college, tools you know, and your availability in under 3 minutes.' },
    { num: '02', title: 'Discover Matching Gigs', desc: 'Browse paid short projects (₹1,500 – ₹5,000) that take between 2 to 7 days.' },
    { num: '03', title: 'Submit a Quick Proposal', desc: 'Pitch your approach directly to startup founders without lengthy cover letters.' },
    { num: '04', title: 'Deliver & Get Paid', desc: 'Submit your deliverables directly into the workspace and receive instant simulated payout upon approval.' },
    { num: '05', title: 'Build Proof-of-Work', desc: 'Each completed project earns a verified business review on your public shareable portfolio.' },
  ];

  const businessSteps = [
    { num: '01', title: 'Post a Defined Micro-Project', desc: 'Specify clear deliverables, deadline, and your stipend in INR.' },
    { num: '02', title: 'Review College Candidates', desc: 'Inspect student portfolios, coursework, and past ratings from other Delhi NCR startups.' },
    { num: '03', title: 'Hire With Escrow Protection', desc: 'Stipend is locked safely in escrow before work begins.' },
    { num: '04', title: 'Review & Request Revisions', desc: 'Provide direct feedback in the collaborative project workspace.' },
    { num: '05', title: 'Approve & Release Funds', desc: 'One-click sign-off automatically pays the student and prompts mutual reviews.' },
  ];

  const faqs = [
    {
      q: 'How is PocketIntern different from traditional 3-month internships?',
      a: 'Traditional internships require 20–40 hours per week for multiple months, which is nearly impossible to balance with college attendance and exams. PocketIntern breaks work down into bite-sized 2 to 7 day micro-projects so you can gain verified proof-of-work without compromising classes.'
    },
    {
      q: 'How do students get paid?',
      a: 'When a business hires a student, the agreed stipend is held securely in escrow. Once the business reviews and approves the submitted deliverables in the workspace, funds are released directly to the student.'
    },
    {
      q: 'What kind of college students can apply?',
      a: 'First, second, third, and final year students across engineering, commerce, design, humanities, and management colleges across Delhi NCR and India.'
    },
    {
      q: 'How do startups benefit over traditional freelancing platforms?',
      a: 'Freelance platforms are flooded with generic agency bids and expensive hourly rates. PocketIntern gives startups access to eager, vetted college talent at fixed project pricing for urgent tasks.'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-white via-brandbg to-brandbg border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Delhi NCR Skill-Based College Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-800 tracking-tight leading-[1.1]">
                Your First Real Project <br />
                <span className="text-accent underline decoration-highlight decoration-wavy decoration-2">
                  Starts Here.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Find paid short projects, gain real-world startup experience, and build a portfolio that speaks louder than your resume.
              </p>

              {/* Tagline highlight */}
              <div className="flex items-center gap-4 text-xs font-bold text-navy-800 tracking-wide uppercase bg-slate-100/80 w-fit px-3 py-1.5 rounded-xl border border-slate-200">
                <span>Real Projects</span>
                <span className="text-accent">&bull;</span>
                <span>Real Pay</span>
                <span className="text-accent">&bull;</span>
                <span className="text-highlight">Real Proof</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/projects"
                  className="px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-sm shadow-subtle hover:shadow-lg transition-all flex items-center gap-2 group"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/business/post-project"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-navy-800 font-bold text-sm border border-slate-300 shadow-subtle transition-all flex items-center gap-2"
                >
                  <span>Post a Project</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Indian Startups</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Escrow-Protected Stipends</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                  <span>₹1,500 – ₹5,000 / gig</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Dashboard & Card Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Floating Preview Card 1: Earnings Pill */}
                <div className="absolute -top-5 -left-4 sm:-left-6 z-20 bg-white rounded-2xl shadow-xl border border-slate-200 p-3.5 flex items-center gap-3 animate-subtle-pulse">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Student Payout Released</span>
                    <p className="text-sm font-extrabold text-navy-800">₹3,500 Credited</p>
                  </div>
                </div>

                {/* Main Preview Container */}
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      <span className="text-xs font-semibold text-slate-400 ml-2">PocketIntern Live Feed</span>
                    </div>
                    <span className="text-[11px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      ● Active Marketplace
                    </span>
                  </div>

                  {/* Sample Mock Project 1 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=128&q=80"
                          alt="UrbanPulse"
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-navy-800">UrbanPulse Media &bull; Gurugram</p>
                          <span className="text-[10px] text-slate-500">Design &bull; 3 days turnaround</span>
                        </div>
                      </div>
                      <span className="text-sm font-extrabold text-navy-800">₹2,500</span>
                    </div>
                    <p className="text-xs font-semibold text-navy-800 leading-snug">
                      Create 10 Instagram Carousel Posts for Summer Brand Launch
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200">Canva</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200">Figma</span>
                      <span className="ml-auto text-emerald-600 font-semibold">4 applicants</span>
                    </div>
                  </div>

                  {/* Sample Mock Project 2 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=128&q=80"
                          alt="Nexora SaaS"
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-navy-800">Nexora SaaS &bull; Noida</p>
                          <span className="text-[10px] text-slate-500">Tech &bull; 4 days turnaround</span>
                        </div>
                      </div>
                      <span className="text-sm font-extrabold text-navy-800">₹3,000</span>
                    </div>
                    <p className="text-xs font-semibold text-navy-800 leading-snug">
                      Test New SaaS Checkout & Onboarding Flow on Multiple Devices
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200">Manual Testing</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200">DevTools</span>
                      <span className="ml-auto text-accent font-semibold">Assigned & Working</span>
                    </div>
                  </div>

                  {/* Quick Profile Pill */}
                  <div className="p-3 bg-navy-800 text-white rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=128&q=80"
                        alt="Aarav"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold">Aarav Sharma &bull; DTU</p>
                        <p className="text-[10px] text-slate-300">2 gigs completed &bull; 4.9 ★ Rating</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-highlight">Verified Portfolio</span>
                  </div>
                </div>

                {/* Floating Preview Card 2: Rating */}
                <div className="absolute -bottom-5 -right-4 sm:-right-6 z-20 bg-white rounded-2xl shadow-xl border border-slate-200 p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                    <Star className="w-5 h-5 fill-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Founder Review</span>
                    <p className="text-xs font-extrabold text-navy-800">5.0 Star Feedback</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Marketplace Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Live Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-800 tracking-tight">
              Featured Paid Micro-Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Hand-picked projects currently accepting applications from college students.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
          >
            <span>View All Projects ({projects.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onApplyClick={handleApplyClick}
            />
          ))}
        </div>
      </section>

      {/* Popular Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">Browse by Discipline</span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-800 tracking-tight mt-1">
            Popular Skill Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Whether you code, write, design, or organize data, there is a paid project waiting for your skillset.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={`/projects?category=${encodeURIComponent(cat.name.split(' ')[0])}`}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-slate-300 hover:shadow-hover transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                    {cat.count}
                  </span>
                </div>
                <h3 className="text-base font-bold text-navy-800 mt-4 group-hover:text-accent transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {cat.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works: Side-by-Side Dual Tracks */}
      <section className="bg-white py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Seamless Process</span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-800 tracking-tight mt-1">
              How PocketIntern Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Designed from the ground up to eliminate months of ghosting and uncertain hiring cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* For Students */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-800">For College Students</h3>
                  <p className="text-xs text-slate-500">Earn stipends & build portfolio between college hours</p>
                </div>
              </div>

              <div className="space-y-4">
                {studentSteps.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-subtle">
                    <span className="text-xs font-black text-accent bg-accent/10 px-2.5 py-1 rounded-lg flex-shrink-0">
                      {s.num}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-navy-800">{s.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                >
                  <span>Explore gigs and start building &rarr;</span>
                </Link>
              </div>
            </div>

            {/* For Businesses */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-navy-800 text-white flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-800">For Startups & SMBs</h3>
                  <p className="text-xs text-slate-500">Fast turnaround on small tasks without long contracts</p>
                </div>
              </div>

              <div className="space-y-4">
                {businessSteps.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-subtle">
                    <span className="text-xs font-black text-navy-800 bg-slate-100 px-2.5 py-1 rounded-lg flex-shrink-0">
                      {b.num}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-navy-800">{b.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <Link
                  to="/business/post-project"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-800 hover:underline"
                >
                  <span>Post your first project in 2 minutes &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Student Benefits */}
          <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-highlight">Student Advantage</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Why first- and second-year students love PocketIntern
            </h3>
            <ul className="space-y-4 text-xs text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                <span><strong>No "Previous Experience" Catch-22:</strong> Win tasks based on simple skill samples rather than prior corporate resumes.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                <span><strong>Short-Term Commitment:</strong> Projects last 2 to 7 days, allowing you to pause anytime during midterm exams or college fests.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                <span><strong>Verifiable Proof-of-Work:</strong> Every business leaves a written review and rating that appears directly on your public portfolio.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-highlight flex-shrink-0 mt-0.5" />
                <span><strong>Guaranteed Escrow Security:</strong> Never chase unpaid invoices. The stipend is reserved in escrow before you write a single line of code.</span>
              </li>
            </ul>
          </div>

          {/* Business Benefits */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-subtle space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">Startup Advantage</span>
            <h3 className="text-2xl sm:text-3xl font-black text-navy-800 tracking-tight">
              Why Indian startups hire on PocketIntern
            </h3>
            <ul className="space-y-4 text-xs text-slate-600">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Agile Task Execution:</strong> Get spreadsheet cleanup, social posts, or QA test passes completed in 72 hours.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Zero Administrative Friction:</strong> No long PF/ESI compliance or 3-month stipend commitments for single-week assignments.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Pre-Vetted Campus Talent:</strong> Discover top students from DTU, SRCC, NIFT, and GGSIPU hungry to prove their skills.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Try Before You Hire:</strong> Test candidates on micro-projects before offering full-time summer internship placements.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Student Testimonials (Clearly labeled demo content) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold mb-2">
            <span>Verified Student Stories</span>
            <span className="text-slate-400 font-normal">(Demo Showcase)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-800 tracking-tight">
            Proof That Speeds Up Careers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              &ldquo;In my second year at DTU, every corporate internship asked for 6 months of past experience. On PocketIntern, I tested a SaaS platform and built a React landing page in one weekend. I earned ₹8,500 and now have real founder testimonials on my portfolio!&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=128&q=80"
                alt="Aarav Sharma"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-navy-800">Aarav Sharma</p>
                <p className="text-[11px] text-slate-500">2nd Year B.Tech, DTU Delhi</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              &ldquo;Designed Instagram carousel templates for UrbanPulse right from my college hostel room. The requirements were super clear, feedback arrived within 24 hours, and payment was simulated immediately.&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80"
                alt="Priya Nair"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-navy-800">Priya Nair</p>
                <p className="text-[11px] text-slate-500">1st Year Design, NIFT Hauz Khas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              &ldquo;I cleaned sales lead databases in Excel for FinCraft. It took me 2 evenings after classes and helped me prove my analytical rigor before applying for commerce society leadership roles.&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80"
                alt="Rohan Verma"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-navy-800">Rohan Verma</p>
                <p className="text-[11px] text-slate-500">2nd Year B.Com (Hons), SRCC DU</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">Got Questions?</span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-800 tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle text-left">
              <h4 className="text-sm font-bold text-navy-800">{faq.q}</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Ready to turn skills into real proof-of-work?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join students across Delhi NCR earning stipends and building verifiable portfolios with high-growth startups today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/projects"
                className="px-6 py-3.5 rounded-xl bg-highlight hover:bg-highlight-hover text-navy-950 font-extrabold text-sm shadow-lg transition-all"
              >
                Find Your First Project
              </Link>
              <Link
                to="/business/post-project"
                className="px-6 py-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold text-sm border border-navy-700 transition-all"
              >
                Post a Micro-Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedProject && (
        <ApplicationModal
          isOpen={isApplyModalOpen}
          onClose={() => {
            setIsApplyModalOpen(false);
            setSelectedProject(null);
          }}
          project={selectedProject}
        />
      )}
    </div>
  );
};
