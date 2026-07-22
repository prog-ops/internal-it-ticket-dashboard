import React from 'react';
import type { TicketStatus } from '../types/ticket';
import { StatusBadge, PriorityBadge, CategoryBadge } from './Badges';
import { User, Calendar, MessageSquare, Edit3, Trash2, Bot } from 'lucide-react';
import { useTickets } from '../context/TicketContext';

interface TicketCardProps {
  ticket: import('../types/ticket').Ticket;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const { setSelectedTicketId, setEditingTicket, setDeletingTicketId, updateTicketStatus } = useTickets();

  const formattedDate = new Date(ticket.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div
      className="bg-surface border border-edge hover:border-edge-subtle rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between group"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Top */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {/* Ticket number — text+border only */}
            <span className="text-xs font-mono font-bold text-accent border border-accent/30 bg-transparent px-2 py-0.5 rounded">
              {ticket.ticketNumber}
            </span>
            <CategoryBadge category={ticket.category} />
          </div>
          <PriorityBadge priority={ticket.priority} />
        </div>

        <h3
          onClick={() => setSelectedTicketId(ticket.id)}
          className="text-sm font-semibold text-on-base group-hover:text-accent transition-colors line-clamp-1 cursor-pointer mb-1.5"
        >
          {ticket.title}
        </h3>
        <p className="text-xs text-muted line-clamp-2 mb-4 min-h-[32px]">
          {ticket.description}
        </p>
      </div>

      {/* Meta */}
      <div>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-on-surface py-2.5 border-t border-b border-edge-subtle mb-3">
          <div className="flex items-center gap-1.5 truncate">
            <User className="w-3.5 h-3.5 text-muted flex-shrink-0" />
            <span className="truncate">{ticket.assignedPerson || 'Unassigned'}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Calendar className="w-3.5 h-3.5 text-muted flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <StatusBadge status={ticket.status} />
            <select
              value={ticket.status}
              onChange={(e) => updateTicketStatus(ticket.id, e.target.value as TicketStatus)}
              className="bg-input text-[10px] text-on-surface border border-edge rounded px-1.5 py-1 focus:outline-none cursor-pointer"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="flex items-center gap-0.5">
            {ticket.aiTroubleshootingDraft && (
              <span title="AI Troubleshooting Available" className="p-1 text-accent">
                <Bot className="w-3.5 h-3.5" />
              </span>
            )}
            <button onClick={() => setSelectedTicketId(ticket.id)}
              className="p-1.5 text-muted hover:text-accent hover:bg-surface-alt rounded transition-colors flex items-center gap-1 text-xs" title="Details">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="text-[10px]">{ticket.comments.length}</span>
            </button>
            <button onClick={() => setEditingTicket(ticket)}
              className="p-1.5 text-muted hover:text-amber-500 hover:bg-surface-alt rounded transition-colors" title="Edit">
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setDeletingTicketId(ticket.id)}
              className="p-1.5 text-muted hover:text-rose-500 hover:bg-surface-alt rounded transition-colors" title="Delete">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
