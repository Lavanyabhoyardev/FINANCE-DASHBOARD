/**
 * Filters.jsx – Redesigned filters with pill toggles and styled inputs
 */

import { Search, X, Calendar, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

const filterOptions = [
  { value: 'all',     label: 'All' },
  { value: 'income',  label: '↑ Income' },
  { value: 'expense', label: '↓ Expense' },
];

export default function Filters() {
  const { search, filter, dateFrom, dateTo, setSearch, setFilter, setDateRange, resetFilters } = useApp();
  const hasActiveFilters = search || filter !== 'all' || dateFrom || dateTo;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Top row: search + type pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>

        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: 220 }}>
          <Search
            size={15}
            color="var(--text-muted)"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          />
          <input
            className="input-field"
            style={{ paddingLeft: 38 }}
            placeholder="Search category, amount, description…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', display: 'flex', alignItems: 'center',
                padding: 2,
              }}
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Type pills */}
        <div style={{ display: 'flex', gap: 6 }}>
          {filterOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`filter-pill ${filter === opt.value ? 'active' : ''}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Clear */}
        {hasActiveFilters && (
          <button className="btn-secondary" onClick={resetFilters} style={{ whiteSpace: 'nowrap', padding: '7px 12px', fontSize: 13, gap: 5 }}>
            <X size={13} /> Clear All
          </button>
        )}
      </div>

      {/* Date range row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Calendar size={14} color="var(--text-muted)" />
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Outfit,sans-serif', fontWeight: 600, whiteSpace: 'nowrap' }}>
            Date Range
          </span>
        </div>
        <input
          type="date"
          className="input-field"
          style={{ padding: '7px 10px', fontSize: 13, width: 'auto', minWidth: 140 }}
          value={dateFrom}
          onChange={e => setDateRange(e.target.value, dateTo)}
          title="From date"
        />
        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>→</span>
        <input
          type="date"
          className="input-field"
          style={{ padding: '7px 10px', fontSize: 13, width: 'auto', minWidth: 140 }}
          value={dateTo}
          onChange={e => setDateRange(dateFrom, e.target.value)}
          title="To date"
        />
      </div>
    </div>
  );
}
