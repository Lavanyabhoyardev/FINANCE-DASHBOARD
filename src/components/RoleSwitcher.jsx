/**
 * RoleSwitcher.jsx – Visual banner that shows current role and its permissions
 */

import { Shield, Eye, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RoleSwitcher() {
  const { role, setRole, isAdmin } = useApp();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      padding: '14px 20px',
      borderRadius: 14,
      border: '1px solid',
      borderColor: isAdmin ? 'rgba(99,102,241,0.35)' : 'rgba(16,185,129,0.3)',
      background: isAdmin
        ? 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.06))'
        : 'rgba(16,185,129,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {isAdmin
          ? <Shield size={18} color="var(--accent-blue-light)" />
          : <Eye size={18} color="var(--accent-green)" />
        }
        <div>
          <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>
            {isAdmin ? 'Admin Mode' : 'Viewer Mode'}
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {isAdmin
              ? 'You can add, edit, and delete transactions.'
              : 'Read-only access. Switch to Admin to make changes.'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          className={`btn-${role === 'viewer' ? 'primary' : 'secondary'}`}
          style={{ fontSize: 12, padding: '6px 12px' }}
          onClick={() => setRole('viewer')}
        >
          <Eye size={13} /> Viewer
        </button>
        <button
          className={`btn-${role === 'admin' ? 'primary' : 'secondary'}`}
          style={{ fontSize: 12, padding: '6px 12px' }}
          onClick={() => setRole('admin')}
        >
          <Shield size={13} /> Admin
        </button>
      </div>
    </div>
  );
}
