import React from 'react';
import { ProjectCategory } from '../../types';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  budgetRange: string;
  setBudgetRange: (range: string) => void;
  durationFilter: string;
  setDurationFilter: (duration: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onReset: () => void;
  totalResults: number;
}

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Technology',
  'Design',
  'Data Analytics',
  'Content',
  'Video & Media',
  'Research',
];

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  budgetRange,
  setBudgetRange,
  durationFilter,
  setDurationFilter,
  sortBy,
  setSortBy,
  onReset,
  totalResults,
}) => {
  const isFiltered =
    searchQuery ||
    selectedCategory !== 'All' ||
    budgetRange !== 'All' ||
    durationFilter !== 'All' ||
    sortBy !== 'newest';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-4">
      {/* Top Bar: Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, skill (e.g. React, Canva, Excel), or topic..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-48">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs pl-9 pr-7 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-700 font-medium cursor-pointer appearance-none"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="budget_desc">Sort: Budget (High to Low)</option>
              <option value="budget_asc">Sort: Budget (Low to High)</option>
            </select>
          </div>

          {isFiltered && (
            <button
              onClick={onReset}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors flex items-center gap-1 whitespace-nowrap"
              title="Reset all filters"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-navy-800 text-white shadow-subtle'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Secondary Filter Row: Budget & Duration */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
        <div className="flex flex-wrap items-center gap-4 text-slate-600">
          {/* Budget Range */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium text-[11px]">Budget:</span>
            <select
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="All">All Budgets</option>
              <option value="under_2000">Under ₹2,000</option>
              <option value="2000_3500">₹2,000 – ₹3,500</option>
              <option value="above_3500">Above ₹3,500</option>
            </select>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium text-[11px]">Duration:</span>
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="All">All Durations</option>
              <option value="short">1 - 3 Days (Quick gig)</option>
              <option value="medium">4 - 7 Days (1 Week)</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-slate-500 font-medium text-xs">
          Showing <span className="font-bold text-navy-800">{totalResults}</span> {totalResults === 1 ? 'project' : 'projects'}
        </div>
      </div>
    </div>
  );
};
