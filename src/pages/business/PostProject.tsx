import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { BusinessSidebar } from '../../components/dashboard/BusinessSidebar';
import { Button } from '../../components/common/Button';
import { ProjectCategory } from '../../types';
import confetti from 'canvas-confetti';
import { 
  PlusCircle, 
  Trash2, 
  IndianRupee, 
  Calendar, 
  Clock, 
  Globe2, 
  MapPin, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

const CATEGORIES: ProjectCategory[] = [
  'Technology',
  'Design',
  'Data Analytics',
  'Content',
  'Marketing',
  'Video & Media',
  'Research',
];

export const PostProject: React.FC = () => {
  const { currentUser, isBusiness } = useAuth();
  const { addProject } = useData();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Technology');
  const [description, setDescription] = useState('');
  
  // Deliverables list
  const [deliverables, setDeliverables] = useState<string[]>([
    'Clean, tested deliverable file or repository link',
    'Short summary documentation explaining steps taken'
  ]);
  const [newDeliverable, setNewDeliverable] = useState('');

  // Skills
  const [skillsString, setSkillsString] = useState('React, Tailwind CSS, TypeScript');

  // Budget & Timeline
  const [budget, setBudget] = useState<number>(3000);
  const [duration, setDuration] = useState('4 days');
  
  // Dates
  const [appDeadline, setAppDeadline] = useState('2026-10-25');
  const [projDeadline, setProjDeadline] = useState('2026-10-29');

  const [openings, setOpenings] = useState<number>(1);
  const [isRemote, setIsRemote] = useState<boolean>(true);
  const [location, setLocation] = useState('Delhi NCR');
  const [additionalInstructions, setAdditionalInstructions] = useState('');

  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    setDeliverables([...deliverables, newDeliverable.trim()]);
    setNewDeliverable('');
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!currentUser) return;

    if (title.trim().length < 10) {
      setFormError('Please enter a descriptive project title (at least 10 characters).');
      return;
    }

    if (description.trim().length < 30) {
      setFormError('Please provide a detailed project description (at least 30 characters).');
      return;
    }

    if (deliverables.length === 0) {
      setFormError('Please specify at least one required deliverable.');
      return;
    }

    if (budget < 500) {
      setFormError('Minimum stipend budget is ₹500.');
      return;
    }

    const parsedSkills = skillsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (parsedSkills.length === 0) {
      setFormError('Please specify at least one required skill tag.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = addProject({
        businessId: currentUser.id,
        title: title.trim(),
        description: description.trim(),
        category,
        skills: parsedSkills,
        deliverables,
        budget: Number(budget),
        duration: duration.trim(),
        applicationDeadline: appDeadline,
        projectDeadline: projDeadline,
        openings: Number(openings),
        isRemote,
        location: isRemote ? undefined : location.trim(),
        additionalInstructions: additionalInstructions.trim() || undefined,
      });

      try {
        confetti({ particleCount: 80, spread: 70 });
      } catch (e) {}

      success('Project Published!', `"${created.title}" is now live on the marketplace and open for applications.`);
      navigate(`/projects/${created.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <BusinessSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div>
            <h1 className="text-2xl font-black text-navy-800 tracking-tight">
              Post a New Paid Micro-Project
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Define scope, required deliverables, stipend in INR, and hire vetted college students in Delhi NCR.
            </p>
          </div>

          {formError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-6">
            {/* Title & Category */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">
                  Project Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Clean and Organize Q2 B2B Sales Lead Database in Excel"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Project Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Required Skills (comma separated) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={skillsString}
                    onChange={(e) => setSkillsString(e.target.value)}
                    placeholder="e.g. Excel, Data Cleaning, Pivot Tables"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-navy-800 mb-1">
                Detailed Project Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the background of your business, what the problem is, and exactly what the student will be doing..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 leading-relaxed"
              />
            </div>

            {/* Required Deliverables List */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-navy-800">
                Required Deliverables Checklist <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddDeliverable();
                    }
                  }}
                  placeholder="e.g. Exported 1080x1350 PNG images with editable Figma source"
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                />
                <Button type="button" variant="outline" size="sm" onClick={handleAddDeliverable}>
                  Add Item
                </Button>
              </div>

              {/* Items List */}
              <ul className="space-y-2">
                {deliverables.map((del, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-accent/10 text-accent font-bold text-[10px] flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span>{del}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDeliverable(index)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Budget & Timeline */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                Stipend, Duration &amp; Deadlines
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Stipend Budget in INR (₹) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="text-slate-400 font-bold absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                    <input
                      type="number"
                      required
                      min={500}
                      step={100}
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 font-bold"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Held in escrow upon hiring</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Estimated Duration <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 3 days, 1 week"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Application Deadline <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={appDeadline}
                    onChange={(e) => setAppDeadline(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Project Completion Deadline <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={projDeadline}
                    onChange={(e) => setProjDeadline(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Location & Instructions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-xs font-semibold text-navy-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRemote}
                    onChange={(e) => setIsRemote(e.target.checked)}
                    className="rounded text-accent focus:ring-accent h-4 w-4 border-slate-300"
                  />
                  <span>100% Remote Project (Students can work anywhere in India)</span>
                </label>
              </div>

              {!isRemote && (
                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">
                    Physical Location Requirements
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Connaught Place, New Delhi"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">
                  Additional Instructions / Guidance for Candidates
                </label>
                <textarea
                  rows={2}
                  value={additionalInstructions}
                  onChange={(e) => setAdditionalInstructions(e.target.value)}
                  placeholder="e.g. Please attach sample Canva templates or portfolio link in your application proposal."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => navigate('/business/dashboard')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="accent"
                size="md"
                isLoading={isSubmitting}
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                Publish Project to Marketplace
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
