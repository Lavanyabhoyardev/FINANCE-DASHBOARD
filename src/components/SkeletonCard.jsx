/**
 * SkeletonCard.jsx – Loading skeleton placeholders
 * Props: variant = 'kpi' | 'chart' | 'row' | 'list'
 */

export function SkeletonKPI() {
  return (
    <div className="kpi-card violet" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <div className="skeleton skeleton-text" style={{ width: '50%' }} />
          <div className="skeleton skeleton-value" style={{ marginTop: 8 }} />
          <div className="skeleton skeleton-text" style={{ width: '70%', marginTop: 8 }} />
        </div>
        <div className="skeleton" style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0 }} />
      </div>
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 12 }}>
        <div className="skeleton skeleton-text" style={{ width: '40%' }} />
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="glass-card" style={{ padding: 24 }}>
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-text" style={{ width: '55%', marginBottom: 20 }} />
      <div className="skeleton skeleton-full" style={{ borderRadius: 8 }} />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '13px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="skeleton" style={{ width: 80, height: 14, borderRadius: 4 }} />
      <div className="skeleton" style={{ width: 100, height: 22, borderRadius: 20 }} />
      <div className="skeleton" style={{ flex: 1, height: 14, borderRadius: 4 }} />
      <div className="skeleton" style={{ width: 70, height: 14, borderRadius: 4 }} />
      <div className="skeleton" style={{ width: 64, height: 22, borderRadius: 20 }} />
    </div>
  );
}

export default function SkeletonCard({ variant = 'kpi' }) {
  if (variant === 'chart') return <SkeletonChart />;
  if (variant === 'row')   return <SkeletonRow />;
  return <SkeletonKPI />;
}
