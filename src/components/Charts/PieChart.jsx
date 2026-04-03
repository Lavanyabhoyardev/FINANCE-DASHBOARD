/**
 * Charts/PieChart.jsx – Spending breakdown by category using Recharts
 */

import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { getCategoryBreakdown } from '../../utils/helpers';
import { categoryColors } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: '10px 14px',
        boxShadow: 'var(--shadow)',
        fontSize: 13,
      }}>
        <p style={{ fontWeight: 700, color: payload[0].payload.fill, marginBottom: 4 }}>
          {payload[0].name}
        </p>
        <p style={{ color: 'var(--text-primary)' }}>
          Amount: <strong>${payload[0].value.toLocaleString()}</strong>
        </p>
        <p style={{ color: 'var(--text-muted)' }}>
          Share: <strong>{payload[0].payload.percent}%</strong>
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null; // hide tiny slices
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChart() {
  const { transactions } = useApp();
  const raw = getCategoryBreakdown(transactions);
  const total = raw.reduce((s, d) => s + d.value, 0);
  const data = raw.map(d => ({
    ...d,
    fill: categoryColors[d.name] || '#6366f1',
    percent: total > 0 ? ((d.value / total) * 100).toFixed(1) : '0',
  }));

  if (data.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260 }}>
        <p style={{ color: 'var(--text-muted)' }}>No expense data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RePieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
          labelLine={false}
          label={renderCustomLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }}
          formatter={(value) => <span style={{ color: 'var(--text-secondary)' }}>{value}</span>}
        />
      </RePieChart>
    </ResponsiveContainer>
  );
}
