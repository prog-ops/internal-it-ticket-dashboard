import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { 
  Ticket, 
  TicketStatus, 
  TicketPriority, 
  DashboardMetrics, 
  FilterStatus, 
  FilterPriority, 
  FilterCategory, 
  SortBy,
  Comment
} from '../types/ticket';
import { INITIAL_TICKETS } from '../data/mockTickets';

const LOCAL_STORAGE_KEY = 'lead_geeks_it_dashboard_tickets_v1';

interface TicketContextType {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  metrics: DashboardMetrics;
  
  // Filter & Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: FilterStatus;
  setStatusFilter: (status: FilterStatus) => void;
  priorityFilter: FilterPriority;
  setPriorityFilter: (priority: FilterPriority) => void;
  categoryFilter: FilterCategory;
  setCategoryFilter: (category: FilterCategory) => void;
  sortBy: SortBy;
  setSortBy: (sort: SortBy) => void;
  clearFilters: () => void;

  // Selected Ticket for detail / edit
  selectedTicketId: string | null;
  setSelectedTicketId: (id: string | null) => void;
  
  // Modals state
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  editingTicket: Ticket | null;
  setEditingTicket: (ticket: Ticket | null) => void;
  deletingTicketId: string | null;
  setDeletingTicketId: (id: string | null) => void;

  // CRUD actions
  addTicket: (ticket: Omit<Ticket, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  deleteTicket: (id: string) => void;
  addComment: (ticketId: string, content: string, author?: string) => void;
  generateAiTroubleshooting: (ticketId: string) => Promise<string>;
  resetToSampleData: () => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.error('Failed to load tickets from localStorage', err);
    }
    return INITIAL_TICKETS;
  });

  // Save to LocalStorage whenever tickets state changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tickets));
    } catch (err) {
      console.error('Failed to save tickets to localStorage', err);
    }
  }, [tickets]);

  // Filters & Sorting state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('All');
  const [priorityFilter, setPriorityFilter] = useState<FilterPriority>('All');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('All');
  const [sortBy, setSortBy] = useState<SortBy>('newest');

  // Modals state
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [deletingTicketId, setDeletingTicketId] = useState<string | null>(null);

  // Clear all filters back to default
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
    setSortBy('newest');
  };

  // Calculate Metrics dynamically based on all tickets
  const metrics: DashboardMetrics = useMemo(() => {
    const totalTickets = tickets.length;
    const openTickets = tickets.filter(t => t.status === 'Open').length;
    const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;
    const highPriorityTickets = tickets.filter(t => t.priority === 'High' || t.priority === 'Critical').length;
    const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;
    const closedTickets = tickets.filter(t => t.status === 'Closed').length;

    return {
      totalTickets,
      openTickets,
      inProgressTickets,
      highPriorityTickets,
      resolvedTickets,
      closedTickets
    };
  }, [tickets]);

  // Filter and Sort Tickets
  const filteredTickets = useMemo(() => {
    return tickets
      .filter(t => {
        // Search Query filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = t.title.toLowerCase().includes(q);
          const matchNumber = t.ticketNumber.toLowerCase().includes(q);
          const matchCategory = t.category.toLowerCase().includes(q);
          const matchAssignee = t.assignedPerson.toLowerCase().includes(q);
          const matchReporter = t.reporter.toLowerCase().includes(q);
          if (!matchTitle && !matchNumber && !matchCategory && !matchAssignee && !matchReporter) {
            return false;
          }
        }
        // Status filter
        if (statusFilter !== 'All' && t.status !== statusFilter) {
          return false;
        }
        // Priority filter
        if (priorityFilter !== 'All' && t.priority !== priorityFilter) {
          return false;
        }
        // Category filter
        if (categoryFilter !== 'All' && t.category !== categoryFilter) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === 'priority-desc') {
          const priorityWeight: Record<TicketPriority, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          return priorityWeight[b.priority] - priorityWeight[a.priority];
        }
        if (sortBy === 'priority-asc') {
          const priorityWeight: Record<TicketPriority, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          return priorityWeight[a.priority] - priorityWeight[b.priority];
        }
        if (sortBy === 'status') {
          const statusOrder: Record<TicketStatus, number> = { Open: 1, 'In Progress': 2, Resolved: 3, Closed: 4 };
          return statusOrder[a.status] - statusOrder[b.status];
        }
        return 0;
      });
  }, [tickets, searchQuery, statusFilter, priorityFilter, categoryFilter, sortBy]);

  // CRUD Actions
  const addTicket = (ticketData: Omit<Ticket, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    const nextNumber = tickets.length + 1;
    const ticketNumber = `IT-2026-${String(nextNumber).padStart(3, '0')}`;
    const now = new Date().toISOString();
    
    const newTicket: Ticket = {
      ...ticketData,
      id: `t-${Date.now()}`,
      ticketNumber,
      createdAt: now,
      updatedAt: now,
      comments: [
        {
          id: `c-${Date.now()}`,
          author: 'System',
          role: 'System',
          content: `Ticket created by ${ticketData.reporter} (${ticketData.department}). Assigned to ${ticketData.assignedPerson || 'Unassigned'}.`,
          createdAt: now
        }
      ]
    };

    setTickets(prev => [newTicket, ...prev]);
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    const now = new Date().toISOString();
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          ...updates,
          updatedAt: now
        };
      }
      return t;
    }));
  };

  const updateTicketStatus = (id: string, status: TicketStatus) => {
    const now = new Date().toISOString();
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        const statusComment: Comment = {
          id: `c-${Date.now()}`,
          author: 'IT Support',
          role: 'IT Staff',
          content: `Changed status from "${t.status}" to "${status}".`,
          createdAt: now
        };
        return {
          ...t,
          status,
          updatedAt: now,
          comments: [...t.comments, statusComment]
        };
      }
      return t;
    }));
  };

  const deleteTicket = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id));
    if (selectedTicketId === id) setSelectedTicketId(null);
    if (deletingTicketId === id) setDeletingTicketId(null);
  };

  const addComment = (ticketId: string, content: string, author: string = 'IT Staff') => {
    if (!content.trim()) return;
    const now = new Date().toISOString();
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author,
      role: 'IT Staff',
      content: content.trim(),
      createdAt: now
    };

    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          comments: [...t.comments, newComment],
          updatedAt: now
        };
      }
      return t;
    }));
  };

  // Special AI Troubleshooting Generator for IT Staff Fit
  const generateAiTroubleshooting = async (ticketId: string): Promise<string> => {
    const targetTicket = tickets.find(t => t.id === ticketId);
    if (!targetTicket) return '';

    // Mock AI intelligent response generation based on Category & Title
    await new Promise(res => setTimeout(res, 800)); // Smooth 800ms loading effect

    let aiAdvice = `🤖 AI Support Assistant Plan for [${targetTicket.ticketNumber}]:\n`;
    if (targetTicket.category === 'Network') {
      aiAdvice += `1. Verify gateway ping response & packet loss ('ping 8.8.8.8 -t').\n2. Flush DNS cache ('ipconfig /flushdns').\n3. Check router VLAN DHCP lease assignment for ${targetTicket.department}.`;
    } else if (targetTicket.category === 'Hardware') {
      aiAdvice += `1. Perform hardware diagnostic test in BIOS.\n2. Inspect thermal throttling & fan RPM logs.\n3. Verify component warranty & stock availability in IT Storage inventory.`;
    } else if (targetTicket.category === 'System Error') {
      aiAdvice += `1. Inspect application server error log tail.\n2. Verify database connection pool health & memory limits.\n3. Test endpoint response code with cURL request.`;
    } else if (targetTicket.category === 'Access & Security') {
      aiAdvice += `1. Verify active user identity in Active Directory / Google Workspace.\n2. Check 2FA MFA token status.\n3. Audit access permissions log for security compliance.`;
    } else {
      aiAdvice += `1. Contact user ${targetTicket.reporter} via internal Slack for remote screen share.\n2. Review system event viewer log entries.\n3. Document resolution steps in knowledge base.`;
    }

    updateTicket(ticketId, { aiTroubleshootingDraft: aiAdvice });
    return aiAdvice;
  };

  const resetToSampleData = () => {
    setTickets(INITIAL_TICKETS);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    clearFilters();
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        filteredTickets,
        metrics,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        priorityFilter,
        setPriorityFilter,
        categoryFilter,
        setCategoryFilter,
        sortBy,
        setSortBy,
        clearFilters,
        selectedTicketId,
        setSelectedTicketId,
        isAddModalOpen,
        setIsAddModalOpen,
        editingTicket,
        setEditingTicket,
        deletingTicketId,
        setDeletingTicketId,
        addTicket,
        updateTicket,
        updateTicketStatus,
        deleteTicket,
        addComment,
        generateAiTroubleshooting,
        resetToSampleData
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
