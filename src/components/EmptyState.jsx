/**
 * EmptyState.jsx – Shown when there are no transactions matching filters
 */

import { SearchX } from 'lucide-react';

export default function EmptyState({ message = 'No transactions found', subtext = 'Try adjusting your filters or search query.' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      gap: 12,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 20,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 8,
      }}>
        <SearchX size={28} color="var(--text-muted)" />
      </div>
      <p style={{ fontWeight: 600, fontSize: 16, color: 'var(--text-primary)' }}>{message}</p>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 280 }}>{subtext}</p>
    </div>
  );
}
