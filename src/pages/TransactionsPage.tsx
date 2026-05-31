import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ExternalLink, Filter, Download } from 'lucide-react';

const transactions = [
  { type: 'receive' as const, token: 'ETH', amount: '+2.5', usdValue: '$8,325', chain: 'Ethereum', time: '2 min ago', status: 'confirmed' as const },
  { type: 'send' as const, token: 'USDC', amount: '-500', usdValue: '$500', chain: 'Polygon', time: '15 min ago', status: 'confirmed' as const },
  { type: 'swap' as const, token: 'ETH → ARB', amount: '+1,250 ARB', usdValue: '$1,750', chain: 'Arbitrum', time: '1 hour ago', status: 'confirmed' as const },
  { type: 'send' as const, token: 'MATIC', amount: '-1,000', usdValue: '$800', chain: 'Polygon', time: '3 hours ago', status: 'confirmed' as const },
  { type: 'receive' as const, token: 'BNB', amount: '+5.0', usdValue: '$3,000', chain: 'BNB Chain', time: '5 hours ago', status: 'pending' as const },
  { type: 'approve' as const, token: 'USDC', amount: '∞', usdValue: '-', chain: 'Ethereum', time: '8 hours ago', status: 'confirmed' as const },
  { type: 'swap' as const, token: 'OP → ETH', amount: '+0.5 ETH', usdValue: '$1,665', chain: 'Optimism', time: '12 hours ago', status: 'confirmed' as const },
  { type: 'send' as const, token: 'ETH', amount: '-1.0', usdValue: '$3,330', chain: 'Ethereum', time: '1 day ago', status: 'failed' as const },
];

const typeColors: Record<string, string> = { send: '#ef4444', receive: '#10b981', swap: '#3b82f6', approve: '#f59e0b' };
const statusStyles: Record<string, { label: string; color: string; bg: string }> = {
  confirmed: { label: 'Confirmed', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  pending: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  failed: { label: 'Failed', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
};

const cardBase: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
  backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
};

export default function TransactionsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>Transactions</h1>
          <p style={{ fontSize: 14, color: 'var(--dark-400)', marginTop: 4 }}>View your on-chain activity</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', color: 'var(--dark-200)', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Filter size={16} />Filter
          </button>
          <button style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', color: 'var(--dark-200)', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Download size={16} />Export
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        {[
          { label: 'Total Transactions', value: '1,284' },
          { label: 'Total Sent', value: '$128,450' },
          { label: 'Total Received', value: '$196,230' },
          { label: 'Gas Cost', value: '$1,892' },
        ].map(s => (
          <div key={s.label} style={{ ...cardBase, padding: 16 }}>
            <p style={{ fontSize: 12, color: 'var(--dark-400)', marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['All Chains', 'Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'BNB Chain'].map((c, i) => (
          <span key={c} style={{
            padding: '4px 12px', fontSize: 12, fontWeight: 500, borderRadius: 999,
            background: i === 0 ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.05)',
            color: i === 0 ? 'var(--accent)' : 'var(--dark-300)',
            border: i === 0 ? '1px solid rgba(99,102,241,0.2)' : '1px solid rgba(255,255,255,0.05)',
          }}>{c}</span>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {transactions.map((tx, idx) => {
          const status = statusStyles[tx.status];
          const TypeIcon = tx.type === 'receive' ? ArrowDownLeft : ArrowUpRight;
          return (
            <div key={idx} style={{
              ...cardBase, padding: 16, display: 'flex', alignItems: 'center', gap: 16,
              cursor: 'pointer', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12, background: 'var(--dark-800)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: typeColors[tx.type],
              }}>
                <TypeIcon size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'white', textTransform: 'capitalize' }}>{tx.type}</span>
                  <span style={{ fontSize: 12, color: 'var(--dark-400)' }}>{tx.token}</span>
                  <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 500, color: status.color, background: status.bg }}>{status.label}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--dark-400)' }}>
                  <span>{tx.chain}</span><span>·</span><span>{tx.time}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: tx.type === 'receive' || tx.type === 'swap' ? 'var(--accent-green)' : 'white' }}>{tx.amount}</p>
                {tx.usdValue !== '-' && <p style={{ fontSize: 12, color: 'var(--dark-400)', marginTop: 2 }}>{tx.usdValue}</p>}
              </div>
              <button style={{ padding: 8, color: 'var(--dark-400)', cursor: 'pointer' }}><ExternalLink size={16} /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
