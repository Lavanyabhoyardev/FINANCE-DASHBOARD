/**
 * Navbar.jsx – Top navigation bar with page routing, role switcher & dark mode toggle
 */

import { Sun, Moon, TrendingUp, LayoutDashboard, List, Lightbulb } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: List },
  { id: 'insights',     label: 'Insights',     icon: Lightbulb },
];

export default function Navbar({ currentPage, setCurrentPage }) {
  const { role, setRole, darkMode, setDarkMode } = useApp();

  return (
    <nav
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 64, gap: 8 }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 24 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <TrendingUp size={18} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 18 }} className="gradient-text">
              FinanceIQ
            </span>
          </div>

          {/* Nav links (desktop) */}
          <div style={{ display: 'flex', gap: 4, flex: 1 }}>
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`nav-link ${currentPage === id ? 'active' : ''}`}
                onClick={() => setCurrentPage(id)}
              >
                <Icon size={16} />
                <span className="nav-label">{label}</span>
              </button>
            ))}
          </div>

          {/* Right side controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

            {/* Role switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Role:</span>
              <select
                className="input-field"
                value={role}
                onChange={e => setRole(e.target.value)}
                style={{ padding: '5px 10px', fontSize: 13 }}
              >
                <option value="viewer">👁 Viewer</option>
                <option value="admin">🛡 Admin</option>
              </select>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-secondary)',
                transition: 'all 0.2s ease',
              }}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div style={{
          display: 'flex', gap: 4, paddingBottom: 8,
          overflowX: 'auto',
        }} className="mobile-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={`m-${id}`}
              className={`nav-link ${currentPage === id ? 'active' : ''}`}
              onClick={() => setCurrentPage(id)}
              style={{ whiteSpace: 'nowrap' }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
