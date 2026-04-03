/**
 * SummaryCard.jsx – Premium KPI card with gradient, icon glow, and trend pill
 * Props: title, value, icon, variant ('violet'|'emerald'|'rose'|'amber'), subtitle, trend
 */

import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function SummaryCard({ title, value, icon: Icon, variant = 'violet', subtitle, trend }) {
  const isPositive = trend >= 0;

  const iconColors = {
    violet: 'var(--violet-light)',
    emerald: 'var(--emerald-light)',
    rose:    'var(--rose-light)',
    amber:   'var(--amber-light)',
  };

  const iconColor = iconColors[variant] || iconColors.violet;

  return (
    <div className={`kpi-card ${variant} animate-fade-in`}>

      {/* Top row: label + icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          fontFamily: 'Outfit, sans-serif',
        }}>
          {title}
        </p>

        <div className={`icon-bubble ${variant}`}>
          <Icon size={20} color={iconColor} strokeWidth={2} />
        </div>
      </div>

      {/* Value */}
      <p style={{
        fontSize: 32,
        fontWeight: 800,
        fontFamily: 'Outfit, sans-serif',
        color: 'var(--text-heading)',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        marginBottom: 6,
      }}>
        {value}
      </p>

      {/* Subtitle */}
      {subtitle && (
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 12,
          marginBottom: 16,
        }}>
          {subtitle}
        </p>
      )}

      {/* Trend */}
      {trend !== undefined && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className={`trend-pill ${isPositive ? 'up' : 'down'}`}>
              {isPositive
                ? <ArrowUpRight size={11} />
                : <ArrowDownRight size={11} />
              }
              {isPositive ? '+' : ''}{trend}%
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              vs last month
            </span>
          </div>

          <div style={{ opacity: 0.4 }}>
            {isPositive
              ? <TrendingUp size={14} color="var(--emerald-light)" />
              : <TrendingDown size={14} color="var(--rose-light)" />
            }
          </div>
        </div>
      )}
    </div>
  );
}
