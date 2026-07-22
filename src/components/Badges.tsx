import React from 'react';
import type { TicketStatus, TicketPriority, TicketCategory } from '../types/ticket';
import { AlertCircle, Clock, CheckCircle2, MinusCircle, AlertTriangle, ShieldAlert, Monitor, Wifi, Code2, KeyRound, Bug, Folder } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────
   Status badges — keep their background tints (colored chips)
   ──────────────────────────────────────────────────────────────── */

export const StatusBadge: React.FC<{ status: TicketStatus; className?: string }> = ({ status, className = '' }) => {
  const map: Record<TicketStatus, { bg: string; text: string; Icon: typeof AlertCircle }> = {
    Open:          { bg: 'bg-sky-500/12 border-sky-500/25',       text: 'text-sky-600 dark:text-sky-400',       Icon: AlertCircle },
    'In Progress': { bg: 'bg-amber-500/12 border-amber-500/25',   text: 'text-amber-600 dark:text-amber-400',   Icon: Clock },
    Resolved:      { bg: 'bg-emerald-500/12 border-emerald-500/25', text: 'text-emerald-600 dark:text-emerald-400', Icon: CheckCircle2 },
    Closed:        { bg: 'bg-neutral-500/12 border-neutral-500/25', text: 'text-neutral-500 dark:text-neutral-400', Icon: MinusCircle },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${className}`}>
      <s.Icon className="w-3.5 h-3.5" />
      <span>{status}</span>
    </span>
  );
};

/* ────────────────────────────────────────────────────────────────
   Priority badges — text & border only, NO background fill
   ──────────────────────────────────────────────────────────────── */

export const PriorityBadge: React.FC<{ priority: TicketPriority; className?: string }> = ({ priority, className = '' }) => {
  const map: Record<TicketPriority, { text: string; border: string; Icon?: typeof ShieldAlert }> = {
    Critical: { text: 'text-rose-600 dark:text-rose-400',     border: 'border-rose-400/50 dark:border-rose-500/40', Icon: ShieldAlert },
    High:     { text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-400/50 dark:border-orange-500/40', Icon: AlertTriangle },
    Medium:   { text: 'text-amber-600 dark:text-amber-400',   border: 'border-amber-400/40 dark:border-amber-500/30' },
    Low:      { text: 'text-on-surface',                       border: 'border-edge' },
  };
  const p = map[priority];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-transparent border ${p.border} ${p.text} ${className}`}>
      {p.Icon && <p.Icon className="w-3 h-3" />}
      <span>{priority}</span>
    </span>
  );
};

/* ────────────────────────────────────────────────────────────────
   Category badges — text & border only, NO background fill
   ──────────────────────────────────────────────────────────────── */

export const CategoryBadge: React.FC<{ category: TicketCategory; className?: string }> = ({ category, className = '' }) => {
  const icons: Record<TicketCategory, typeof Folder> = {
    Hardware:            Monitor,
    Network:             Wifi,
    Software:            Code2,
    'Access & Security': KeyRound,
    'System Error':      Bug,
    Other:               Folder,
  };
  const Icon = icons[category];

  return (
    <span className={`inline-flex items-center gap-1 text-[11px] text-on-surface bg-transparent border border-edge px-2 py-0.5 rounded ${className}`}>
      <Icon className="w-3 h-3 text-accent" />
      <span>{category}</span>
    </span>
  );
};
