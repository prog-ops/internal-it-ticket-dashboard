import React from 'react';
import { useTickets } from '../context/TicketContext';
import { TicketCard } from './TicketCard';
import { TicketTable } from './TicketTable';
import { Inbox, RotateCcw, PlusCircle } from 'lucide-react';

interface TicketListProps {
  viewMode: 'grid' | 'table';
}

export const TicketList: React.FC<TicketListProps> = ({ viewMode }) => {
  const { filteredTickets, clearFilters, setIsAddModalOpen } = useTickets();

  if (filteredTickets.length === 0) {
    return (
      <div className="bg-surface border border-edge border-dashed rounded-2xl p-12 text-center my-6 transition-colors">
        <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center mx-auto mb-4 text-muted">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="text-base font-semibold text-on-base mb-1">No Tickets Found</h3>
        <p className="text-xs text-muted max-w-sm mx-auto mb-6">
          No IT support tickets match your active filter or search criteria.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-on-surface bg-surface-alt hover:bg-elevated border border-edge rounded-lg transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /><span>Clear Filters</span>
          </button>
          <button onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-accent hover:bg-accent-hover rounded-lg transition-colors">
            <PlusCircle className="w-3.5 h-3.5" /><span>Create Ticket</span>
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === 'table') return <TicketTable tickets={filteredTickets} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
    </div>
  );
};
