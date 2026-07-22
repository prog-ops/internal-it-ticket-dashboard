import type { Ticket, TicketStatus } from '../types/ticket';
import { StatusBadge, PriorityBadge, CategoryBadge } from './Badges';
import { Edit3, Trash2, MessageSquare, Bot } from 'lucide-react';
import { useTickets } from '../context/TicketContext';

interface TicketTableProps {
  tickets: Ticket[];
}

export const TicketTable: React.FC<TicketTableProps> = ({ tickets }) => {
  const { setSelectedTicketId, setEditingTicket, setDeletingTicketId, updateTicketStatus } = useTickets();

  return (
    <div className="bg-surface border border-edge rounded-xl overflow-hidden transition-colors" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-alt text-on-surface uppercase tracking-wider font-semibold border-b border-edge text-[10px]">
            <tr>
              <th className="px-4 py-3">ID & Title</th>
              <th className="px-3 py-3">Category</th>
              <th className="px-3 py-3">Priority</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Assigned To</th>
              <th className="px-3 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-edge-subtle text-on-surface">
            {tickets.map((t) => {
              const d = new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              return (
                <tr key={t.id} className="hover:bg-surface-alt transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-accent text-[11px] border border-accent/30 px-1.5 py-0.5 rounded bg-transparent">
                        {t.ticketNumber}
                      </span>
                      {t.aiTroubleshootingDraft && (
                        <span title="AI Troubleshooting Available"><Bot className="w-3.5 h-3.5 text-accent" /></span>
                      )}
                    </div>
                    <div onClick={() => setSelectedTicketId(t.id)}
                      className="text-on-base hover:text-accent cursor-pointer font-semibold line-clamp-1 mt-0.5">
                      {t.title}
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap"><CategoryBadge category={t.category} /></td>
                  <td className="px-3 py-3 whitespace-nowrap"><PriorityBadge priority={t.priority} /></td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <StatusBadge status={t.status} />
                      <select value={t.status} onChange={(e) => updateTicketStatus(t.id, e.target.value as TicketStatus)}
                        className="bg-input text-[10px] text-on-surface border border-edge rounded px-1 py-0.5 focus:outline-none cursor-pointer">
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-muted">{t.assignedPerson || 'Unassigned'}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-muted">{d}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-0.5">
                      <button onClick={() => setSelectedTicketId(t.id)}
                        className="p-1.5 text-muted hover:text-accent hover:bg-surface-alt rounded transition-colors flex items-center gap-1" title="Details">
                        <MessageSquare className="w-3.5 h-3.5" /><span className="text-[10px]">{t.comments.length}</span>
                      </button>
                      <button onClick={() => setEditingTicket(t)}
                        className="p-1.5 text-muted hover:text-amber-500 hover:bg-surface-alt rounded transition-colors" title="Edit">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeletingTicketId(t.id)}
                        className="p-1.5 text-muted hover:text-rose-500 hover:bg-surface-alt rounded transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
