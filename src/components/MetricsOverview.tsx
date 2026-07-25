import React from 'react';
import { Ticket, AlertCircle, Clock, CheckCircle2, AlertTriangle, Filter } from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import type { FilterStatus, FilterPriority } from '../types/ticket';

export const MetricsOverview: React.FC = () => {
  const { metrics, statusFilter, priorityFilter, setStatusFilter, setPriorityFilter, clearFilters } = useTickets();

  const isFiltered = statusFilter !== 'All' || priorityFilter !== 'All';

  const cards = [
    {
      id: 'total',
      label: 'Total Tickets',
      value: metrics.totalTickets,
      icon: Ticket,
      ring: 'ring-accent/40',
      tint: 'from-blue-500/8 to-cyan-500/5 border-blue-500/20 dark:from-blue-500/12 dark:to-cyan-500/8 dark:border-blue-500/25',
      iconClr: 'text-blue-600 dark:text-blue-400 bg-blue-500/10',
      active: statusFilter === 'All' && priorityFilter === 'All',
      onClick: () => clearFilters(),
    },
    {
      id: 'open',
      label: 'Open',
      value: metrics.openTickets,
      icon: AlertCircle,
      ring: 'ring-sky-500/40',
      tint: 'from-sky-500/8 to-indigo-500/5 border-sky-500/20 dark:from-sky-500/12 dark:to-indigo-500/8 dark:border-sky-500/25',
      iconClr: 'text-sky-600 dark:text-sky-400 bg-sky-500/10',
      active: statusFilter === 'Open',
      onClick: () => { clearFilters(); setStatusFilter('Open' as FilterStatus); },
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      value: metrics.inProgressTickets,
      icon: Clock,
      ring: 'ring-amber-500/40',
      tint: 'from-amber-500/8 to-yellow-500/5 border-amber-500/20 dark:from-amber-500/12 dark:to-yellow-500/8 dark:border-amber-500/25',
      iconClr: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
      active: statusFilter === 'In Progress',
      onClick: () => { clearFilters(); setStatusFilter('In Progress' as FilterStatus); },
    },
    {
      id: 'high-priority',
      label: 'High & Critical',
      value: metrics.highPriorityTickets,
      icon: AlertTriangle,
      ring: 'ring-rose-500/40',
      tint: 'from-rose-500/8 to-red-500/5 border-rose-500/20 dark:from-rose-500/12 dark:to-red-500/8 dark:border-rose-500/25',
      iconClr: 'text-rose-600 dark:text-rose-400 bg-rose-500/10',
      active: priorityFilter === 'High/Critical',
      onClick: () => { clearFilters(); setPriorityFilter('High/Critical' as FilterPriority); },
    },
    {
      id: 'resolved',
      label: 'Resolved / Closed',
      value: metrics.resolvedTickets + metrics.closedTickets,
      icon: CheckCircle2,
      ring: 'ring-emerald-500/40',
      tint: 'from-emerald-500/8 to-teal-500/5 border-emerald-500/20 dark:from-emerald-500/12 dark:to-teal-500/8 dark:border-emerald-500/25',
      iconClr: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
      active: statusFilter === 'Resolved/Closed',
      onClick: () => { clearFilters(); setStatusFilter('Resolved/Closed' as FilterStatus); },
    },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
          <span>Overview</span>
          {isFiltered && (
            <span className="inline-flex items-center gap-1 text-[10px] text-accent border border-accent/30 bg-accent-ghost px-2 py-0.5 rounded-full">
              <Filter className="w-2.5 h-2.5" /> Filtered
            </span>
          )}
        </h2>
        {isFiltered && (
          <button onClick={clearFilters} className="text-xs text-accent hover:text-accent-hover transition-colors">
            Show All
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={card.onClick}
              className={`text-left p-4 rounded-xl border transition-all duration-200 bg-gradient-to-br ${card.tint} ${
                card.active
                  ? `ring-2 ${card.ring} scale-[1.02]`
                  : 'hover:translate-y-[-1px]'
              }`}
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-on-surface">{card.label}</span>
                <div className={`p-1.5 rounded-lg ${card.iconClr}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-on-base tracking-tight">{card.value}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
