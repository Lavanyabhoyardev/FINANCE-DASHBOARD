/**
 * Dashboard.jsx – Main overview page with premium layout
 */

import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, ArrowRight, Activity, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SummaryCard from '../components/SummaryCard';
import { SkeletonKPI, SkeletonChart } from '../components/SkeletonCard';
import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';
import { formatCurrency, getTotalIncome, getTotalExpenses, getBalance } from '../utils/helpers';
import { categoryColors } from '../data/mockData';

export default function Dashboard() {
  const { transactions } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const totalBalance  = getBalance(transactions);
  const totalIncome   = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const savingsRate   = totalIncome > 0
    ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* ── Page Header ───────────────────────── */}
      <div className="animate-fade-in">
        <h1 style={{
          fontSize: 28,
          fontWeight: 800,
          fontFamily: 'Outfit, sans-serif',
          color: 'var(--text-heading)',
          marginBottom: 4,
        }}>
          Financial Overview
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Welcome back! Here's a real-time summary of your finances.
        </p>
      </div>

      {/* ── KPI Cards ─────────────────────────── */}
      {loading ? (
        <div className="summary-grid">
          <SkeletonKPI />
          <SkeletonKPI />
          <SkeletonKPI />
        </div>
      ) : (
        <div className="summary-grid">
          <SummaryCard
            title="Total Balance"
            value={formatCurrency(totalBalance)}
            icon={Wallet}
            variant="violet"
            subtitle={`${transactions.length} total transactions`}
            trend={12.4}
          />
          <SummaryCard
            title="Total Income"
            value={formatCurrency(totalIncome)}
            icon={TrendingUp}
            variant="emerald"
            subtitle="All income sources"
            trend={8.2}
          />
          <SummaryCard
            title="Total Expenses"
            value={formatCurrency(totalExpenses)}
            icon={TrendingDown}
            variant="rose"
            subtitle="All spending categories"
            trend={-3.1}
          />
        </div>
      )}

      {/* ── Savings Rate + Quick Stats Banner ─── */}
      <div className="animate-fade-in delay-1" style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(167,139,250,0.06))',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: 'var(--radius-xl)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(124,58,237,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={17} color="var(--violet-light)" />
          </div>
          <div>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Outfit,sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Savings Rate</p>
            <p style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Outfit,sans-serif', color: Number(savingsRate) >= 20 ? 'var(--emerald-light)' : 'var(--amber-light)' }}>
              {savingsRate}%
            </p>
          </div>
        </div>

        <div style={{ width: 1, height: 40, background: 'var(--border-subtle)' }} />

        <div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Outfit,sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Saved This Period</p>
          <p style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Outfit,sans-serif', color: 'var(--violet-light)' }}>
            {formatCurrency(totalIncome - totalExpenses)}
          </p>
        </div>

        <div style={{ width: 1, height: 40, background: 'var(--border-subtle)' }} />

        <div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Outfit,sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Avg Transaction</p>
          <p style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Outfit,sans-serif', color: 'var(--text-primary)' }}>
            {transactions.length > 0 ? formatCurrency((totalIncome + totalExpenses) / transactions.length) : '$0'}
          </p>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <p style={{
            fontSize: 13,
            color: Number(savingsRate) >= 20 ? 'var(--emerald-light)' : 'var(--amber-light)',
            fontWeight: 600,
            fontFamily: 'Outfit,sans-serif',
          }}>
            {Number(savingsRate) >= 20 ? '🎉 Excellent savings health!' : '💡 Try to save 20% of income'}
          </p>
        </div>
      </div>

      {/* ── Charts Row ────────────────────────── */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }} className="charts-grid">
          <SkeletonChart />
          <SkeletonChart />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }} className="charts-grid animate-fade-in delay-2">
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h2 style={{
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: 'Outfit, sans-serif',
                  color: 'var(--text-heading)',
                  marginBottom: 3,
                }}>
                  Balance Trend
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Monthly income vs expenses</p>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '4px 10px', borderRadius: 20,
                background: 'var(--emerald-dim)',
                border: '1px solid rgba(52,211,153,0.2)',
              }}>
                <Activity size={11} color="var(--emerald-light)" />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--emerald-light)', fontFamily: 'Outfit,sans-serif' }}>LIVE</span>
              </div>
            </div>
            <LineChart />
          </div>

          <div className="glass-card" style={{ padding: 24 }}>
            <h2 style={{
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'Outfit, sans-serif',
              color: 'var(--text-heading)',
              marginBottom: 3,
            }}>
              Spending Breakdown
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>Expenses by category</p>
            <PieChart />
          </div>
        </div>
      )}

      {/* ── Recent Transactions ───────────────── */}
      <div className="glass-card animate-fade-in delay-3" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'Outfit, sans-serif',
              color: 'var(--text-heading)',
            }}>
              Recent Transactions
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Latest 5 entries</p>
          </div>
          <div style={{
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--violet-dim)',
            border: '1px solid rgba(124,58,237,0.2)',
            fontSize: 12,
            color: 'var(--violet-light)',
            fontWeight: 600,
            fontFamily: 'Outfit,sans-serif',
          }}>
            {transactions.length} total
          </div>
        </div>

        <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
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
              {transactions.slice(0, 5).map(tx => {
                const catColor = categoryColors[tx.category] || 'var(--violet)';
                return (
                  <tr key={tx.id}>
                    <td style={{ fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td>
                      <span className="badge-cat" style={{ background: `${catColor}18`, color: catColor, borderColor: `${catColor}35` }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: catColor, display: 'inline-block', flexShrink: 0 }} />
                        {tx.category}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: 13, maxWidth: 200 }}>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
