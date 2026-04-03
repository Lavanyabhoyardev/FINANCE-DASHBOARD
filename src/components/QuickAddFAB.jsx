/**
 * QuickAddFAB.jsx – Floating action button to add a transaction (admin only)
 * Re-uses the same TransactionModal logic from TransactionTable
 */

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { allCategories } from '../data/mockData';

function TransactionModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    amount: '',
    category: 'Salary',
    type: 'income',
    description: '',
  });
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

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h3 style={{ fontWeight: 800, fontSize: 20, fontFamily: 'Outfit,sans-serif', color: 'var(--text-heading)' }}>
              Quick Add Transaction
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Add a new financial entry</p>
          </div>
          <button
            onClick={onClose}
            className="btn-icon"
            style={{ width: 36, height: 36 }}
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Type Toggle */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, fontFamily: 'Outfit,sans-serif' }}>
              Type
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['income', 'expense'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, type: t }))}
                  style={{
                    flex: 1,
                    padding: '9px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: 'Outfit,sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
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

          {/* Amount */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Outfit,sans-serif' }}>Amount ($)</span>
            <input
              type="number"
              className="input-field"
              placeholder="0.00"
              value={form.amount}
              min="0"
              step="0.01"
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              required
            />
          </label>

          {/* Category + Date row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Outfit,sans-serif' }}>Category</span>
              <select
                className="input-field"
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              >
                {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Outfit,sans-serif' }}>Date</span>
              <input
                type="date"
                className="input-field"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                required
              />
            </label>
          </div>

          {/* Description */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Outfit,sans-serif' }}>Description</span>
            <input
              type="text"
              className="input-field"
              placeholder="Optional note…"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </label>

          {error && (
            <p style={{ color: 'var(--rose-light)', fontSize: 13, background: 'var(--rose-dim)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(251,113,133,0.2)' }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button type="button" className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              <Plus size={15} /> Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function QuickAddFAB() {
  const { isAdmin, addTransaction } = useApp();
  const [open, setOpen] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <button
        className="fab"
        onClick={() => setOpen(true)}
        title="Quick Add Transaction"
        id="fab-add-transaction"
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      {open && (
        <TransactionModal
          onClose={() => setOpen(false)}
          onSave={addTransaction}
        />
      )}
    </>
  );
}
