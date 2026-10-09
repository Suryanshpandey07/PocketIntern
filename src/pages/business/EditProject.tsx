import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { BusinessSidebar } from '../../components/dashboard/BusinessSidebar';
import { Button } from '../../components/common/Button';
import { ProjectCategory } from '../../types';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';

const CATEGORIES: ProjectCategory[] = [
  'Technology',
  'Design',
  'Data Analytics',
  'Content',
  'Marketing',
  'Video & Media',
  'Research',
];

export const EditProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { currentUser } = useAuth();
  const { getProject, updateProject } = useData();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const project = projectId ? getProject(projectId) : undefined;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Technology');
  const [description, setDescription] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [skillsString, setSkillsString] = useState('');
  const [budget, setBudget] = useState<number>(3000);
  const [duration, setDuration] = useState('');
  const [appDeadline, setAppDeadline] = useState('');
  const [projDeadline, setProjDeadline] = useState('');

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setCategory(project.category);
      setDescription(project.description);
      setDeliverables(project.deliverables || []);
      setSkillsString(project.skills.join(', '));
      setBudget(project.budget);
      setDuration(project.duration);
      setAppDeadline(project.applicationDeadline);
      setProjDeadline(project.projectDeadline);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-navy-800">Project Not Found</h2>
        <Button variant="accent" size="sm" onClick={() => navigate('/business/projects')} className="mt-4">
          Back to Projects
        </Button>
      </div>
    );
  }

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
    const parsedSkills = skillsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateProject(project.id, {
      title: title.trim(),
      category,
      description: description.trim(),
      deliverables,
      skills: parsedSkills,
      budget: Number(budget),
      duration: duration.trim(),
      applicationDeadline: appDeadline,
      projectDeadline: projDeadline,
    });

    success('Project Updated!', 'Your changes have been saved.');
    navigate('/business/projects');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <BusinessSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/business/projects')}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-navy-800 tracking-tight">
                Edit Micro-Project
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Update scope, timeline, and stipend for "{project.title}"
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-6">
            <div>
              <label className="block text-xs font-bold text-navy-800 mb-1">Project Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  required
                  value={skillsString}
                  onChange={(e) => setSkillsString(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-800 mb-1">Detailed Description</label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 leading-relaxed"
              />
            </div>

            {/* Deliverables */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-navy-800">Deliverables</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  placeholder="Add another deliverable item..."
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
                <Button type="button" variant="outline" size="sm" onClick={handleAddDeliverable}>
                  Add
                </Button>
              </div>

              <ul className="space-y-2">
                {deliverables.map((del, i) => (
                  <li key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span>{del}</span>
                    <button type="button" onClick={() => handleRemoveDeliverable(i)} className="text-slate-400 hover:text-rose-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Budget & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">Budget (₹ INR)</label>
                <input
                  type="number"
                  required
                  min={500}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-bold text-navy-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">Duration</label>
                <input
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">Project Deadline</label>
                <input
                  type="date"
                  required
                  value={projDeadline}
                  onChange={(e) => setProjDeadline(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-800"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button type="button" variant="outline" size="md" onClick={() => navigate('/business/projects')}>
                Cancel
              </Button>
              <Button type="submit" variant="accent" size="md" leftIcon={<Save className="w-4 h-4" />}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
