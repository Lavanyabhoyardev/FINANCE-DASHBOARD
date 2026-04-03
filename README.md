# FinanceIQ – Smart Finance Dashboard

> This project is designed with scalability in mind and can be easily extended with backend APIs in the future.

FinanceIQ is a production-quality, fully responsive Finance Dashboard built with React, Vite, and Tailwind CSS. Designed as a frontend internship assignment, it demonstrates professional-grade skills in component architecture, state management, role-based access control, and data visualization — all without a backend. The project mirrors real-world finance applications, making it a strong portfolio piece for frontend developer roles.

---

## 🚀 Live Preview

> 🔗[Live Demo] — (Deploy link — see [Deployment](#-https://finance-dashboard-azure-delta-77.vercel.app/) section below)

Run locally by following the [Setup Instructions](#️-setup-instructions).

## 📸 Screenshots

### Dashboard — Financial Overview

![Dashboard View](./public/screenshots/dashboard.png)

> Summary cards, balance trend area chart, and spending breakdown donut chart.

### Transactions — Full Management Table

![Transactions Page](./public/screenshots/transactions.png)

> Sortable, filterable table with Admin CRUD controls, search, date range, and CSV export.

### Insights — Spending Analytics

![Insights Page](./public/screenshots/insights.png)

> Monthly income vs expense bar chart, category progress bars, savings rate, and a personalised financial tip.

---

## ✨ Features

| Feature | Description |
|---|---|
| Dashboard Overview | 3 summary cards (Balance, Income, Expenses) + Area Line Chart + Donut Pie Chart |
| Transactions Page | Full table with search, category/type filter, date range, and column sorting |
| Insights Page | KPI cards, monthly bar chart, category progress bars, savings rate, and a financial tip |
| Role-Based UI | Viewer (read-only) vs Admin (add, edit, delete) dynamically changes the UI |
| Dark / Light Mode | Toggle with localStorage persistence |
| LocalStorage Persistence | Transactions and settings saved across browser sessions |
| CSV Export | Download filtered transactions as a CSV file |
| Responsive Design | Mobile-first layout that works on all screen sizes |
| Empty State Handling | Friendly "No transactions found" state with icon |
| Smooth Animations | Fade-in and hover transitions throughout |

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 6 | Build tool & dev server |
| Tailwind CSS | 4 | Utility-first CSS framework |
| Recharts | 2 | Charting library |
| Lucide React | latest | Icon library |
| React Context API | built-in | Global state management |
| localStorage | browser built-in | Data persistence |

---

## 📁 Folder Structure

```text
finance-dashboard/
│── public/
│── src/
│   ├── components/
│   │   ├── SummaryCard.jsx        # Metric display card with icon & trend
│   │   ├── TransactionTable.jsx   # Sortable table with CRUD modals
│   │   ├── Filters.jsx            # Search + type filter + date range
│   │   ├── RoleSwitcher.jsx       # Visual role banner/toggle
│   │   ├── EmptyState.jsx         # Empty results placeholder
│   │   ├── Navbar.jsx             # Sticky top nav with page routing
│   │   ├── Charts/
│   │   │   ├── LineChart.jsx      # Area chart – monthly trend
│   │   │   ├── PieChart.jsx       # Donut chart – category breakdown
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx          # Overview: cards + charts + recent transactions
│   │   ├── Transactions.jsx       # Full transaction management
│   │   ├── Insights.jsx           # Analytics & spending patterns
│   │
│   ├── context/
│   │   ├── AppContext.jsx         # Global state (useReducer + Context API)
│   │
│   ├── data/
│   │   ├── mockData.js            # 30 mock transactions + category colors
│   │
│   ├── utils/
│   │   ├── helpers.js             # Formatting, filtering, sorting, CSV utilities
│   │
│   ├── App.jsx                    # Root component + page routing
│   ├── main.jsx                   # Vite entry point
│   └── index.css                  # Global CSS + Tailwind + design tokens
│
├── index.html                     # HTML shell with SEO meta tags
├── vite.config.js                 # Vite + Tailwind plugin config
└── package.json
```

---

## ⚙️ Setup Instructions

Prerequisites: Node.js ≥ 18 and npm ≥ 9 installed.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/finance-dashboard.git
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

Build for production:

```bash
npm run build
npm run preview
```

---

## 🧠 Approach & Design Decisions

### State Management

Used React's built-in `useReducer` + `Context API` for predictable state updates. All state lives in `AppContext.jsx` and is exposed through a custom `useApp()` hook. This pattern scales cleanly to a Redux-like architecture without external dependencies.

### Role-Based UI

Frontend-only role switching stored in localStorage. Switching to   Admin   exposes Add/Edit/Delete buttons in the TransactionTable and a modal form.   Viewer   sees all data but no mutation controls. The role state propagates via Context so any component can gate features with `isAdmin`.

### Data Layer

All data is mock — 30 manually crafted transactions across 3 months and 11 categories. The `helpers.js` utilities transform this data into chart-ready formats (monthly aggregation, category breakdown) to keep components purely presentational.

### Persistence

Transactions and preferences (role, dark mode) are synced to `localStorage` every time they change via `useEffect`. On first load, localStorage is checked before falling back to mock data.

### Optional Enhancements Implemented

1. ✅   Dark Mode Toggle   with smooth CSS variable transitions
2. ✅   LocalStorage Persistence   for transactions + settings
3. ✅   CSV Export   of the current filtered transaction list
4. ✅   Smooth Animations   (fade-in, hover lift, gradient buttons)
5. ✅   Date Range Filtering   in the Filters component

---

## 📸 Pages

-   Dashboard   – KPI summary cards, area line chart (balance trend), donut pie chart (spending breakdown), recent 5 transactions
-   Transactions   – Full sortable/filterable table, search, date range, add/edit/delete (admin only), CSV export
-   Insights   – Savings rate, highest spending category, monthly income vs expense bar chart, category progress bars, financial tip

---

## 🏆 Why This Project Stands Out

### Scalable Component Architecture

Every UI element is broken into focused, reusable components following the single-responsibility principle. Adding a new page, chart type, or filter requires zero changes to existing components — just plug in and go.

### Role-Based Access Control

Most dashboards skip this entirely. FinanceIQ implements a complete frontend RBAC system where the UI dynamically adapts based on the assigned role (Viewer vs Admin). This mirrors real enterprise applications and demonstrates an understanding of access control patterns.

### Real-World Use Case

The project isn't a toy counter or todo list — it solves a tangible problem: personal finance tracking. It includes the data flows, edge cases (empty states, validation, persistence), and UI patterns (modals, filters, sortable tables) you'd find in production financial software.

### Strong UI/UX Design

Built with a custom design system using CSS variables and a dark/light mode toggle. Every interactive element has hover states, micro-animations, and transitions. The layout is fully responsive across mobile, tablet, and desktop breakpoints.

### Clean State Management Without Redux

Using `useReducer` + `Context API` keeps the state centralised and predictable while avoiding the overhead of Redux. The pattern is familiar, testable, and straightforward to migrate to Redux Toolkit or Zustand if the app grows.

---

## 🔮 Future Improvements

The current implementation is intentionally frontend-only, but the architecture is designed to support the following enhancements with minimal refactoring:

| Enhancement | Description |
|---|---|
| Backend Integration | Replace mock data with REST API calls (e.g. Express.js, FastAPI) or GraphQL. The data-fetching logic is isolated in helpers, making this a clean swap. |
| Authentication System | Add user login/signup with JWT tokens or OAuth (Google, GitHub). The role system already provides the access-control foundation. |
| Real-Time Updates | Integrate WebSockets or server-sent events so multiple users see live transaction changes without refreshing. |
| Advanced Analytics | Add forecasting charts, budget limits per category, spending alerts, and month-over-month percentage comparisons. |
| Unit & Integration Tests | Add Vitest + React Testing Library coverage for reducers, helper functions, and key component interactions. |
| Internationalisation (i18n) | Support multiple currencies and locale-aware date/number formatting. |
| PWA Support | Add a service worker and manifest to make the app installable and usable offline. |

---

## 🌐 Deployment

This project can be deployed to any static hosting platform in minutes.

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod
```

Or connect your GitHub repository directly at [vercel.com](https://vercel.com) for automatic deployments on every push.

### Deploy to Netlify

```bash
# Build the project
npm run build

# Drag and drop the /dist folder at netlify.app/drop
# — or —
# Connect your GitHub repo at netlify.com for CI/CD
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy
```

> 🔗   Live URL: https://finance-dashboard-azure-delta-77.vercel.app/

---

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

---

This project represents a practical demonstration of frontend engineering fundamentals — component design, state management, accessibility, and user experience — built to a professional standard suitable for production environments.

# FINANCE-DASHBOARD
