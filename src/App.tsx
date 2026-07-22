import React, { useState } from 'react';
import { TicketProvider } from './context/TicketContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { MetricsOverview } from './components/MetricsOverview';
import { FilterBar } from './components/FilterBar';
import { TicketList } from './components/TicketList';
import { TicketFormModal } from './components/TicketFormModal';
import { TicketDetailModal } from './components/TicketDetailModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';

const AppContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  return (
    <div className="min-h-screen bg-base text-on-base flex flex-col antialiased transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <MetricsOverview />
        <FilterBar viewMode={viewMode} setViewMode={setViewMode} />
        <TicketList viewMode={viewMode} />
      </main>

      <footer className="border-t border-edge bg-surface/60 py-4 text-center text-[11px] text-muted transition-colors">
        <span>ITicket — IT Support Dashboard</span>
      </footer>

      <TicketFormModal />
      <TicketDetailModal />
      <DeleteConfirmModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <TicketProvider>
        <AppContent />
      </TicketProvider>
    </ThemeProvider>
  );
}
