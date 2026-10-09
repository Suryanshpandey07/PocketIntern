import {
  User,
  StudentProfile,
  BusinessProfile,
  Project,
  Application,
  ProjectAssignment,
  Submission,
  Payment,
  Review,
  Notification,
  Bookmark
} from '../types';

export const INITIAL_USERS: User[] = [
  // Demo Student 1 (Main test student)
  {
    id: 'student-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@dtu.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    createdAt: '2026-01-15T10:00:00Z',
  },
  // Demo Student 2
  {
    id: 'student-2',
    name: 'Priya Nair',
    email: 'priya.nair@nid.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    createdAt: '2026-01-20T11:00:00Z',
  },
  // Demo Student 3
  {
    id: 'student-3',
    name: 'Rohan Verma',
    email: 'rohan.verma@srcc.du.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    createdAt: '2026-02-01T09:30:00Z',
  },
  // Demo Student 4
  {
    id: 'student-4',
    name: 'Ananya Gupta',
    email: 'ananya.g@lsr.du.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    createdAt: '2026-02-10T14:15:00Z',
  },
  // Demo Student 5
  {
    id: 'student-5',
    name: 'Kabir Mehta',
    email: 'kabir.m@ggsipu.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    createdAt: '2026-02-15T16:00:00Z',
  },

  // Demo Business 1 (Main test business)
  {
    id: 'biz-1',
    name: 'Vikram Malhotra',
    email: 'vikram@urbanpulse.in',
    role: 'business',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    createdAt: '2026-01-10T08:00:00Z',
  },
  // Demo Business 2
  {
    id: 'biz-2',
    name: 'Sneha Kapoor',
    email: 'sneha@nexoratech.io',
    role: 'business',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    createdAt: '2026-01-18T12:00:00Z',
  },
  // Demo Business 3
  {
    id: 'biz-3',
    name: 'Aditya Singhania',
    email: 'aditya@fincraft.in',
    role: 'business',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
    createdAt: '2026-02-05T10:00:00Z',
  },
  // Demo Business 4
  {
    id: 'biz-4',
    name: 'Meera Sen',
    email: 'meera@greenroots.co',
    role: 'business',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    createdAt: '2026-02-12T11:20:00Z',
  },

  // Demo Admin
  {
    id: 'admin-1',
    name: 'PocketIntern Admin',
    email: 'ops@pocketintern.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=256&q=80',
    createdAt: '2026-01-01T00:00:00Z',
  }
];

export const INITIAL_STUDENT_PROFILES: StudentProfile[] = [
  {
    userId: 'student-1',
    college: 'Delhi Technological University (DTU)',
    degree: 'B.Tech in Computer Science & Engineering',
    year: '2nd Year',
    location: 'Rohini, Delhi NCR',
    bio: 'Passionate frontend developer and UI enthusiast. Love building fast, responsive web interfaces with React, Tailwind, and TypeScript. Looking for quick paid gigs to build proof-of-work before college placement season.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Manual Testing', 'Figma to Code', 'Git'],
    portfolioUrl: 'https://aaravsharma.dev',
    availability: '12-15 hrs/week',
    isPortfolioPublic: true,
    githubUrl: 'https://github.com/aaravsharma-dev',
    linkedinUrl: 'https://linkedin.com/in/aarav-sharma-dtu',
    completedProjectsCount: 2,
    averageRating: 4.9,
    totalEarnings: 8500,
  },
  {
    userId: 'student-2',
    college: 'National Institute of Fashion Technology (NIFT)',
    degree: 'B.Des in Communication Design',
    year: '1st Year',
    location: 'Hauz Khas, New Delhi',
    bio: 'Visual designer specializing in brand identity, social media campaign creatives, and aesthetic pitch decks. Fast turnaround and obsessive attention to typography.',
    skills: ['Canva', 'Graphic Design', 'Figma', 'Instagram Creatives', 'Pitch Decks'],
    portfolioUrl: 'https://priyanair.design',
    availability: '10 hrs/week',
    isPortfolioPublic: true,
    githubUrl: '',
    linkedinUrl: 'https://linkedin.com/in/priya-nair-design',
    completedProjectsCount: 3,
    averageRating: 5.0,
    totalEarnings: 7500,
  },
  {
    userId: 'student-3',
    college: 'Shri Ram College of Commerce (SRCC)',
    degree: 'B.Com (Hons)',
    year: '2nd Year',
    location: 'North Campus, Delhi University',
    bio: 'Finance and numbers geek. Skilled in advanced Excel, pivot tables, data cleanup, and competitive market research. High accuracy and speedy execution.',
    skills: ['Excel', 'Data Cleaning', 'Market Research', 'Google Sheets', 'Financial Modeling'],
    portfolioUrl: 'https://rohanverma.me',
    availability: '8-12 hrs/week',
    isPortfolioPublic: true,
    completedProjectsCount: 1,
    averageRating: 4.8,
    totalEarnings: 1800,
  },
  {
    userId: 'student-4',
    college: 'Lady Shri Ram College for Women (LSR)',
    degree: 'B.A. (Hons) Journalism',
    year: '3rd Year',
    location: 'Lajpat Nagar, New Delhi',
    bio: 'Storyteller, copywriter, and SEO content researcher. I create crisp, engaging blog posts, newsletter editions, and product launch announcements tailored for young Indian audiences.',
    skills: ['Writing', 'SEO Research', 'Copywriting', 'Content Strategy', 'Blogging'],
    portfolioUrl: 'https://ananyagupta.substack.com',
    availability: '15 hrs/week',
    isPortfolioPublic: true,
    completedProjectsCount: 4,
    averageRating: 4.9,
    totalEarnings: 14000,
  },
  {
    userId: 'student-5',
    college: 'Guru Gobind Singh Indraprastha University (GGSIPU)',
    degree: 'Bachelor of Computer Applications (BCA)',
    year: '2nd Year',
    location: 'Dwarka, New Delhi',
    bio: 'Python scripting, web scraping, and QA tester. I find bugs, edge cases, and organize raw web data into clean CSVs and databases.',
    skills: ['Python', 'Web Scraping', 'QA Testing', 'Bug Documentation', 'Excel'],
    portfolioUrl: 'https://kabirmehta.in',
    availability: '10 hrs/week',
    isPortfolioPublic: true,
    completedProjectsCount: 1,
    averageRating: 4.7,
    totalEarnings: 3000,
  }
];

export const INITIAL_BUSINESS_PROFILES: BusinessProfile[] = [
  {
    userId: 'biz-1',
    businessName: 'UrbanPulse Media & Brands',
    tagline: 'Fast-moving D2C branding and modern consumer products',
    description: 'We are a fast-growing Delhi NCR growth studio scaling consumer brands and D2C startups across India. We frequently need agile help with design, content, and frontend assets.',
    industry: 'D2C & Digital Marketing',
    website: 'https://urbanpulse.in',
    location: 'Cyber City, Gurugram, Haryana',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=256&q=80',
    verified: true,
    projectsPostedCount: 5,
    totalSpent: 16500,
  },
  {
    userId: 'biz-2',
    businessName: 'Nexora SaaS Technologies',
    tagline: 'Modern workforce and compliance automation platform',
    description: 'Seed-funded B2B software venture building enterprise tooling for Indian SMBs. Based in Noida Tech Zone.',
    industry: 'Software & Technology',
    website: 'https://nexoratech.io',
    location: 'Sector 62, Noida, Uttar Pradesh',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&q=80',
    verified: true,
    projectsPostedCount: 3,
    totalSpent: 9800,
  },
  {
    userId: 'biz-3',
    businessName: 'FinCraft Wealth & Advisory',
    tagline: 'Simplifying retail investment intelligence for tier-1 & 2 cities',
    description: 'Independent boutique advisory providing clear, actionable financial newsletters and research briefs for young Indian professionals.',
    industry: 'Fintech & Advisory',
    website: 'https://fincraft.in',
    location: 'Barakhamba Road, Connaught Place, New Delhi',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=256&q=80',
    verified: true,
    projectsPostedCount: 2,
    totalSpent: 5300,
  },
  {
    userId: 'biz-4',
    businessName: 'GreenRoots Organics',
    tagline: 'Sustainable everyday lifestyle and plant-based packaging',
    description: 'Eco-first consumer brand partnering with local organic farms across North India. Looking for fresh creative talent.',
    industry: 'E-commerce & Sustainability',
    website: 'https://greenroots.co',
    location: 'Hauz Khas Village, New Delhi',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=256&q=80',
    verified: true,
    projectsPostedCount: 1,
    totalSpent: 2500,
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    businessId: 'biz-1',
    title: 'Create 10 Instagram Carousel Posts for Summer Brand Launch',
    description: 'UrbanPulse is launching our new summer cold-brew ready-to-drink beverage line across Delhi NCR. We need a creative student designer to create 10 high-converting Instagram carousel slides following our brand typography, bold color palette, and copywriting cues. You will receive raw product photos and copy outline.',
    category: 'Design',
    skills: ['Canva', 'Graphic Design', 'Figma', 'Social Media Creatives'],
    deliverables: [
      '10 export-ready carousel slides (1080x1350 PNG)',
      'Editable Figma/Canva link with layers organized',
      '2 story resize adaptations for our launch week'
    ],
    budget: 2500,
    duration: '3 days',
    applicationDeadline: '2026-10-18',
    projectDeadline: '2026-10-21',
    status: 'open',
    openings: 1,
    isRemote: true,
    location: 'Remote (Delhi NCR preferred)',
    additionalInstructions: 'Please include links to any past Instagram graphics or aesthetic posters you have designed.',
    createdAt: '2026-10-06T09:00:00Z',
  },
  {
    id: 'proj-2',
    businessId: 'biz-3',
    title: 'Clean, Deduplicate, and Organize Q1 B2B Sales Lead Database',
    description: 'FinCraft has collected 1,200 raw sales leads from industry conferences across Delhi, Gurugram, and Mumbai. The spreadsheet contains duplicate entries, inconsistent phone numbers, missing pincodes, and unformatted company names. We need someone meticulous with Microsoft Excel / Google Sheets to clean and validate this data.',
    category: 'Data Analytics',
    skills: ['Excel', 'Data Cleaning', 'Google Sheets'],
    deliverables: [
      'Cleaned Excel workbook (.xlsx) with no duplicate records',
      'Standardized phone (+91) and email formatting',
      'Brief summary note highlighting uncontactable leads'
    ],
    budget: 1800,
    duration: '2 days',
    applicationDeadline: '2026-10-15',
    projectDeadline: '2026-10-17',
    status: 'open',
    openings: 1,
    isRemote: true,
    additionalInstructions: 'Fast turnaround expected. Experience with VLOOKUP or data deduplication formulas is a plus.',
    createdAt: '2026-10-07T11:30:00Z',
  },
  {
    id: 'proj-3',
    businessId: 'biz-2',
    title: 'Test New SaaS Checkout & Onboarding Flow on Multiple Devices',
    description: 'We are rolling out a major update to our compliance automation tool. We need a student tester to thoroughly exercise our sign-up flow, plan selection, invoice download, and profile setup across Chrome, Safari, and mobile viewports. Document every glitch, visual inconsistency, or confusing copy.',
    category: 'Technology',
    skills: ['Manual Testing', 'QA Testing', 'Bug Documentation', 'Browser DevTools'],
    deliverables: [
      'Comprehensive bug report table (Bug title, Steps to reproduce, Severity, Screenshot/Video)',
      'List of UI/UX friction points observed on mobile viewports',
      'Pass/Fail sign-off on 15 core test cases provided in our Notion doc'
    ],
    budget: 3000,
    duration: '4 days',
    applicationDeadline: '2026-10-12',
    projectDeadline: '2026-10-16',
    status: 'in_progress',
    openings: 1,
    isRemote: true,
    assignedStudentId: 'student-1', // Assigned to Aarav Sharma for workspace demo!
    additionalInstructions: 'Attention to detail is paramount. Test on at least 1 desktop and 1 mobile device.',
    createdAt: '2026-10-04T14:00:00Z',
  },
  {
    id: 'proj-4',
    businessId: 'biz-3',
    title: 'Write 5 SEO Blog Articles on Gen-Z Personal Finance in India',
    description: 'FinCraft is launching our student financial literacy blog series. We need 5 well-researched, jargon-free 800-word articles explaining topics like SIPs vs FDs, beginner tax basics in India, credit card traps, and emergency funds for 20-somethings.',
    category: 'Content',
    skills: ['Writing', 'SEO Research', 'Copywriting', 'Personal Finance'],
    deliverables: [
      '5 Markdown / Google Docs articles (approx 800 words each)',
      'Meta titles, descriptions, and recommended keyword tags',
      'Royalty-free Unsplash image suggestions for header cards'
    ],
    budget: 3500,
    duration: '5 days',
    applicationDeadline: '2026-09-28',
    projectDeadline: '2026-10-03',
    status: 'completed',
    openings: 1,
    isRemote: true,
    assignedStudentId: 'student-1',
    createdAt: '2026-09-25T10:00:00Z',
  },
  {
    id: 'proj-5',
    businessId: 'biz-1',
    title: 'Build a Responsive Modern Landing Page Component in React',
    description: 'We need an interactive product feature comparison section built in React and Tailwind CSS. Must include smooth tab switching between monthly/annual plans, expandable FAQ accordions, and mobile drawer navigation. Clean modular code with TypeScript props.',
    category: 'Technology',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
    deliverables: [
      'Reusable React component folder with TypeScript typings',
      'Fully responsive mobile/tablet/desktop layout',
      'Clean CodeSandbox or GitHub repository link with setup readme'
    ],
    budget: 5000,
    duration: '7 days',
    applicationDeadline: '2026-10-20',
    projectDeadline: '2026-10-27',
    status: 'open',
    openings: 1,
    isRemote: true,
    additionalInstructions: 'Component will be directly integrated into our Next.js frontend.',
    createdAt: '2026-10-08T08:00:00Z',
  },
  {
    id: 'proj-6',
    businessId: 'biz-2',
    title: 'Competitive Benchmarking & Pricing Research for Indian HR-Tech',
    description: 'Nexora is benchmarking our mid-market SaaS pricing against 8 major competitors in India (Keka, Darwinbox, GreytHR, etc.). We need a research-minded student to mystery-shop public pricing tiers, feature gate limits, and customer support channels, summarizing findings into a slide deck.',
    category: 'Research',
    skills: ['Market Research', 'Competitive Analysis', 'Google Slides', 'Data Synthesis'],
    deliverables: [
      '10-slide PowerPoint / Google Slides deck summarizing competitor matrices',
      'Feature comparison matrix spreadsheet comparing 8 providers',
      'Executive summary highlighting pricing sweet spots'
    ],
    budget: 2200,
    duration: '4 days',
    applicationDeadline: '2026-10-17',
    projectDeadline: '2026-10-21',
    status: 'open',
    openings: 1,
    isRemote: true,
    createdAt: '2026-10-07T16:00:00Z',
  },
  {
    id: 'proj-7',
    businessId: 'biz-4',
    title: 'Edit 3 Short-Form Instagram Reels from Raw Farm Shoot Footage',
    description: 'GreenRoots Organics recorded high-definition vertical video of our partner apple orchards in Himachal Pradesh. We need a creative editor to craft 3 snappy 25-35 second Instagram Reels with trending audio timing, clean kinetic typography captions, and color enhancement.',
    category: 'Video & Media',
    skills: ['Premiere Pro', 'CapCut', 'Video Editing', 'Reels Production'],
    deliverables: [
      '3 1080x1920 MP4 vertical videos under 35 seconds',
      'Hardcoded dynamic subtitle captions',
      'Source project files and export presets'
    ],
    budget: 3200,
    duration: '3 days',
    applicationDeadline: '2026-10-19',
    projectDeadline: '2026-10-22',
    status: 'open',
    openings: 1,
    isRemote: true,
    createdAt: '2026-10-08T14:30:00Z',
  },
  {
    id: 'proj-8',
    businessId: 'biz-1',
    title: 'Design an Investor Update Pitch Deck (12 Slides) in Figma',
    description: 'UrbanPulse is preparing our Q3 investor memo. We have the raw financial charts and bullet points ready in Notion. We need an aesthetic, polished presentation deck designed in Figma or Keynote with consistent brand spacing, card layouts, and subtle graphic accents.',
    category: 'Design',
    skills: ['Figma', 'Pitch Decks', 'Graphic Design', 'Typography'],
    deliverables: [
      '12-slide high-resolution PDF presentation',
      'Editable Figma file with auto-layout and style guides',
      'Vector asset export bundle'
    ],
    budget: 4000,
    duration: '4 days',
    applicationDeadline: '2026-10-22',
    projectDeadline: '2026-10-26',
    status: 'open',
    openings: 1,
    isRemote: true,
    createdAt: '2026-10-08T17:15:00Z',
  },
  {
    id: 'proj-9',
    businessId: 'biz-2',
    title: 'Verify and Deduplicate Customer Support Logs for AI Training',
    description: 'We have 2,500 raw Zendesk ticket transcripts that need basic categorization (Billing, Tech, Onboarding) and redaction of customer sensitive data (PAN numbers, Aadhaar placeholders) before fine-tuning our support assistant.',
    category: 'Data Analytics',
    skills: ['Data Cleaning', 'Excel', 'Text Processing', 'Attention to Detail'],
    deliverables: [
      'Cleaned CSV with standardized taxonomy tags',
      'Zero unredacted PII entries verified via sanity check regex',
      'Discrepancy log for tickets with ambiguous intent'
    ],
    budget: 1500,
    duration: '2 days',
    applicationDeadline: '2026-10-16',
    projectDeadline: '2026-10-18',
    status: 'open',
    openings: 1,
    isRemote: true,
    createdAt: '2026-10-09T10:00:00Z',
  },
  {
    id: 'proj-10',
    businessId: 'biz-1',
    title: 'Conduct User Testing Interviews with 5 College Students for New D2C App',
    description: 'We want honest feedback on our student beverage discount subscription app. Conduct 15-minute screen share interviews with 5 real college students in Delhi NCR, gather their candid reactions on onboarding and pricing, and compile insights into an action matrix.',
    category: 'Research',
    skills: ['User Interviews', 'Qualitative Research', 'Synthesis', 'Documentation'],
    deliverables: [
      'Interview notes and recorded highlights from 5 student sessions',
      'Top 5 UX roadblocks ranked by user severity',
      'Recommended feature adjustments matrix'
    ],
    budget: 2800,
    duration: '5 days',
    applicationDeadline: '2026-10-21',
    projectDeadline: '2026-10-26',
    status: 'open',
    openings: 1,
    isRemote: false,
    location: 'Delhi NCR (Hybrid / Remote calls)',
    createdAt: '2026-10-09T12:00:00Z',
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  // Applications on Proj-1 (Instagram posts)
  {
    id: 'app-1',
    projectId: 'proj-1',
    studentId: 'student-2', // Priya Nair
    proposal: 'Hey Vikram! I am a 1st year design student at NIFT Hauz Khas. I have crafted high-engagement Instagram carousel templates for 2 collegiate brands. My aesthetic aligns perfectly with UrbanPulse bold modern energy. Check my portfolio for live examples.',
    relevantSkills: ['Canva', 'Figma', 'Instagram Creatives'],
    relevantExperience: 'Created 25+ viral social posts for NIFT cultural fest; managed Instagram creative strategy for an indie thrift store.',
    portfolioUrl: 'https://priyanair.design',
    status: 'shortlisted',
    createdAt: '2026-10-06T14:20:00Z',
  },
  {
    id: 'app-2',
    projectId: 'proj-1',
    studentId: 'student-1', // Aarav Sharma applied as well!
    proposal: 'Hi there! While my main focus is frontend, I design UI elements and marketing graphics in Figma daily. I can deliver clean, responsive-ready graphics with rapid turnaround and all requested sizes.',
    relevantSkills: ['Figma', 'Graphic Design'],
    relevantExperience: 'Built graphic assets for DTU tech fest website and social handles.',
    portfolioUrl: 'https://aaravsharma.dev',
    status: 'pending',
    createdAt: '2026-10-07T09:15:00Z',
  },
  {
    id: 'app-3',
    projectId: 'proj-1',
    studentId: 'student-4', // Ananya Gupta
    proposal: 'Hello! I can combine eye-catching typography with punchy copy tailored for college audiences in Delhi NCR.',
    relevantSkills: ['Canva', 'Writing'],
    relevantExperience: 'Written and formatted infographics for DU Beat and college magazine.',
    portfolioUrl: 'https://ananyagupta.substack.com',
    status: 'pending',
    createdAt: '2026-10-07T12:00:00Z',
  },

  // Applications on Proj-2 (Excel Data Cleaning)
  {
    id: 'app-4',
    projectId: 'proj-2',
    studentId: 'student-3', // Rohan Verma (SRCC)
    proposal: 'Hi Aditya! I am a 2nd year B.Com student at SRCC. I work with massive Excel datasets regularly and use advanced formulas (XLOOKUP, regex-based text split, duplicate removals). I can deliver a pristine, formatted workbook within 24 hours.',
    relevantSkills: ['Excel', 'Data Cleaning', 'Google Sheets'],
    relevantExperience: 'Cleaned database of 3,500 delegates for SRCC Youth Conference; certified in Advanced Financial Modeling.',
    portfolioUrl: 'https://rohanverma.me',
    status: 'pending',
    createdAt: '2026-10-07T15:30:00Z',
  },

  // Application on Proj-3 (Testing SaaS - Accepted and in progress)
  {
    id: 'app-5',
    projectId: 'proj-3',
    studentId: 'student-1', // Aarav Sharma
    proposal: 'Hey Sneha! I run automated and manual test scripts for web applications. I have access to Windows, macOS, Android, and iOS devices with DevTools. Will supply clear steps to reproduce with screen recordings and severity rankings.',
    relevantSkills: ['Manual Testing', 'QA Testing', 'Bug Documentation'],
    relevantExperience: 'Tested 2 open source projects and DTU student portal beta version.',
    portfolioUrl: 'https://aaravsharma.dev',
    status: 'accepted',
    createdAt: '2026-10-04T15:00:00Z',
    reviewedAt: '2026-10-05T10:00:00Z',
  },

  // Completed application on Proj-4
  {
    id: 'app-6',
    projectId: 'proj-4',
    studentId: 'student-1', // Aarav Sharma completed
    proposal: 'Hi! As a college student managing tech and freelance income, I can write authentic, high-retention personal finance breakdowns specifically for Indian students.',
    relevantSkills: ['Writing', 'SEO Research', 'Personal Finance'],
    relevantExperience: 'Published 8 tech and finance explainers on Medium with 15k+ reads.',
    portfolioUrl: 'https://aaravsharma.dev',
    status: 'accepted',
    createdAt: '2026-09-26T11:00:00Z',
    reviewedAt: '2026-09-26T18:00:00Z',
  }
];

export const INITIAL_ASSIGNMENTS: ProjectAssignment[] = [
  // Assignment for Proj-3 (In Progress with revision requested so user can test submission)
  {
    id: 'assign-1',
    projectId: 'proj-3',
    studentId: 'student-1',
    businessId: 'biz-2',
    status: 'revision_requested',
    startedAt: '2026-10-05T10:00:00Z',
    deliverablesChecklist: [
      { id: 'del-1', title: 'Test checkout on Chrome Desktop (Windows/Mac)', completed: true },
      { id: 'del-2', title: 'Test checkout on Safari Mobile (iOS)', completed: true },
      { id: 'del-3', title: 'Verify coupon code edge cases & invalid inputs', completed: true },
      { id: 'del-4', title: 'Document bug report table with reproduction steps', completed: false },
      { id: 'del-5', title: 'Provide video recordings for UI layout shift bugs', completed: false },
    ]
  },
  // Assignment for Proj-4 (Completed)
  {
    id: 'assign-2',
    projectId: 'proj-4',
    studentId: 'student-1',
    businessId: 'biz-3',
    status: 'completed',
    startedAt: '2026-09-27T09:00:00Z',
    completedAt: '2026-10-02T16:00:00Z',
    deliverablesChecklist: [
      { id: 'del-6', title: 'Article 1: SIP vs Recurring Deposits for Students', completed: true },
      { id: 'del-7', title: 'Article 2: Credit Score Basics in India (CIBIL)', completed: true },
      { id: 'del-8', title: 'Article 3: Freelance Income & Section 44ADA', completed: true },
      { id: 'del-9', title: 'Article 4: 5 Budgeting Apps That Actually Work', completed: true },
      { id: 'del-10', title: 'Article 5: How to Build a ₹10,000 Emergency Fund', completed: true },
    ]
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  // Submission 1 for Proj-3 (Revision requested)
  {
    id: 'sub-1',
    assignmentId: 'assign-1',
    projectId: 'proj-3',
    studentId: 'student-1',
    description: 'Hey Sneha! I completed testing on Chrome 129 and iOS Safari 18. Found 6 bugs including an invoice total rounding error and a button overflow on iPhone 13. Here is the preliminary Google Sheet and notes.',
    attachmentUrl: 'https://docs.google.com/spreadsheets/d/sample-saas-bug-sheet-v1',
    attachmentName: 'Nexora_Checkout_Bug_Report_Draft.xlsx',
    externalLink: 'https://loom.com/share/demo-qa-bug-walkthrough',
    revisionNumber: 1,
    submittedAt: '2026-10-08T11:00:00Z',
    feedback: 'Great initial findings, Aarav! However, please test the "Yearly Annual Switch" discount code edge case, and add video timestamps for bug #4 where the modal froze on mobile Safari. Once updated, resubmit and we will approve right away!',
    status: 'revision_requested'
  },
  // Submission for completed Proj-4
  {
    id: 'sub-2',
    assignmentId: 'assign-2',
    projectId: 'proj-4',
    studentId: 'student-1',
    description: 'Completed all 5 SEO articles including keyword tags and Unsplash hero photo credits. Total word count: 4,250 words. Formatted in clear markdown with actionable takeaways for Indian college students.',
    attachmentUrl: 'https://docs.google.com/document/d/sample-fincraft-articles',
    attachmentName: 'FinCraft_GenZ_Personal_Finance_Articles_Final.docx',
    externalLink: 'https://github.com/aaravsharma-dev/fincraft-content-samples',
    revisionNumber: 1,
    submittedAt: '2026-10-02T14:00:00Z',
    feedback: 'Fantastic work! The tone is relatable, accurate, and completely free of fluff. Approved with pleasure.',
    status: 'approved'
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    projectId: 'proj-4',
    studentId: 'student-1',
    businessId: 'biz-3',
    amount: 3500,
    status: 'completed',
    createdAt: '2026-10-02T16:05:00Z',
    completedAt: '2026-10-02T16:10:00Z',
    referenceNumber: 'PI-UPI-20261002-8921',
    description: 'Payment for 5 SEO Blog Articles on Gen-Z Personal Finance',
  },
  {
    id: 'pay-2',
    projectId: 'proj-3',
    studentId: 'student-1',
    businessId: 'biz-2',
    amount: 3000,
    status: 'awaiting_approval',
    createdAt: '2026-10-05T10:00:00Z',
    referenceNumber: 'PI-ESCROW-20261005-4412',
    description: 'Escrow held for SaaS Checkout & Onboarding Testing',
  }
];

export const INITIAL_REVIEWS: Review[] = [
  // Business review for Aarav on Proj-4
  {
    id: 'rev-1',
    projectId: 'proj-4',
    reviewerId: 'biz-3',
    revieweeId: 'student-1',
    reviewerRole: 'business',
    rating: 5,
    comment: 'Aarav is an exceptional student contributor! He delivered all 5 articles ahead of the agreed deadline with zero spelling mistakes and great SEO structuring. Highly recommended for any startup content or technical task.',
    createdAt: '2026-10-03T11:00:00Z',
    isDemo: true,
  },
  // Aarav review for FinCraft on Proj-4
  {
    id: 'rev-2',
    projectId: 'proj-4',
    reviewerId: 'student-1',
    revieweeId: 'biz-3',
    reviewerRole: 'student',
    rating: 5,
    comment: 'Aditya provided crystal clear outlines and prompt feedback throughout. Payment was simulated and released immediately upon approval. A pleasure to work with!',
    createdAt: '2026-10-03T12:30:00Z',
    isDemo: true,
  },
  // Sample review for Priya Nair
  {
    id: 'rev-3',
    projectId: 'proj-demo-1',
    reviewerId: 'biz-1',
    revieweeId: 'student-2',
    reviewerRole: 'business',
    rating: 5,
    comment: 'Priya designed gorgeous Instagram templates for our launch! Creative, fast, and took feedback constructively.',
    createdAt: '2026-09-18T10:00:00Z',
    isDemo: true,
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'student-1',
    title: 'Revision Requested on Project #3',
    message: 'Sneha from Nexora SaaS requested revisions on your test report. Please check the feedback and resubmit.',
    link: '/student/workspace/proj-3',
    isRead: false,
    createdAt: '2026-10-08T12:00:00Z',
    type: 'revision'
  },
  {
    id: 'notif-2',
    userId: 'student-1',
    title: 'Payment Simulated: ₹3,500',
    message: 'Your payment of ₹3,500 for "Write 5 SEO Blog Articles" has been credited to your simulated balance.',
    link: '/student/earnings',
    isRead: true,
    createdAt: '2026-10-02T16:15:00Z',
    type: 'payment'
  },
  {
    id: 'notif-3',
    userId: 'biz-1',
    title: 'New Application Received',
    message: 'Priya Nair applied to "Create 10 Instagram Carousel Posts". Review proposal and portfolio.',
    link: '/business/applications',
    isRead: false,
    createdAt: '2026-10-06T14:25:00Z',
    type: 'application'
  },
  {
    id: 'notif-4',
    userId: 'biz-2',
    title: 'Work Submitted by Aarav Sharma',
    message: 'Aarav submitted testing deliverable revision #1 for "Test New SaaS Checkout".',
    link: '/business/workspace/proj-3',
    isRead: true,
    createdAt: '2026-10-08T11:05:00Z',
    type: 'submission'
  }
];

export const INITIAL_BOOKMARKS: Bookmark[] = [
  {
    id: 'bm-1',
    studentId: 'student-1',
    projectId: 'proj-5', // Aarav bookmarked the React Landing page project
    createdAt: '2026-10-08T10:00:00Z'
  }
];
