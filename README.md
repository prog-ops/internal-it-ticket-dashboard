# Internal IT Ticket Dashboard

A modern, responsive, and feature-rich **Internal IT Ticket Tracking & Support Management Dashboard** built for the **IT Staff Technical Assessment** at **PT Lead Geeks Indonesia**.

---

## 📌 Project Overview

This dashboard is designed specifically for company IT Operations and Helpdesk staff to streamline internal support workflows. It enables IT staff to efficiently manage ticket lifecycles (Add, Edit, Update Status, Delete, Comment), monitor key operational metrics, filter/sort issues by urgency or category, and utilize an **AI Support Assistant** for rapid troubleshooting guidance.

---

## 🛠️ Technologies Used

* **Core Framework**: React 19 (Single Page Application)
* **Build Tool & Runtime**: Vite 8 & Bun 1.3
* **Language**: TypeScript 6
* **Styling**: Tailwind CSS v4 (Custom Dark Palette, Micro-animations, Responsive Design)
* **Icons**: Lucide React
* **State & Data Persistence**: React Context API + LocalStorage (with pre-seeded sample data & instant reset)

---

## ✨ Features Implemented

### 1. Minimum Required Features
* **Ticket Management (CRUD)**:
  * **Add Ticket**: Create tickets with Title, Description, Category, Priority, Status, Reporter, Department, and Assigned IT Staff.
  * **Edit Ticket**: Update any ticket details or assignment seamlessly.
  * **Update Status**: Inline quick-select dropdown or full detail view update (`Open`, `In Progress`, `Resolved`, `Closed`).
  * **Delete Ticket**: Secure deletion with modal confirmation.
  * **View Ticket List**: Flexible Grid View and Tabular Density View options.
* **Required Ticket Fields**:
  * Ticket Title, Issue Category, Priority, Status, Assigned Person, Created Date, Reporter & Department.
* **Dashboard Summary Cards (Real-time Metrics)**:
  * Total Tickets, Open Tickets, In Progress Tickets, High Priority Tickets (High & Critical), Resolved & Closed Tickets.
  * **Interactive Stat Cards**: Clicking any stat card automatically filters the list below!

### 2. Bonus Features
* **Search & Multi-Filtering**:
  * Real-time search by Title, Ticket #ID, Assignee, Reporter, or Department.
  * Filter by Status, Priority Level, or Issue Category.
* **Sorting**:
  * Sort by Created Date (Newest / Oldest), Priority (High → Low / Low → High), or Status Order.
* **Status & Priority Color Indicators**:
  * Visual badges with distinct color palettes (Critical = Rose, High = Orange, Medium = Yellow, Low = Slate, Open = Sky, In Progress = Amber, Resolved = Emerald).
* **Activity Log & Notes/Comments**:
  * Internal IT notes thread per ticket to log progress, troubleshooting steps, or user updates.

### 3. Special IT Staff Value-Add (Lead Geeks Fit)
* **AI Support Assistant / Troubleshooting Generator**:
  * Built-in AI helper that generates automated, intelligent troubleshooting steps and resolution plans based on issue categories. Demonstrates AI-assisted development and prompt engineering workflows aligned with job requirements.
* **Pre-Seeded Real-World IT Data & Reset Tool**:
  * Comes pre-loaded with realistic IT ticket scenarios (ERP outage, WireGuard VPN drops, RAM upgrades, Printer paper jams, Account provisioning).
  * One-click "Reset Demo" button to restore clean sample data anytime.

---

## 🚀 Setup & Local Execution Instructions

Ensure you have **Bun** installed on your system.

### 1. Clone & Install Dependencies
```bash
# Clone repository or extract project zip
cd internal-it-ticket-dashboard

# Install dependencies using Bun
bun install
```

### 2. Run Development Server
```bash
bun dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Build Production Bundle
```bash
bun run build
```
The output static bundle will be generated in the `dist/` directory, ready for deployment to Vercel or Netlify.

---

## 🌐 Deployment Guide (Vercel / Netlify)

1. Push this repository to GitHub.
2. Import the repository on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Set **Build Command**: `bun run build` (or `npm run build`).
4. Set **Output Directory**: `dist`.
5. Click **Deploy**.

---

### 👨‍💻 Submitted By
* **Candidate**: IT Staff Candidate
* **Company Assessment**: PT Lead Geeks Indonesia
