/**
 * Transactions.jsx – Full transaction management page
 */

import { useApp } from '../context/AppContext';
import TransactionTable from '../components/TransactionTable';
import Filters from '../components/Filters';
import RoleSwitcher from '../components/RoleSwitcher';

export default function Transactions() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Page header */}
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Transactions</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          View, search, filter and manage all financial entries.
        </p>
      </div>

      {/* Role switcher banner */}
      <RoleSwitcher />

      {/* Filters */}
      <div className="glass-card" style={{ padding: 18 }}>
        <Filters />
      </div>

      {/* Table */}
      <div className="glass-card" style={{ padding: 24 }}>
        <TransactionTable />
      </div>
    </div>
  );
}
