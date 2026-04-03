/**
 * Charts/LineChart.jsx – Premium area chart with rich gradient fills and glass tooltip
 */

import {
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { getMonthlyData } from '../../utils/helpers';
import { useApp } from '../../context/AppContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(124,58,237,0.25)',
        borderRadius: 12,
        padding: '12px 16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(124,58,237,0.1)',
        fontSize: 13,
        minWidth: 160,
      }}>
        <p style={{
          fontWeight: 800,
          marginBottom: 10,
          color: 'var(--text-heading)',
          fontFamily: 'Outfit, sans-serif',
          fontSize: 14,
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 6,
        }}>
          {label}
        </p>
        {payload.map(p => (
          <div key={p.dataKey} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: 5,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block', boxShadow: `0 0 6px ${p.color}` }} />
              <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{p.name}</span>
            </div>
            <strong style={{ color: p.color, fontFamily: 'Outfit,sans-serif' }}>
              ${p.value.toLocaleString()}
            </strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => (
  <div style={{ display: 'flex', gap: 20, justifyContent: 'center', paddingTop: 12 }}>
    {payload.map(entry => (
      <div key={entry.value} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{
          width: 24,
          height: 3,
          borderRadius: 2,
          background: entry.color,
          display: 'inline-block',
          boxShadow: `0 0 6px ${entry.color}`,
        }} />
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'Outfit,sans-serif', fontWeight: 500 }}>
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);

export default function LineChart() {
  const { transactions } = useApp();
  const data = getMonthlyData(transactions);

  return (
    <ResponsiveContainer width="100%" height={270}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          {/* Emerald income gradient */}
          <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#34d399" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
          </linearGradient>
          {/* Rose expense gradient */}
          <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#fb7185" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#fb7185" stopOpacity={0} />
          </linearGradient>
          {/* Violet balance gradient */}
          <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#a78bfa" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />

        <XAxis
          dataKey="month"
          tick={{ fill: 'var(--text-muted)', fontSize: 12, fontFamily: 'Outfit, sans-serif' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `$${v.toLocaleString()}`}
          width={70}
        />

        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />

        <Area
          type="monotoneX"
          dataKey="income"
          name="Income"
          stroke="#34d399"
          strokeWidth={2.5}
          fill="url(#incomeGrad)"
          dot={{ r: 3, fill: '#34d399', strokeWidth: 0 }}
          activeDot={{ r: 6, fill: '#34d399', stroke: 'rgba(52,211,153,0.3)', strokeWidth: 4 }}
        />
        <Area
          type="monotoneX"
          dataKey="expense"
          name="Expense"
          stroke="#fb7185"
          strokeWidth={2.5}
          fill="url(#expenseGrad)"
          dot={{ r: 3, fill: '#fb7185', strokeWidth: 0 }}
          activeDot={{ r: 6, fill: '#fb7185', stroke: 'rgba(251,113,133,0.3)', strokeWidth: 4 }}
        />
        <Area
          type="monotoneX"
          dataKey="balance"
          name="Balance"
          stroke="#a78bfa"
          strokeWidth={2.5}
          fill="url(#balanceGrad)"
          dot={{ r: 3, fill: '#a78bfa', strokeWidth: 0 }}
          activeDot={{ r: 6, fill: '#a78bfa', stroke: 'rgba(167,139,250,0.3)', strokeWidth: 4 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
