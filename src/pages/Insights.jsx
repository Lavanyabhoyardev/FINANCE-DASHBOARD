/**
 * Insights.jsx – Spending analytics page with key financial insights
 */

import { useApp } from '../context/AppContext';
import {
  formatCurrency,
  getTotalIncome,
  getTotalExpenses,
  getMonthlyData,
  getCategoryBreakdown,
  getHighestSpendingCategory,
} from '../utils/helpers';
import { categoryColors } from '../data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Target, AlertTriangle, TrendingDown, Award, PieChart } from 'lucide-react';

// Custom tooltip for bar chart
const BarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-color)',
        borderRadius: 10, padding: '10px 14px', fontSize: 13,
      }}>
        <p style={{ fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} style={{ color: p.fill || p.color, marginBottom: 2 }}>
            {p.name}: <strong>${p.value.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Insights() {
  const { transactions } = useApp();

  const totalIncome   = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const savingsRate   = totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : 0;
  const monthlyData   = getMonthlyData(transactions);
  const breakdown     = getCategoryBreakdown(transactions);
  const topCategory   = getHighestSpendingCategory(transactions);

  // Insight cards data
  const insightCards = [
    {
      title: 'Highest Spending Category',
      value: topCategory.name,
      sub: formatCurrency(topCategory.value),
      icon: AlertTriangle,
      color: 'var(--accent-red)',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      sub: `${formatCurrency(totalIncome - totalExpenses)} saved`,
      icon: Target,
      color: savingsRate > 20 ? 'var(--accent-green)' : 'var(--accent-yellow)',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      sub: `${breakdown.length} categories`,
      icon: TrendingDown,
      color: 'var(--accent-red)',
    },
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      sub: `Across ${monthlyData.length} months`,
      icon: Award,
      color: 'var(--accent-green)',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Insights</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Analyse your spending patterns and financial health.
        </p>
      </div>

      {/* Insight Cards */}
      <div className="summary-grid">
        {insightCards.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="glass-card animate-fade-in" style={{ padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 6 }}>
                    {card.title.toUpperCase()}
                  </p>
                  <p style={{ fontSize: 24, fontWeight: 800, color: card.color, letterSpacing: '-0.5px' }}>
                    {card.value}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{card.sub}</p>
                </div>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${card.color}18`,
                  border: `1px solid ${card.color}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} color={card.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Income vs Expense Bar Chart */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
          Monthly Income vs Expense
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
          Side-by-side comparison per month
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyData} barGap={4} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={v => `$${v.toLocaleString()}`} width={70} />
            <Tooltip content={<BarTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)', paddingTop: 8 }} />
            <Bar dataKey="income"  name="Income"  fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={48} />
            <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown List */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <PieChart size={18} color="var(--accent-blue-light)" />
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Spending by Category</h2>
        </div>

        {breakdown.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No expense data available.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {breakdown.map(item => {
              const pct = totalExpenses > 0 ? ((item.value / totalExpenses) * 100).toFixed(1) : 0;
              const color = categoryColors[item.name] || '#6366f1';
              return (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: color, flexShrink: 0, display: 'inline-block',
                      }} />
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{pct}%</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent-red)', minWidth: 80, textAlign: 'right' }}>
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tip box */}
      <div style={{
        padding: '16px 20px',
        borderRadius: 14,
        background: 'rgba(99,102,241,0.08)',
        border: '1px solid rgba(99,102,241,0.25)',
      }}>
        <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--accent-blue-light)', marginBottom: 4 }}>
          💡 Financial Tip
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          The 50/30/20 rule recommends spending 50% of income on needs, 30% on wants, and saving 20%.
          Your current savings rate is <strong style={{ color: 'var(--accent-blue-light)' }}>{savingsRate}%</strong>.
          {Number(savingsRate) >= 20
            ? ' 🎉 Great job! You are on track.'
            : ' Consider reducing discretionary spending to improve your savings.'}
        </p>
      </div>
    </div>
  );
}
