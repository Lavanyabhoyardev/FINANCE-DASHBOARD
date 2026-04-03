/**
 * Dashboard.jsx – Main overview page with summary cards and charts
 */

import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SummaryCard from '../components/SummaryCard';
import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';
import TransactionTable from '../components/TransactionTable';
import Filters from '../components/Filters';
import { formatCurrency, getTotalIncome, getTotalExpenses, getBalance } from '../utils/helpers';

export default function Dashboard() {
  const { transactions } = useApp();

  const totalBalance  = getBalance(transactions);
  const totalIncome   = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Page header */}
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
          Financial Overview
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Welcome back! Here's a summary of your finances.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <SummaryCard
          title="Total Balance"
          value={formatCurrency(totalBalance)}
          icon={Wallet}
          color="var(--accent-blue-light)"
          subtitle={`${transactions.length} total transactions`}
          trend={12.4}
        />
        <SummaryCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon={TrendingUp}
          color="var(--accent-green)"
          subtitle="All income sources"
          trend={8.2}
        />
        <SummaryCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon={TrendingDown}
          color="var(--accent-red)"
          subtitle="All spending categories"
          trend={-3.1}
        />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }} className="charts-grid">
        <div className="glass-card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Balance Trend</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
            Monthly income vs expenses over time
          </p>
          <LineChart />
        </div>

        <div className="glass-card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Spending Breakdown</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
            Expenses by category
          </p>
          <PieChart />
        </div>
      </div>

      {/* Recent Transactions (last 5) */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Transactions</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Latest 5 entries</p>
          </div>
        </div>
        {/* Mini table of last 5 transactions */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map(tx => (
                <tr key={tx.id}>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td style={{ fontWeight: 500 }}>{tx.category}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{tx.description}</td>
                  <td style={{ fontWeight: 600, color: tx.type === 'income' ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                  <td>
                    <span className={`badge badge-${tx.type}`}>
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
