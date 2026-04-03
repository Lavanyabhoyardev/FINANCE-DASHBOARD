/**
 * TransactionTable.jsx – Sortable, filterable transaction list with admin CRUD actions
 */

import { useState } from 'react';
import { Pencil, Trash2, ChevronUp, ChevronDown, Plus, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { filterTransactions, sortTransactions, formatCurrency, formatDate, exportToCSV } from '../utils/helpers';
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
        <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 20, color: 'var(--text-primary)' }}>
          {existing ? '✏️ Edit Transaction' : '➕ Add Transaction'}
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Date */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>DATE</span>
            <input type="date" className="input-field" value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          </label>

          {/* Amount */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>AMOUNT ($)</span>
            <input type="number" className="input-field" placeholder="0.00" value={form.amount} min="0" step="0.01"
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} required />
          </label>

          {/* Category */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>CATEGORY</span>
            <select className="input-field" value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          {/* Type */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>TYPE</span>
            <select className="input-field" value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>

          {/* Description */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>DESCRIPTION</span>
            <input type="text" className="input-field" placeholder="Optional note…" value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </label>

          {error && <p style={{ color: 'var(--accent-red)', fontSize: 13 }}>{error}</p>}

          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <button type="button" className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              {existing ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Sort Header Cell ─────────────────────────────────────────────────────────
function SortTh({ label, field, sortField, sortDir, onSort }) {
  const active = sortField === field;
  return (
    <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => onSort(field)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {label}
        {active
          ? sortDir === 'asc'
            ? <ChevronUp size={13} color="var(--accent-blue-light)" />
            : <ChevronDown size={13} color="var(--accent-blue-light)" />
          : <ChevronDown size={13} color="var(--text-muted)" />
        }
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

  const [editTarget, setEditTarget] = useState(null);   // existing tx for edit
  const [showAdd, setShowAdd]       = useState(false);  // add new modal
  const [deleteId, setDeleteId]     = useState(null);   // confirm delete id

  // Filter → Sort
  const filtered = filterTransactions(transactions, { search, type: filter, dateFrom, dateTo });
  const sorted   = sortTransactions(filtered, sortField, sortDir);

  const handleSort = field => {
    if (sortField === field) {
      setSort(field, sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(field, 'desc');
    }
  };

  const categoryDot = cat => (
    <span style={{
      display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
      background: categoryColors[cat] || '#6366f1', marginRight: 7, flexShrink: 0,
    }} />
  );

  return (
    <div>
      {/* Toolbar row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1, flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{sorted.length}</strong> of {transactions.length} transactions
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={() => exportToCSV(sorted)} style={{ fontSize: 12, padding: '6px 12px' }}>
            ⬇ Export CSV
          </button>
          {isAdmin && (
            <>
              <button className="btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }} onClick={resetToMockData}>
                <RotateCcw size={13} /> Reset Data
              </button>
              <button className="btn-primary" onClick={() => setShowAdd(true)} style={{ fontSize: 13 }}>
                <Plus size={14} /> Add Transaction
              </button>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: 14, border: '1px solid var(--border-color)' }}>
        {sorted.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <SortTh label="Date"     field="date"     sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                <th>Category</th>
                <th>Description</th>
                <SortTh label="Amount"   field="amount"   sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                <th>Type</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {sorted.map(tx => (
                <tr key={tx.id}>
                  <td style={{ whiteSpace: 'nowrap', color: 'var(--text-secondary)', fontSize: 13 }}>
                    {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {categoryDot(tx.category)}
                      <span style={{ fontWeight: 500 }}>{tx.category}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 13, maxWidth: 200 }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                      {tx.description || '—'}
                    </span>
                  </td>
                  <td style={{
                    fontWeight: 600,
                    color: tx.type === 'income' ? 'var(--accent-green)' : 'var(--accent-red)',
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
                        <button
                          onClick={() => setEditTarget(tx)}
                          style={{
                            background: 'rgba(99,102,241,0.12)', color: 'var(--accent-blue-light)',
                            border: '1px solid rgba(99,102,241,0.3)', borderRadius: 7,
                            padding: '5px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                            transition: 'all 0.2s ease',
                          }}
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => setDeleteId(tx.id)}
                          style={{ padding: '5px 8px', display: 'flex', alignItems: 'center' }}
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <TransactionModal
          onClose={() => setShowAdd(false)}
          onSave={addTransaction}
        />
      )}

      {/* Edit Modal */}
      {editTarget && (
        <TransactionModal
          existing={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={editTransaction}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteId !== null && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setDeleteId(null)}>
          <div className="modal-box" style={{ maxWidth: 380 }}>
            <h3 style={{ fontWeight: 700, fontSize: 17, color: 'var(--text-primary)', marginBottom: 10 }}>
              🗑️ Delete Transaction
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 22 }}>
              Are you sure you want to delete this transaction? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-secondary" onClick={() => setDeleteId(null)} style={{ flex: 1 }}>
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={() => { deleteTransaction(deleteId); setDeleteId(null); }}
                style={{ flex: 1, padding: '8px 16px', fontWeight: 600 }}
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
