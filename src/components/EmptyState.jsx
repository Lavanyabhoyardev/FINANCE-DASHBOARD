/**
 * EmptyState.jsx – Premium empty state with glowing icon and helpful CTA
 */

import { SearchX, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function EmptyState({
  message = 'No transactions found',
  subtext = 'Try adjusting your filters or search query.',
}) {
  const { resetFilters } = useApp();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '72px 24px',
      gap: 16,
      textAlign: 'center',
    }}>
      {/* Icon */}
      <div style={{
        position: 'relative',
        marginBottom: 8,
      }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: 24,
          background: 'var(--violet-dim)',
          border: '1px solid rgba(124,58,237,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(124,58,237,0.15)',
        }}>
          <SearchX size={36} color="var(--violet-light)" strokeWidth={1.5} />
        </div>
        {/* Floating decorative dot */}
        <div style={{
          position: 'absolute',
          top: -4,
          right: -4,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--violet), var(--violet-light))',
          border: '2px solid var(--bg-card)',
          boxShadow: '0 0 8px rgba(124,58,237,0.5)',
        }} />
      </div>

      <div>
        <p style={{
          fontWeight: 700,
          fontSize: 18,
          fontFamily: 'Outfit, sans-serif',
          color: 'var(--text-heading)',
          marginBottom: 6,
        }}>
          {message}
        </p>
        <p style={{
          fontSize: 14,
          color: 'var(--text-muted)',
          maxWidth: 280,
          lineHeight: 1.6,
        }}>
          {subtext}
        </p>
      </div>

      <button
        className="btn-secondary"
        onClick={resetFilters}
        style={{ marginTop: 4, gap: 6 }}
      >
        <SlidersHorizontal size={14} />
        Clear all filters
      </button>
    </div>
  );
}
