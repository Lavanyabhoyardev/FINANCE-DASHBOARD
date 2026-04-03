/**
 * SummaryCard.jsx – A card that displays a financial summary metric
 * Props: title, value, icon, color, subtitle, trend
 */

import { TrendingUp, TrendingDown } from 'lucide-react';

export default function SummaryCard({ title, value, icon: Icon, color, subtitle, trend }) {
  const isPositive = trend >= 0;

  return (
    <div className="glass-card animate-fade-in" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
            {title}
          </p>
          <p style={{
            fontSize: 28, fontWeight: 700,
            color: color || 'var(--text-primary)',
            letterSpacing: '-0.5px',
          }}>
            {value}
          </p>
          {subtitle && (
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, marginTop: 4 }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Icon bubble */}
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: `${color}20`,
          border: `1px solid ${color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={22} color={color} />
        </div>
      </div>

      {/* Trend indicator */}
      {trend !== undefined && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          marginTop: 14, paddingTop: 14,
          borderTop: '1px solid var(--border-color)',
        }}>
          {isPositive
            ? <TrendingUp size={14} color="var(--accent-green)" />
            : <TrendingDown size={14} color="var(--accent-red)" />
          }
          <span style={{
            fontSize: 12, fontWeight: 600,
            color: isPositive ? 'var(--accent-green)' : 'var(--accent-red)',
          }}>
            {isPositive ? '+' : ''}{trend}%
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>vs last month</span>
        </div>
      )}
    </div>
  );
}
