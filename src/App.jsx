/**
 * App.jsx – Root component: sidebar + topbar shell with page transitions
 */

import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import QuickAddFAB from './components/QuickAddFAB';
import { Menu, LayoutDashboard, List, Lightbulb } from 'lucide-react';

const pageLabels = {
  dashboard:    { label: 'Dashboard',    icon: LayoutDashboard, sub: 'Financial Overview' },
  transactions: { label: 'Transactions', icon: List,            sub: 'Manage Entries' },
  insights:     { label: 'Insights',     icon: Lightbulb,       sub: 'Spending Analytics' },
};

function AppContent() {
  const [currentPage, setCurrentPage]   = useState('dashboard');
  const [collapsed, setCollapsed]       = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [pageKey, setPageKey]           = useState(0); // for animation re-trigger

  const navigateTo = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    setPageKey(k => k + 1);
    setMobileOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':    return <Dashboard />;
      case 'transactions': return <Transactions />;
      case 'insights':     return <Insights />;
      default:             return <Dashboard />;
    }
  };

  const pageInfo = pageLabels[currentPage];
  const PageIcon = pageInfo.icon;

  return (
    <div className="app-shell">

      {/* ── Sidebar ──────────────────────────────────── */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* ── Main Area ─────────────────────────────────── */}
      <div className={`app-main ${collapsed ? 'sidebar-collapsed' : ''}`}>

        {/* Topbar */}
        <header className="app-topbar">
          {/* Left: hamburger + breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              style={{
                display: 'none',
                width: 36, height: 36,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              className="mobile-hamburger"
              id="mobile-menu-btn"
            >
              <Menu size={18} />
            </button>

            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32,
                borderRadius: 8,
                background: 'var(--violet-dim)',
                border: '1px solid rgba(124,58,237,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <PageIcon size={15} color="var(--violet-light)" />
              </div>
              <div>
                <p style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  color: 'var(--text-heading)',
                  lineHeight: 1.2,
                }}>
                  {pageInfo.label}
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  {pageInfo.sub}
                </p>
              </div>
            </div>
          </div>

          {/* Right: date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              padding: '5px 12px',
              borderRadius: 20,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              fontSize: 12,
              color: 'var(--text-muted)',
              fontFamily: 'Outfit,sans-serif',
              fontWeight: 500,
            }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </header>

        {/* Page Content with transition */}
        <main className="app-content" key={pageKey} style={{ animation: 'fadeInUp 0.35s cubic-bezier(0.22,1,0.36,1) both' }}>
          {renderPage()}
        </main>
      </div>

      {/* ── Floating Action Button ─────────────────────── */}
      <QuickAddFAB />

      {/* Mobile hamburger show style */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
