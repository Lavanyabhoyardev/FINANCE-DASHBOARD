/**
 * TransactionTable.jsx – Premium table with zebra striping, category pills, row glow, CRUD
 */

import { useState } from 'react';
import { Pencil, Trash2, ChevronUp, ChevronDown, Plus, RotateCcw, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { filterTransactions, sortTransactions, formatCurrency, exportToCSV } from '../utils/helpers';
import { allCategories, categoryColors } from '../data/mockData';
import EmptyState from './EmptyState';

// ── Transaction Form Modal ──────────────────────────────────────────────────
function TransactionModal({ existing, onClose, onSave }) {
  const initial = existing || {
    date: new Date().toISOString().slice(0, 10),
    amount: '',
    category: 'Salary',
    type: 'income',
    description: '',
  };
  const [form, setForm] = useState(initial);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }
    onSave({ ...form, amount: Number(form.amount) });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h3 style={{ fontWeight: 800, fontSize: 20, fontFamily: 'Outfit,sans-serif', color: 'var(--text-heading)' }}>
              {existing ? '✏️ Edit Transaction' : '➕ Add Transaction'}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
              {existing ? 'Modify the transaction details' : 'Fill in transaction details'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Type toggle */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, fontFamily: 'Outfit,sans-serif' }}>Type</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['income', 'expense'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, type: t }))}
                  style={{
                    flex: 1, padding: '9px', borderRadius: 'var(--radius-md)',
                    border: '1px solid', fontSize: 13, fontWeight: 600,
                    fontFamily: 'Outfit,sans-serif', cursor: 'pointer', transition: 'all 0.2s ease',
                    ...(form.type === t
                      ? t === 'income'
                        ? { background: 'var(--emerald-dim)', borderColor: 'rgba(52,211,153,0.4)', color: 'var(--emerald-light)' }
                        : { background: 'var(--rose-dim)', borderColor: 'rgba(251,113,133,0.4)', color: 'var(--rose-light)' }
                      : { background: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }
                    ),
                  }}
                >
                  {t === 'income' ? '↑ Income' : '↓ Expense'}
                </button>
              ))}
            </div>
          </div>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Outfit,sans-serif' }}>Date</span>
            <input type="date" className="input-field" value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Outfit,sans-serif' }}>Amount ($)</span>
            <input type="number" className="input-field" placeholder="0.00" value={form.amount} min="0" step="0.01"
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} required />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Outfit,sans-serif' }}>Category</span>
            <select className="input-field" value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Outfit,sans-serif' }}>Description</span>
            <input type="text" className="input-field" placeholder="Optional note…" value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </label>

          {error && (
            <p style={{
              color: 'var(--rose-light)', fontSize: 13,
              background: 'var(--rose-dim)', padding: '8px 12px',
              borderRadius: 'var(--radius-sm)', border: '1px solid rgba(251,113,133,0.2)',
            }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button type="button" className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              {existing ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Sort Header ─────────────────────────────────────────────────────────────
function SortTh({ label, field, sortField, sortDir, onSort }) {
  const active = sortField === field;
  return (
    <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => onSort(field)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {label}
        <span style={{ opacity: active ? 1 : 0.3, transition: 'opacity 0.2s' }}>
          {active && sortDir === 'asc'
            ? <ChevronUp size={12} color="var(--violet-light)" />
            : <ChevronDown size={12} color={active ? 'var(--violet-light)' : 'var(--text-muted)'} />
          }
        </span>
      </div>
    </th>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function TransactionTable({ showFiltersBar = false }) {
  const {
    transactions, filter, search, sortField, sortDir, dateFrom, dateTo,
    isAdmin, addTransaction, editTransaction, deleteTransaction, setSort,
    resetToMockData,
  } = useApp();

  const [editTarget, setEditTarget] = useState(null);
  const [showAdd, setShowAdd]       = useState(false);
  const [deleteId, setDeleteId]     = useState(null);

  const filtered = filterTransactions(transactions, { search, type: filter, dateFrom, dateTo });
  const sorted   = sortTransactions(filtered, sortField, sortDir);

  const handleSort = field => {
    if (sortField === field) {
      setSort(field, sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(field, 'desc');
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Showing{' '}
            <strong style={{ color: 'var(--violet-light)', fontFamily: 'Outfit,sans-serif', fontSize: 15 }}>
              {sorted.length}
            </strong>
            {' '}of{' '}
            <strong style={{ color: 'var(--text-primary)' }}>{transactions.length}</strong>
            {' '}transactions
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            className="btn-secondary"
            onClick={() => exportToCSV(sorted)}
            style={{ fontSize: 12, padding: '6px 12px', gap: 5 }}
          >
            <Download size={13} /> Export CSV
          </button>

          {isAdmin && (
            <>
              <button
                className="btn-secondary"
                style={{ fontSize: 12, padding: '6px 12px', gap: 5 }}
                onClick={resetToMockData}
              >
                <RotateCcw size={13} /> Reset Data
              </button>
              <button
                className="btn-primary"
                onClick={() => setShowAdd(true)}
                style={{ fontSize: 13 }}
              >
                <Plus size={14} /> Add Transaction
              </button>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={{
        overflowX: 'auto',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        background: 'var(--bg-card)',
      }}>
        {sorted.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <SortTh label="Date"   field="date"   sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                <th>Category</th>
                <th>Description</th>
                <SortTh label="Amount" field="amount" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                <th>Type</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {sorted.map(tx => {
                const catColor = categoryColors[tx.category] || '#7c3aed';
                return (
                  <tr key={tx.id}>
                    <td style={{ whiteSpace: 'nowrap', color: 'var(--text-secondary)', fontSize: 13 }}>
                      {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td>
                      <span
                        className="badge-cat"
                        style={{
                          background: `${catColor}18`,
                          color: catColor,
                          borderColor: `${catColor}30`,
                        }}
                      >
                        <span style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: catColor,
                          display: 'inline-block',
                          flexShrink: 0,
                          boxShadow: `0 0 4px ${catColor}`,
                        }} />
                        {tx.category}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: 13, maxWidth: 220 }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                        {tx.description || '—'}
                      </span>
                    </td>
                    <td style={{
                      fontWeight: 700,
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: 15,
                      color: tx.type === 'income' ? 'var(--emerald-light)' : 'var(--rose-light)',
                    }}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                    <td>
                      <span className={`badge badge-${tx.type}`}>
                        {tx.type === 'income' ? '↑' : '↓'} {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </span>
                    </td>
                    {isAdmin && (
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {/* Edit */}
                          <button
                            onClick={() => setEditTarget(tx)}
                            className="btn-icon"
                            style={{
                              background: 'rgba(124,58,237,0.1)',
                              borderColor: 'rgba(124,58,237,0.2)',
                              color: 'var(--violet-light)',
                            }}
                            title="Edit"
                          >
                            <Pencil size={13} />
                          </button>
                          {/* Delete */}
                          <button
                            className="btn-icon"
                            onClick={() => setDeleteId(tx.id)}
                            style={{
                              background: 'rgba(190,24,93,0.1)',
                              borderColor: 'rgba(251,113,133,0.2)',
                              color: 'var(--rose-light)',
                            }}
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <TransactionModal onClose={() => setShowAdd(false)} onSave={addTransaction} />
      )}

      {/* Edit Modal */}
      {editTarget && (
        <TransactionModal existing={editTarget} onClose={() => setEditTarget(null)} onSave={editTransaction} />
      )}

      {/* Delete Confirm */}
      {deleteId !== null && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setDeleteId(null)}>
          <div className="modal-box" style={{ maxWidth: 380 }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'var(--rose-dim)',
                border: '1px solid rgba(251,113,133,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <Trash2 size={24} color="var(--rose-light)" />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: 18, color: 'var(--text-heading)', fontFamily: 'Outfit,sans-serif', marginBottom: 8 }}>
                Delete Transaction?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                This action cannot be undone. The transaction will be permanently removed.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-secondary" onClick={() => setDeleteId(null)} style={{ flex: 1 }}>
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={() => { deleteTransaction(deleteId); setDeleteId(null); }}
                style={{ flex: 1, padding: '9px 16px', fontWeight: 700, fontSize: 14 }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
