# PocketIntern MVP Prototype

> **"Real Projects. Real Pay. Real Proof."**  
> A skill-based micro-internship marketplace connecting college students with startups and SMBs for short, paid assignments (2 to 7 days).

---

## 🌟 Overview & Core Value Proposition

College students struggle to secure their first traditional 3-month internship because employers demand prior corporate experience. Meanwhile, fast-moving startups and small businesses across Delhi NCR and India need agile help with immediate tasks (social media creatives, Excel lead cleaning, website testing, SEO articles, and React UI components) but lack the budget or administrative bandwidth for full-time contracts.

**PocketIntern solves this:**
1. **Defined Micro-Projects:** Startups post tasks with explicit deliverables, deadlines, and INR stipends held in escrow.
2. **Skill-First Applications:** Students pitch their approach with targeted proposals and proof samples instead of long resumes.
3. **Escrow Protected:** Payouts are reserved before work starts and released upon deliverable sign-off.
4. **Verifiable Proof-of-Work:** Every completed assignment adds verified founder ratings and reviews directly to the student's public portfolio.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### 1. Installation
In the project directory:
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 👥 Demo Personas (1-Click Switching)

The prototype includes a **Demo Bar** sticky at the top of the interface allowing instant, one-click persona switching without passwords:

| Persona | Role | Entity / College | Key Features to Test |
| :--- | :--- | :--- | :--- |
| **Aarav Sharma** | Student | Delhi Technological University (DTU) | Has 1 in-progress gig (Nexora SaaS), 1 completed gig, earnings ledger, portfolio |
| **Priya Nair** | Student | NIFT New Delhi | Design student with active shortlisted application |
| **Vikram Malhotra** | Business | UrbanPulse Media (Gurugram) | Has 5 posted projects, active applicant queue |
| **Sneha Kapoor** | Business | Nexora SaaS (Noida) | Assigned client for Aarav; review deliverables, request revision, approve payout |
| **PocketIntern Ops** | Admin | PocketIntern HQ | Platform governance, escrow volume, moderation queue |

---

## 🧭 Evaluation Test Scenarios

### Test A: Student Experience
1. Click **Aarav (Student)** in the top demo bar.
2. Navigate to **Explore Projects** (`/projects`).
3. Search for a skill (e.g. `Canva` or `React`) and filter by Category (e.g. *Design*).
4. Click on any project card (e.g. *Create 10 Instagram Posts*) and click **Apply**.
5. Fill in the proposal and submit.
6. Verify the application appears in **My Applications** (`/student/applications`). Duplicate applications to the same project are prevented.

### Test B: Business Experience
1. Click **UrbanPulse (Business)** in the top demo bar.
2. Click **Post a Project** (`/business/post-project`).
3. Add a project with title, description, budget (₹), and deliverable checklist.
4. Publish the project — observe that it immediately appears in the live marketplace and on the business dashboard.
5. Go to **Applications Received** (`/business/applications`).
6. Click **Review Candidate** on any applicant to inspect their proposal, portfolio, and click **Accept & Hire Student**.

### Test C: Workspace Deliverable, Revision & Approval
1. Switch to **Sneha Kapoor (Nexora SaaS)** or **Aarav Sharma (Student)**.
2. Open the workspace for the active project: *Test New SaaS Checkout*.
3. **Student side:** Fill in notes, external link, and submit Revision #2.
4. **Business side:** Review the submission. You can either click **Request Revisions** (with mandatory feedback) or click **Approve Work & Release Payout**.
5. Upon approval:
   - Status transitions to `Completed`.
   - Simulated payment of ₹3,000 moves to the student's **Earnings** ledger.
   - Both parties unlock reciprocal 5-star written reviews.
   - The completed project and review automatically appear on Aarav's **Public Portfolio** (`/portfolio/student-1`).

### Test D: LocalStorage Data Persistence
- Make any edit, post a project, or complete a milestone.
- Refresh the browser (`F5` / `Cmd+R`).
- All state changes, notifications, and simulated payments persist reliably in `localStorage`.
- Click **Reset Seed** in the top bar anytime to restore the initial test state.

---

## 🛠️ Technology Stack & Architecture

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS with semantic brand tokens:
  - Deep Navy: `#14213D`
  - Vibrant Blue: `#4361EE`
  - Fresh Green: `#2EC4B6`
  - Background: `#F8FAFC`
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
- **State & Storage:** Reactive React Contexts (`AuthContext`, `DataContext`, `ToastContext`) with resilient `localStorage` synchronization.

---

## 🔮 Backend Integration (Supabase Ready)

The domain data models in [`src/types/index.ts`](file:///Users/suryanshpandey/Desktop/untitled%20folder/src/types/index.ts) map 1-to-1 to relational tables:
- `users`, `student_profiles`, `business_profiles`
- `projects`, `applications`, `project_assignments`, `submissions`
- `payments`, `reviews`, `notifications`, `bookmarks`

When ready to connect Supabase:
1. Initialize a Supabase project.
2. Run SQL migrations matching the schema defined in `src/types/index.ts`.
3. Enable Row-Level Security (RLS) policies matching the current application checks.
4. Swap the `DataProvider` storage adapter with Supabase client queries.

---

*PocketIntern — Empowering India's next generation of builders.*
