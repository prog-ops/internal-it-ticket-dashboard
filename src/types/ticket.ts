export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export type TicketCategory = 
  | 'Hardware' 
  | 'Network' 
  | 'Software' 
  | 'Access & Security' 
  | 'System Error' 
  | 'Other';

export interface Comment {
  id: string;
  author: string;
  role: 'IT Staff' | 'User' | 'System';
  avatar?: string;
  content: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string; // e.g., "IT-2026-001"
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedPerson: string;
  reporter: string;
  department: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  aiTroubleshootingDraft?: string;
}

export interface DashboardMetrics {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  highPriorityTickets: number; // High & Critical
  resolvedTickets: number;
  closedTickets: number;
}

export type FilterStatus = TicketStatus | 'All' | 'Resolved/Closed';
export type FilterPriority = TicketPriority | 'All' | 'High/Critical';
export type FilterCategory = TicketCategory | 'All';

export type SortBy = 'newest' | 'oldest' | 'priority-desc' | 'priority-asc' | 'status';
