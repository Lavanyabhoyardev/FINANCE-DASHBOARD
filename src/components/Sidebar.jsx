/**
 * Sidebar.jsx – Collapsible sidebar navigation
 * Props: currentPage, setCurrentPage, collapsed, setCollapsed, mobileOpen, setMobileOpen
 */

import { LayoutDashboard, List, Lightbulb, TrendingUp, ChevronLeft, ChevronRight, Sun, Moon, Shield, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard, desc: 'Overview' },
  { id: 'transactions', label: 'Transactions', icon: List,            desc: 'Manage entries' },
  { id: 'insights',     label: 'Insights',     icon: Lightbulb,       desc: 'Analytics' },
];

export default function Sidebar({ currentPage, setCurrentPage, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { role, setRole, darkMode, setDarkMode } = useApp();

  const handleNav = (id) => {
    setCurrentPage(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`app-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>

        {/* ─── Logo ─────────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '20px 20px 16px',
          borderBottom: '1px solid var(--border-subtle)',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(124,58,237,0.4)',
            flexShrink: 0,
          }}>
            <TrendingUp size={18} color="white" strokeWidth={2.5} />
          </div>
          <div className="link-label" style={{ overflow: 'hidden' }}>
            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: 17,
              background: 'linear-gradient(135deg, #a78bfa, #e879f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              whiteSpace: 'nowrap',
            }}>
              FinanceIQ
            </p>
            <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1, whiteSpace: 'nowrap' }}>
              Premium Dashboard
            </p>
          </div>
        </div>

        {/* ─── Nav Items ────────────────────────────── */}
        <nav style={{ flex: 1, padding: '16px 0', overflow: 'hidden' }}>
          <p className="section-label" style={{
            padding: '0 16px',
            marginBottom: 8,
            opacity: collapsed ? 0 : 1,
            transition: 'opacity 0.2s',
          }}>
            Navigation
          </p>

          {navItems.map(({ id, label, icon: Icon, desc }) => (
            <button
              key={id}
              className={`sidebar-link ${currentPage === id ? 'active' : ''}`}
              onClick={() => handleNav(id)}
              title={collapsed ? label : ''}
            >
              <span className="link-icon">
                <Icon size={18} strokeWidth={currentPage === id ? 2.5 : 1.8} />
              </span>
              <span className="link-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
                {!collapsed && (
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{desc}</span>
                )}
              </span>
            </button>
          ))}
        </nav>

        {/* ─── Bottom Controls ──────────────────────── */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '12px 0',
          flexShrink: 0,
        }}>

          {/* Role Switcher */}
          <div style={{
            padding: '8px 16px',
            opacity: collapsed ? 0 : 1,
            transition: 'opacity 0.2s',
            overflow: 'hidden',
          }}>
            <p style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'Outfit,sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Role
            </p>
            <select
              className="input-field"
              value={role}
              onChange={e => setRole(e.target.value)}
              style={{ padding: '6px 10px', fontSize: 13 }}
            >
              <option value="viewer">👁 Viewer</option>
              <option value="admin">🛡 Admin</option>
            </select>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="sidebar-link"
            style={{ margin: '2px 12px', width: 'calc(100% - 24px)' }}
            title={collapsed ? (darkMode ? 'Light Mode' : 'Dark Mode') : ''}
          >
            <span className="link-icon">
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </span>
            <span className="link-label" style={{ fontSize: 13, fontWeight: 500 }}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* Role indicator badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            opacity: collapsed ? 0 : 1,
            transition: 'opacity 0.2s',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: role === 'admin' ? 'rgba(124,58,237,0.15)' : 'rgba(5,150,105,0.12)',
              border: `1px solid ${role === 'admin' ? 'rgba(124,58,237,0.3)' : 'rgba(52,211,153,0.25)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {role === 'admin'
                ? <Shield size={15} color="var(--violet-light)" />
                : <Eye size={15} color="var(--emerald-light)" />
              }
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Outfit,sans-serif' }}>
                {role === 'admin' ? 'Admin' : 'Viewer'}
              </p>
              <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                {role === 'admin' ? 'Full access' : 'Read only'}
              </p>
            </div>
          </div>
        </div>

        {/* ─── Collapse Toggle ──────────────────────── */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: 'absolute',
            top: 20,
            right: -12,
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.2s ease',
            zIndex: 10,
          }}
          className="desktop-only"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight size={13} />
            : <ChevronLeft size={13} />
          }
        </button>

      </aside>
    </>
  );
}
