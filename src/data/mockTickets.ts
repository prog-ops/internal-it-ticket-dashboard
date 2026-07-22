import type { Ticket } from '../types/ticket';

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 't-101',
    ticketNumber: 'IT-2026-001',
    title: 'ERP Core Service 500 Server Error on Access',
    description: 'Finance department cannot process monthly invoicing due to unexpected 500 Internal Server Error when accessing the ERP billing module.',
    category: 'System Error',
    priority: 'Critical',
    status: 'In Progress',
    assignedPerson: 'Ahmad Fauzi (IT Senior)',
    reporter: 'Budi Santoso',
    department: 'Finance & Accounting',
    createdAt: '2026-07-22T08:15:00.000Z',
    updatedAt: '2026-07-22T09:30:00.000Z',
    comments: [
      {
        id: 'c-1',
        author: 'Ahmad Fauzi',
        role: 'IT Staff',
        content: 'Inspected Nginx reverse proxy logs. Upstream server instance #2 timed out due to memory cap. Restarting Docker container pool.',
        createdAt: '2026-07-22T08:45:00.000Z',
      },
      {
        id: 'c-2',
        author: 'Budi Santoso',
        role: 'User',
        content: 'Thanks Ahmad, please inform us as soon as billing export is accessible again.',
        createdAt: '2026-07-22T09:10:00.000Z',
      }
    ],
    aiTroubleshootingDraft: '1. Check ERP server docker logs (`docker logs erp_api_1 --tail 100`).\n2. Verify Postgres DB pool connections (`SELECT count(*) FROM pg_stat_activity`).\n3. Restart ERP service container pool and test /health endpoint.'
  },
  {
    id: 't-102',
    ticketNumber: 'IT-2026-002',
    title: 'VPN Disconnects Frequently during Remote Office Hours',
    description: 'Remote engineering staff experiencing tunnel drops every 15 minutes when connected via WireGuard VPN gateway.',
    category: 'Network',
    priority: 'High',
    status: 'Open',
    assignedPerson: 'Rian Hidayat (Network Ops)',
    reporter: 'Dewi Lestari',
    department: 'Software Engineering',
    createdAt: '2026-07-22T09:00:00.000Z',
    updatedAt: '2026-07-22T09:00:00.000Z',
    comments: [
      {
        id: 'c-3',
        author: 'System',
        role: 'System',
        content: 'Ticket created automatically from User Portal.',
        createdAt: '2026-07-22T09:00:00.000Z',
      }
    ],
    aiTroubleshootingDraft: '1. Inspect WireGuard keep-alive setting (`PersistentKeepalive = 25`).\n2. Verify router firewall MTU size (recommended 1360 or 1420 for WireGuard).\n3. Check ISP packet drop rates along client gateway routing path.'
  },
  {
    id: 't-103',
    ticketNumber: 'IT-2026-003',
    title: 'RAM Upgrade & SSD Maintenance for Lead Designer Laptop',
    description: 'Need upgrade from 8GB to 16GB DDR5 RAM to handle Figma and Adobe After Effects rendering smoothly without thermal throttling.',
    category: 'Hardware',
    priority: 'Medium',
    status: 'In Progress',
    assignedPerson: 'Siti Rahma (IT Support)',
    reporter: 'Kevin Pratama',
    department: 'Creative & Marketing',
    createdAt: '2026-07-21T14:30:00.000Z',
    updatedAt: '2026-07-22T10:15:00.000Z',
    comments: [
      {
        id: 'c-4',
        author: 'Siti Rahma',
        role: 'IT Staff',
        content: 'Kingston 16GB SODIMM DDR5 module unboxed and ready. Scheduled laptop handover today at 14:00.',
        createdAt: '2026-07-22T10:15:00.000Z',
      }
    ]
  },
  {
    id: 't-104',
    ticketNumber: 'IT-2026-004',
    title: 'New Employee Email & Workspace Account Provisioning',
    description: 'Requesting Google Workspace email account, Slack invite, and VPN credentials for newly hired Junior System Analyst.',
    category: 'Access & Security',
    priority: 'High',
    status: 'Resolved',
    assignedPerson: 'Siti Rahma (IT Support)',
    reporter: 'Nadia Putri',
    department: 'Human Resources',
    createdAt: '2026-07-20T11:20:00.000Z',
    updatedAt: '2026-07-21T16:00:00.000Z',
    comments: [
      {
        id: 'c-5',
        author: 'Siti Rahma',
        role: 'IT Staff',
        content: 'Created account nadia.analyst@company.com with temporary password sent securely via HR 1Password Vault.',
        createdAt: '2026-07-21T16:00:00.000Z',
      }
    ]
  },
  {
    id: 't-105',
    ticketNumber: 'IT-2026-005',
    title: 'Marketing Department Network Printer Paper Jam & Offline Error',
    description: 'HP LaserJet Pro printer on 3rd floor shows offline state on Windows print spooler and yellow error indicator light.',
    category: 'Hardware',
    priority: 'Low',
    status: 'Closed',
    assignedPerson: 'Ahmad Fauzi (IT Senior)',
    reporter: 'Rizky Ramadhan',
    department: 'Marketing',
    createdAt: '2026-07-19T08:00:00.000Z',
    updatedAt: '2026-07-19T11:45:00.000Z',
    comments: [
      {
        id: 'c-6',
        author: 'Ahmad Fauzi',
        role: 'IT Staff',
        content: 'Cleared paper tray 2 roller jam and assigned static IP 192.168.10.45. Printer spooler service restarted.',
        createdAt: '2026-07-19T11:45:00.000Z',
      }
    ]
  },
  {
    id: 't-106',
    ticketNumber: 'IT-2026-006',
    title: 'Security Patch Update Failure on Sales Department Laptops',
    description: 'CrowdStrike Falcon agent reporting 3 devices in Sales team missing critical July OS security patch.',
    category: 'Access & Security',
    priority: 'Critical',
    status: 'Open',
    assignedPerson: 'Unassigned',
    reporter: 'Security Automation Bot',
    department: 'IT Security',
    createdAt: '2026-07-22T11:00:00.000Z',
    updatedAt: '2026-07-22T11:00:00.000Z',
    comments: []
  }
];
