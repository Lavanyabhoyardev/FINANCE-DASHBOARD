/**
 * Filters.jsx – Search bar + type filter + date range picker for transactions
 */

import { Search, X, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

const filterOptions = [
  { value: 'all',     label: 'All' },
  { value: 'income',  label: '💚 Income' },
  { value: 'expense', label: '🔴 Expense' },
];

export default function Filters() {
  const { search, filter, dateFrom, dateTo, setSearch, setFilter, setDateRange, resetFilters } = useApp();

  const hasActiveFilters = search || filter !== 'all' || dateFrom || dateTo;

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center',
    }}>

      {/* Search input */}
      <div style={{ position: 'relative', flex: '1', minWidth: 200 }}>
        <Search
          size={15}
          color="var(--text-muted)"
          style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          className="input-field"
          style={{ paddingLeft: 36, width: '100%' }}
          placeholder="Search by category, amount, or description…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center',
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Type filter buttons */}
      <div style={{ display: 'flex', gap: 6 }}>
        {filterOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            style={{
              padding: '7px 14px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid',
              transition: 'all 0.2s ease',
              ...(filter === opt.value
                ? {
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15))',
                    borderColor: 'rgba(99,102,241,0.4)',
                    color: 'var(--accent-blue-light)',
                  }
                : {
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-secondary)',
                  }),
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Date range */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Calendar size={14} color="var(--text-muted)" />
        <input
          type="date"
          className="input-field"
          style={{ padding: '7px 10px', fontSize: 13 }}
          value={dateFrom}
          onChange={e => setDateRange(e.target.value, dateTo)}
          title="From date"
        />
        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>to</span>
        <input
          type="date"
          className="input-field"
          style={{ padding: '7px 10px', fontSize: 13 }}
          value={dateTo}
          onChange={e => setDateRange(dateFrom, e.target.value)}
          title="To date"
        />
      </div>

      {/* Reset filters */}
      {hasActiveFilters && (
        <button className="btn-secondary" onClick={resetFilters} style={{ whiteSpace: 'nowrap' }}>
          <X size={13} /> Clear All
        </button>
      )}
    </div>
  );
}
