/**
 * Charts/PieChart.jsx – Premium donut chart with animated active slices and center label
 */

import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from 'recharts';
import { useState } from 'react';
import { getCategoryBreakdown } from '../../utils/helpers';
import { categoryColors } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

// Custom glass tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, payload: p } = payload[0];
    return (
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(124,58,237,0.25)',
        borderRadius: 12,
        padding: '12px 16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        fontSize: 13,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{
            width: 10, height: 10, borderRadius: '50%',
            background: p.fill,
            boxShadow: `0 0 8px ${p.fill}`,
            display: 'inline-block',
          }} />
          <span style={{ fontWeight: 800, color: 'var(--text-heading)', fontFamily: 'Outfit,sans-serif', fontSize: 14 }}>
            {name}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, fontSize: 12 }}>
          <span style={{ color: 'var(--text-muted)' }}>Amount</span>
          <strong style={{ color: p.fill, fontFamily: 'Outfit,sans-serif' }}>${value.toLocaleString()}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, fontSize: 12, marginTop: 3 }}>
          <span style={{ color: 'var(--text-muted)' }}>Share</span>
          <strong style={{ color: 'var(--text-primary)', fontFamily: 'Outfit,sans-serif' }}>{p.percent}%</strong>
        </div>
      </div>
    );
  }
  return null;
};

// Animated active slice
const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.9}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 15}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.4}
      />
    </g>
  );
};

export default function PieChart() {
  const { transactions } = useApp();
  const [activeIndex, setActiveIndex] = useState(null);

  const raw   = getCategoryBreakdown(transactions);
  const total = raw.reduce((s, d) => s + d.value, 0);
  const data  = raw.map(d => ({
    ...d,
    fill:    categoryColors[d.name] || '#7c3aed',
    percent: total > 0 ? ((d.value / total) * 100).toFixed(1) : '0',
  }));

  if (data.length === 0) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', height: 280, gap: 12,
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 20,
          background: 'var(--violet-dim)',
          border: '1px solid rgba(124,58,237,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 28 }}>📊</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No expense data available</p>
      </div>
    );
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={240}>
        <RePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={62}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill}
                stroke="transparent"
                style={{ filter: activeIndex === index ? `drop-shadow(0 0 8px ${entry.fill})` : 'none', cursor: 'pointer' }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </RePieChart>
      </ResponsiveContainer>

      {/* Legend list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
        {data.slice(0, 5).map((item, i) => (
          <div
            key={item.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              padding: '3px 0',
              opacity: activeIndex === null || activeIndex === i ? 1 : 0.4,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: item.fill,
              boxShadow: `0 0 6px ${item.fill}`,
              flexShrink: 0,
            }} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1, fontFamily: 'Inter,sans-serif' }}>
              {item.name}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.percent}%</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: item.fill, fontFamily: 'Outfit,sans-serif' }}>
              ${item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
