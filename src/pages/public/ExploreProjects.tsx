import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ProjectFilters } from '../../components/projects/ProjectFilters';
import { ApplicationModal } from '../../components/projects/ApplicationModal';
import { EmptyState } from '../../components/common/EmptyState';
import { Project } from '../../types';
import { Compass, Bookmark, RotateCcw, Sparkles } from 'lucide-react';

export const ExploreProjects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects, isBookmarked } = useData();
  const { currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [budgetRange, setBudgetRange] = useState<string>('All');
  const [durationFilter, setDurationFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState<boolean>(false);

  // Selected project for application modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Sync category with URL query param if present
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleApplyClick = (project: Project) => {
    setSelectedProject(project);
    setIsApplyModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setBudgetRange('All');
    setDurationFilter('All');
    setSortBy('newest');
    setShowBookmarkedOnly(false);
    setSearchParams({});
  };

  // Filtered and sorted projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.description.toLowerCase().includes(query);
        const matchesSkill = project.skills.some((s) => s.toLowerCase().includes(query));
        const matchesCat = project.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSkill && !matchesCat) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && project.category !== selectedCategory) {
        return false;
      }

      // Budget Range
      if (budgetRange === 'under_2000' && project.budget >= 2000) return false;
      if (budgetRange === '2000_3500' && (project.budget < 2000 || project.budget > 3500)) return false;
      if (budgetRange === 'above_3500' && project.budget <= 3500) return false;

      // Duration
      if (durationFilter === 'short' && !project.duration.toLowerCase().includes('1') && !project.duration.toLowerCase().includes('2') && !project.duration.toLowerCase().includes('3')) {
        return false;
      }
      if (durationFilter === 'medium' && (project.duration.toLowerCase().includes('1 day') || project.duration.toLowerCase().includes('2 day') || project.duration.toLowerCase().includes('3 day'))) {
        return false;
      }

      // Bookmarked Only
      if (showBookmarkedOnly) {
        if (!currentUser || !isBookmarked(currentUser.id, project.id)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'budget_desc') {
        return b.budget - a.budget;
      }
      if (sortBy === 'budget_asc') {
        return a.budget - b.budget;
      }
      return 0;
    });
  }, [projects, searchQuery, selectedCategory, budgetRange, durationFilter, sortBy, showBookmarkedOnly, currentUser, isBookmarked]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-accent/10 text-accent">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-accent uppercase tracking-wider">
              Project Discovery
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-800 tracking-tight">
            Explore Paid Micro-Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse short-term paid gigs across design, development, content, and data analytics.
          </p>
        </div>

        {currentUser?.role === 'student' && (
          <button
            onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 self-start sm:self-auto ${
              showBookmarkedOnly
                ? 'bg-accent text-white border-accent shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showBookmarkedOnly ? 'fill-white' : ''}`} />
            <span>Saved Projects</span>
          </button>
        )}
      </div>

      {/* Filters Toolbar */}
      <ProjectFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchParams(cat === 'All' ? {} : { category: cat });
        }}
        budgetRange={budgetRange}
        setBudgetRange={setBudgetRange}
        durationFilter={durationFilter}
        setDurationFilter={setDurationFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleResetFilters}
        totalResults={filteredProjects.length}
      />

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={<Compass className="w-6 h-6" />}
          title="No projects match your filter"
          description="Try loosening your search terms, selecting 'All' categories, or clearing budget filters."
          actionText="Reset All Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onApplyClick={handleApplyClick}
            />
          ))}
        </div>
      )}

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
