/**
 * Transactions.jsx – Full transaction management page
 */

import { useApp } from '../context/AppContext';
import TransactionTable from '../components/TransactionTable';
import Filters from '../components/Filters';
import { Shield, Eye, ListFilter } from 'lucide-react';
import { formatCurrency, getTotalIncome, getTotalExpenses } from '../utils/helpers';

export default function Transactions() {
  const { isAdmin, role, transactions, filter, search, dateFrom, dateTo } = useApp();

  const filtered = transactions.filter(tx => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      tx.category.toLowerCase().includes(q) ||
      (tx.description || '').toLowerCase().includes(q) ||
      String(tx.amount).includes(q);
    const matchType = filter === 'all' || tx.type === filter;
    const matchFrom = !dateFrom || tx.date >= dateFrom;
    const matchTo   = !dateTo   || tx.date <= dateTo;
    return matchSearch && matchType && matchFrom && matchTo;
  });

  const income   = getTotalIncome(filtered);
  const expenses = getTotalExpenses(filtered);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Page Header */}
      <div className="animate-fade-in">
        <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Outfit,sans-serif', color: 'var(--text-heading)', marginBottom: 4 }}>
          Transactions
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          View, search, filter and manage all financial entries.
        </p>
      </div>

      {/* Role + Quick Stats Banner */}
      <div className="animate-fade-in delay-1" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {/* Role badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 16px',
          borderRadius: 'var(--radius-lg)',
          background: role === 'admin' ? 'rgba(124,58,237,0.1)' : 'rgba(5,150,105,0.08)',
          border: `1px solid ${role === 'admin' ? 'rgba(124,58,237,0.25)' : 'rgba(52,211,153,0.2)'}`,
          flex: '1 1 200px',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: role === 'admin' ? 'rgba(124,58,237,0.15)' : 'rgba(5,150,105,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {role === 'admin'
              ? <Shield size={16} color="var(--violet-light)" />
              : <Eye size={16} color="var(--emerald-light)" />
            }
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: role === 'admin' ? 'var(--violet-light)' : 'var(--emerald-light)', fontFamily: 'Outfit,sans-serif' }}>
              {role === 'admin' ? 'Admin Mode' : 'Viewer Mode'}
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {role === 'admin' ? 'You can add, edit & delete entries' : 'Read-only access — switch role in sidebar'}
            </p>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap', flex: '2 1 400px',
        }}>
          {[
            { label: 'Filtered Income', value: formatCurrency(income), color: 'var(--emerald-light)', dim: 'var(--emerald-dim)' },
            { label: 'Filtered Expenses', value: formatCurrency(expenses), color: 'var(--rose-light)', dim: 'var(--rose-dim)' },
            { label: 'Net (Filtered)', value: formatCurrency(income - expenses), color: income >= expenses ? 'var(--emerald-light)' : 'var(--rose-light)', dim: income >= expenses ? 'var(--emerald-dim)' : 'var(--rose-dim)' },
          ].map(stat => (
            <div key={stat.label} style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-lg)',
              background: stat.dim,
              border: `1px solid ${stat.color}25`,
              flex: '1 1 120px',
              minWidth: 120,
            }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Outfit,sans-serif', marginBottom: 4 }}>
                {stat.label}
              </p>
              <p style={{ fontSize: 18, fontWeight: 800, fontFamily: 'Outfit,sans-serif', color: stat.color }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card animate-fade-in delay-2" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <ListFilter size={15} color="var(--violet-light)" />
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Outfit,sans-serif' }}>
            Filters
          </span>
        </div>
        <Filters />
      </div>

      {/* Table */}
      <div className="glass-card animate-fade-in delay-3" style={{ padding: 24 }}>
        <TransactionTable />
      </div>
    </div>
  );
}
