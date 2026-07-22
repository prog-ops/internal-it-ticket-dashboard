import React from 'react';
import { PlusCircle, RotateCcw, Sun, Moon } from 'lucide-react';
import { useTickets } from '../context/TicketContext';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const { setIsAddModalOpen, resetToSampleData } = useTickets();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-surface/80 backdrop-blur-md border-b border-edge sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-sm">
              <span className="text-white font-extrabold text-base leading-none tracking-tighter">IT</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-on-base tracking-tight leading-none">
                <span className="text-accent">I</span>Ticket
              </h1>
              <p className="text-[10px] text-muted mt-0.5">IT Support Dashboard</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={resetToSampleData}
              title="Reset to sample data"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-on-surface bg-surface-alt hover:bg-elevated border border-edge rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-muted" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-accent hover:bg-accent-hover rounded-lg shadow-sm transition-colors active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Ticket</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="ml-1 p-2 rounded-lg text-muted hover:text-on-base bg-surface-alt hover:bg-elevated border border-edge transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
