# IT Ticketing — Modern IT Support & Ticket Management Dashboard

A sleek, high-performance, and responsive internal IT ticket management dashboard application designed to streamline company IT operations and support workflows.

---

## 🌟 Key Highlights

* **🎨 Dual Theme System**: Instant Dark & Light mode switcher with subtle contrast design tokens for seamless long-session usage.
* **📊 Real-Time Operational Metrics**: Interactive stat cards (Total, Open, In Progress, High/Critical Priority, Resolved/Closed) with 1-click instant filtering.
* **🎫 Complete Ticket Lifecycle (CRUD)**: Create, view, edit, update status, and delete tickets with Grid View and Tabular Density View toggles.
* **🔎 Smart Search & Multi-Filtering**: Instant search across Ticket IDs, titles, assignees, and departments, combined with multi-dropdown status, priority, and category filters.
* **🤖 Integrated AI Support Assistant**: Smart prompt-driven troubleshooting assistant that generates step-by-step diagnostic workflows based on issue categories.
* **💬 Activity Log & Internal IT Notes**: Per-ticket progress logging thread for team collaboration and audit trails.
* **💾 LocalStorage Sync & Demo Reset**: Automatic browser storage persistence with realistic pre-loaded IT scenarios and a 1-click data reset tool.

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 19 (SPA)
* **Build System & Runtime**: Vite 8 & Bun 1.3
* **Language**: TypeScript 6
* **Styling**: Tailwind CSS v4 (Custom CSS Tokens, Responsive Layout, Micro-animations)
* **Icons**: Lucide React
* **State Management**: React Context API + LocalStorage Persistence

---

## 🚀 Getting Started Locally

Ensure you have [Bun](https://bun.sh) installed.

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/internal-it-ticket-dashboard.git
cd internal-it-ticket-dashboard

bun install
```

### 2. Run Development Server
```bash
bun dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
```bash
bun run build
```
Generates a zero-error optimized static bundle in the `dist/` folder ready for deployment.

---

## 🌐 Live Deployment

Deployable instantly on **Vercel** or **Netlify**:
- **Build Command**: `bun run build` (or `npm run build`)
- **Output Directory**: `dist`

---

## 📝 License

Distributed under the MIT License. Feel free to use, modify, and build upon this project.
