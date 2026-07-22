import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTickets } from '../context/TicketContext';

export const DeleteConfirmModal: React.FC = () => {
  const { tickets, deletingTicketId, setDeletingTicketId, deleteTicket } = useTickets();
  if (!deletingTicketId) return null;

  const t = tickets.find(t => t.id === deletingTicketId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface border border-edge rounded-2xl w-full max-w-md p-6" style={{ boxShadow: 'var(--shadow-lg)' }}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-on-base mb-1">Delete Ticket</h3>
            <p className="text-xs text-on-surface leading-relaxed">
              Are you sure you want to delete <strong className="text-on-base">{t?.ticketNumber}</strong>? This cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-edge">
          <button onClick={() => setDeletingTicketId(null)}
            className="px-4 py-2 text-xs text-on-surface hover:bg-surface-alt border border-edge rounded-lg transition-colors">Cancel</button>
          <button onClick={() => { if (deletingTicketId) deleteTicket(deletingTicketId); }}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm transition-all">Delete</button>
        </div>
      </div>
    </div>
  );
};
