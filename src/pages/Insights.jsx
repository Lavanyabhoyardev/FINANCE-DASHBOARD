/**
 * Insights.jsx – Premium analytics page with gradient bars, animated progress, and glassmorphism tip
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
import { Target, AlertTriangle, TrendingDown, Award, BarChart2, Lightbulb } from 'lucide-react';

// Premium bar chart tooltip
const BarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: 12,
        padding: '12px 16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        fontSize: 13,
        minWidth: 150,
      }}>
        <p style={{ fontWeight: 800, marginBottom: 8, color: 'var(--text-heading)', fontFamily: 'Outfit,sans-serif', fontSize: 14, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 6 }}>
          {label}
        </p>
        {payload.map(p => (
          <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: p.fill, display: 'inline-block' }} />
              <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{p.name}</span>
            </div>
            <strong style={{ color: p.fill, fontFamily: 'Outfit,sans-serif' }}>${p.value.toLocaleString()}</strong>
          </div>
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

  const insightCards = [
    {
      title: 'Top Expense',
      value: topCategory.name,
      sub: formatCurrency(topCategory.value),
      icon: AlertTriangle,
      variant: 'rose',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      sub: `${formatCurrency(totalIncome - totalExpenses)} saved`,
      icon: Target,
      variant: Number(savingsRate) >= 20 ? 'emerald' : 'amber',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      sub: `${breakdown.length} categories`,
      icon: TrendingDown,
      variant: 'rose',
    },
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      sub: `Across ${monthlyData.length} months`,
      icon: Award,
      variant: 'emerald',
    },
  ];

  const variantColors = {
    violet:  { icon: 'var(--violet-light)',  bg: 'rgba(124,58,237,0.12)',   border: 'rgba(124,58,237,0.2)',  iconBg: 'rgba(124,58,237,0.15)', iconBorder: 'rgba(124,58,237,0.3)' },
    emerald: { icon: 'var(--emerald-light)', bg: 'rgba(5,150,105,0.1)',     border: 'rgba(52,211,153,0.2)',  iconBg: 'rgba(5,150,105,0.15)',  iconBorder: 'rgba(52,211,153,0.25)' },
    rose:    { icon: 'var(--rose-light)',    bg: 'rgba(190,24,93,0.1)',     border: 'rgba(251,113,133,0.2)', iconBg: 'rgba(190,24,93,0.15)',  iconBorder: 'rgba(251,113,133,0.25)' },
    amber:   { icon: 'var(--amber-light)',   bg: 'rgba(217,119,6,0.1)',     border: 'rgba(251,191,36,0.2)',  iconBg: 'rgba(217,119,6,0.15)',  iconBorder: 'rgba(251,191,36,0.25)' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Header */}
      <div className="animate-fade-in">
        <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Outfit,sans-serif', color: 'var(--text-heading)', marginBottom: 4 }}>
          Insights
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Analyse your spending patterns and track financial health.
        </p>
      </div>

      {/* Insight KPI Cards – 2×2 grid */}
      <div className="insight-grid animate-fade-in">
        {insightCards.map((card, i) => {
          const Icon = card.icon;
          const vc   = variantColors[card.variant] || variantColors.violet;
          return (
            <div
              key={card.title}
              className={`kpi-card ${card.variant} delay-${i + 1}`}
              style={{ animationName: 'fadeInUp', animationDuration: '0.4s', animationFillMode: 'both' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Outfit,sans-serif' }}>
                  {card.title}
                </p>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: vc.iconBg,
                  border: `1px solid ${vc.iconBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color={vc.icon} />
                </div>
              </div>
              <p style={{ fontSize: 26, fontWeight: 800, fontFamily: 'Outfit,sans-serif', color: vc.icon, letterSpacing: '-0.03em', marginBottom: 4 }}>
                {card.value}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Bar Chart */}
      <div className="glass-card animate-fade-in delay-2" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <BarChart2 size={16} color="var(--violet-light)" />
          <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Outfit,sans-serif', color: 'var(--text-heading)' }}>
            Monthly Income vs Expense
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>
          Side-by-side comparison per month
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyData} barGap={4} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="expenseBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fb7185" stopOpacity={1} />
                <stop offset="100%" stopColor="#be185d" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontFamily: 'Outfit,sans-serif' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={v => `$${v.toLocaleString()}`} width={70} />
            <Tooltip content={<BarTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
              formatter={(value) => (
                <span style={{ color: 'var(--text-secondary)', fontFamily: 'Outfit,sans-serif', fontWeight: 500 }}>{value}</span>
              )}
            />
            <Bar dataKey="income"  name="Income"  fill="url(#incomeBarGrad)"  radius={[6, 6, 0, 0]} maxBarSize={44} />
            <Bar dataKey="expense" name="Expense" fill="url(#expenseBarGrad)" radius={[6, 6, 0, 0]} maxBarSize={44} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown */}
      <div className="glass-card animate-fade-in delay-3" style={{ padding: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Outfit,sans-serif', color: 'var(--text-heading)', marginBottom: 4 }}>
          Spending by Category
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
          Where your money goes, broken down by category
        </p>

        {breakdown.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No expense data available.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {breakdown.map((item, i) => {
              const pct   = totalExpenses > 0 ? ((item.value / totalExpenses) * 100).toFixed(1) : 0;
              const color = categoryColors[item.name] || '#7c3aed';
              return (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: color,
                        boxShadow: `0 0 6px ${color}`,
                        flexShrink: 0,
                        display: 'inline-block',
                      }} />
                      <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Outfit,sans-serif', color: 'var(--text-primary)' }}>
                        {item.name}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        padding: '2px 8px', borderRadius: 12,
                        background: `${color}18`,
                        color: color,
                        fontFamily: 'Outfit,sans-serif',
                      }}>
                        {pct}%
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 700, color, fontFamily: 'Outfit,sans-serif', minWidth: 80, textAlign: 'right' }}>
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}bb)`,
                        boxShadow: `0 0 8px ${color}60`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Financial Tip – Glassmorphism */}
      <div className="animate-fade-in delay-4" style={{
        padding: '20px 24px',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(167,139,250,0.05))',
        border: '1px solid rgba(124,58,237,0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative glow */}
        <div style={{
          position: 'absolute', top: -30, right: -30,
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(124,58,237,0.08)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Lightbulb size={18} color="var(--violet-light)" />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, fontFamily: 'Outfit,sans-serif', color: 'var(--violet-light)', marginBottom: 6 }}>
              Financial Tip — 50/30/20 Rule
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 680 }}>
              Spend{' '}<strong style={{ color: 'var(--text-primary)' }}>50%</strong> on needs,{' '}
              <strong style={{ color: 'var(--text-primary)' }}>30%</strong> on wants, and save{' '}
              <strong style={{ color: 'var(--text-primary)' }}>20%</strong>.
              Your current savings rate is{' '}
              <strong style={{ color: Number(savingsRate) >= 20 ? 'var(--emerald-light)' : 'var(--amber-light)' }}>
                {savingsRate}%
              </strong>.
              {Number(savingsRate) >= 20
                ? ' 🎉 You\'re crushing your savings goals!'
                : ' Consider trimming discretionary spending to hit your 20% target.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
