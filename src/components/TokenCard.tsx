import React from 'react';

export default function TokenCard({ name, symbol, balance, usdValue, change24h, chain = 'Ethereum' }: {
  name: string; symbol: string; balance: string; usdValue: string; change24h: number; chain?: string;
}) {
  const isPositive = change24h >= 0;
  const chainDot = (c: string) => {
    if (c === 'Ethereum') return '#3b82f6';
    if (c === 'BNB Chain') return '#f59e0b';
    if (c === 'Polygon') return '#8b5cf6';
    if (c === 'Arbitrum') return '#06b6d4';
    if (c === 'Optimism') return '#ef4444';
    return '#606060';
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16, padding: 16,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      cursor: 'pointer', transition: 'all 0.3s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(99,102,241,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)'; }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: 'linear-gradient(135deg, var(--dark-600), var(--dark-700))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 700, color: 'white',
        }}>
          {symbol.charAt(0)}
        </div>
        <span style={{
          position: 'absolute', bottom: -2, right: -2, width: 16, height: 16,
          borderRadius: '50%', border: '2px solid var(--dark-900)',
          background: chainDot(chain),
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{name}</h3>
          <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 6, background: 'rgba(255,255,255,0.05)', color: 'var(--dark-400)', fontWeight: 500 }}>{symbol}</span>
        </div>
        <p style={{ fontSize: 12, color: 'var(--dark-400)' }}>{chain}</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{balance}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginTop: 4 }}>
          <p style={{ fontSize: 12, color: 'var(--dark-400)' }}>{usdValue}</p>
          <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 500, color: isPositive ? 'var(--accent-green)' : 'var(--accent-red)' }}>
            {isPositive ? '+' : ''}{change24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
