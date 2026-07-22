import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import type { FilterStatus, FilterPriority, FilterCategory, SortBy } from '../types/ticket';

interface FilterBarProps {
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ viewMode, setViewMode }) => {
  const {
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    priorityFilter, setPriorityFilter,
    categoryFilter, setCategoryFilter,
    sortBy, setSortBy,
    clearFilters,
    filteredTickets, tickets,
  } = useTickets();

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'All' || priorityFilter !== 'All' || categoryFilter !== 'All';

  const selectCls = 'bg-transparent text-xs text-on-base font-medium focus:outline-none cursor-pointer';
  const pillCls = 'flex items-center gap-1.5 bg-surface-alt border border-edge rounded-lg px-2.5 py-1.5';

  return (
    <div className="bg-surface border border-edge rounded-xl p-4 mb-6 transition-colors" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">

        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets by title, #ID, assignee..."
            className="w-full bg-input text-on-base text-xs pl-10 pr-9 py-2.5 rounded-lg border border-edge focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-on-base">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className={pillCls}>
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as FilterStatus)} className={selectCls}>
              <option value="All">Status: All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className={pillCls}>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as FilterPriority)} className={selectCls}>
              <option value="All">Priority: All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className={pillCls}>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as FilterCategory)} className={selectCls}>
              <option value="All">Category: All</option>
              <option value="Hardware">Hardware</option>
              <option value="Network">Network</option>
              <option value="Software">Software</option>
              <option value="Access & Security">Access & Security</option>
              <option value="System Error">System Error</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={pillCls}>
            <ArrowUpDown className="w-3.5 h-3.5 text-muted" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)} className={selectCls}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="priority-desc">Priority ↓</option>
              <option value="priority-asc">Priority ↑</option>
              <option value="status">Status</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="px-2.5 py-1.5 text-xs text-muted hover:text-on-base bg-surface-alt hover:bg-elevated border border-edge rounded-lg transition-colors">
              Clear
            </button>
          )}

          {/* View toggle */}
          <div className="flex items-center bg-surface-alt border border-edge rounded-lg p-0.5 ml-auto sm:ml-0">
            <button onClick={() => setViewMode('grid')} title="Grid"
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-accent text-white' : 'text-muted hover:text-on-base'}`}>
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setViewMode('table')} title="Table"
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-accent text-white' : 'text-muted hover:text-on-base'}`}>
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Count */}
      <div className="mt-3 pt-3 border-t border-edge-subtle flex items-center justify-between text-[11px] text-muted">
        <span>Showing <strong className="text-on-base">{filteredTickets.length}</strong> of <strong className="text-on-base">{tickets.length}</strong> tickets</span>
        {hasActiveFilters && <span className="text-accent">Filtered</span>}
      </div>
    </div>
  );
};
