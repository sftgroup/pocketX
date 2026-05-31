import React, { useState } from 'react';
import { Wallet, TrendingUp, BarChart3, Send, ArrowDownToLine, Coins, X } from 'lucide-react';
import { useAccount, useBalance, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import TokenCard from '../components/TokenCard';

const mockTokens = [
  { name: 'Ethereum', symbol: 'ETH', balance: '12.8456', usdValue: '$42,385.21', change24h: 3.42, chain: 'Ethereum' },
  { name: 'USDC', symbol: 'USDC', balance: '15,000.00', usdValue: '$15,000.00', change24h: 0.01, chain: 'Ethereum' },
  { name: 'BNB', symbol: 'BNB', balance: '48.23', usdValue: '$28,938.00', change24h: -1.23, chain: 'BNB Chain' },
  { name: 'Polygon', symbol: 'MATIC', balance: '5,234.00', usdValue: '$4,186.72', change24h: 5.67, chain: 'Polygon' },
  { name: 'Arbitrum', symbol: 'ARB', balance: '1,892.50', usdValue: '$2,649.50', change24h: 8.91, chain: 'Arbitrum' },
  { name: 'Optimism', symbol: 'OP', balance: '856.33', usdValue: '$1,712.66', change24h: -2.34, chain: 'Optimism' },
];

function Modal({ isOpen, onClose, title, children }: any) {
  if (!isOpen) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 100 }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 101, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <div style={{ background: 'var(--dark-800)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, width: '100%', maxWidth: 440, boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'white' }}>{title}</h2>
            <button onClick={onClose} style={{ padding: 6, borderRadius: 8, color: 'var(--dark-400)', cursor: 'pointer' }}><X size={20} /></button>
          </div>
          <div style={{ padding: '16px 24px' }}>{children}</div>
        </div>
      </div>
    </>
  );
}

function SendModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [toAddr, setToAddr] = useState('');
  const [amount, setAmount] = useState('');
  const { sendTransaction, isPending } = useSendTransaction();
  const balStr = balance ? (Number(balance.value) / 10 ** balance.decimals).toFixed(4) : '0';

  const handleSend = () => {
    if (!toAddr || !amount) return;
    sendTransaction({ to: toAddr as `0x${string}`, value: parseEther(amount) });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--dark-400)', fontWeight: 500, display: 'block', marginBottom: 6 }}>From</label>
          <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', fontSize: 14, color: 'var(--dark-200)', fontFamily: "'JetBrains Mono', monospace" }}>
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--dark-400)', fontWeight: 500, display: 'block', marginBottom: 6 }}>To Address</label>
          <input value={toAddr} onChange={e => setToAddr(e.target.value)} placeholder="0x..."
            style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white', fontSize: 14, fontFamily: "'JetBrains Mono', monospace", outline: 'none' }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--dark-400)', fontWeight: 500, display: 'block', marginBottom: 6 }}>Amount · Balance: {balStr} ETH</label>
          <div style={{ position: 'relative' }}>
            <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.0"
              style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white', fontSize: 18, fontWeight: 600, outline: 'none' }} />
            <button onClick={() => setAmount(balStr)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', padding: '4px 8px', fontSize: 12, fontWeight: 500, background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', borderRadius: 8, cursor: 'pointer' }}>
              MAX
            </button>
          </div>
        </div>
        <button onClick={handleSend} disabled={!toAddr || !amount || isPending}
          style={{ width: '100%', padding: 12, background: 'var(--accent)', color: 'white', fontWeight: 500, borderRadius: 12, cursor: (!toAddr || !amount || isPending) ? 'not-allowed' : 'pointer', opacity: (!toAddr || !amount || isPending) ? 0.5 : 1, transition: 'all 0.2s' }}>
          {isPending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </Modal>
  );
}

function ReceiveModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { address } = useAccount();
  const [copied, setCopied] = useState(false);
  const copy = () => { if (address) { navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 2000); }};

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Receive">
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ width: 192, height: 192, margin: '0 auto', background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 64, opacity: 0.3 }}>◆</span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--dark-400)' }}>Send tokens to this address</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ flex: 1, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", color: 'var(--dark-200)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{address}</span>
          <button onClick={copy} style={{ padding: '4px 12px', fontSize: 12, fontWeight: 500, background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', borderRadius: 8, cursor: 'pointer' }}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function WalletPage({ onConnectClick }: { onConnectClick: () => void }) {
  const { address, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({ address });
  const [sendOpen, setSendOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);

  const ethAmount = ethBalance ? Number(ethBalance.value) / 10 ** ethBalance.decimals : 0;
  const totalBalance = isConnected ? `$${(ethAmount * 3320).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : '$94,872.09';

  const sectionStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
    backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  };

  if (!isConnected) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 24 }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            width: 80, height: 80, margin: '0 auto', borderRadius: 16,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 15px rgba(99,102,241,0.15)',
          }}>
            <Wallet size={40} color="white" />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>Connect Your Wallet</h2>
          <p style={{ color: 'var(--dark-400)', maxWidth: 400, lineHeight: 1.5 }}>
            Connect your wallet to view your multi-chain portfolio, send tokens, and manage your NFTs.
          </p>
          <button onClick={onConnectClick}
            style={{
              margin: '0 auto', padding: '12px 32px', background: 'var(--accent)',
              color: 'white', fontWeight: 600, borderRadius: 12, cursor: 'pointer',
              boxShadow: '0 0 15px rgba(99,102,241,0.15)', fontSize: 16,
            }}>
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SendModal isOpen={sendOpen} onClose={() => setSendOpen(false)} />
      <ReceiveModal isOpen={receiveOpen} onClose={() => setReceiveOpen(false)} />

      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>Portfolio</h1>
        <p style={{ fontSize: 14, color: 'var(--dark-400)', marginTop: 4 }}>Manage your multi-chain assets</p>
      </div>

      {/* Balance */}
      <div className="gradient-border" style={{ padding: 24 }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <p style={{ fontSize: 12, color: 'var(--dark-400)', fontWeight: 500, marginBottom: 8 }}>Total Balance</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>{totalBalance}</h2>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 500, color: 'var(--accent-green)' }}>
              <TrendingUp size={16} />+2.45%
            </span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--dark-400)' }}>
            {address?.slice(0,6)}...{address?.slice(-4)} · {ethAmount.toFixed(4)} ETH
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            {[
              { label: 'Send', icon: Send, color: 'linear-gradient(135deg, var(--accent), var(--accent-purple))', onClick: () => setSendOpen(true) },
              { label: 'Receive', icon: ArrowDownToLine, color: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))', onClick: () => setReceiveOpen(true) },
              { label: 'Buy', icon: TrendingUp, color: 'linear-gradient(135deg, var(--accent-green), #34d399)', onClick: () => {} },
              { label: 'Swap', icon: Coins, color: 'linear-gradient(135deg, var(--accent-orange), #fbbf24)', onClick: () => {} },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button key={action.label} onClick={action.onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: action.color, padding: '1.5px' }}>
                    <div style={{
                      width: '100%', height: '100%', borderRadius: 10,
                      background: 'rgba(10,10,10,0.9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(20,20,20,0.9)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,10,0.9)'; }}
                    >
                      <Icon size={20} color="white" />
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--dark-400)' }}>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {[
          { label: 'Status', value: 'Connected', sub: 'Ethereum Mainnet' },
          { label: 'Best Performer', value: 'ARB', sub: '+8.91% today' },
          { label: '24h Volume', value: '$12,458', sub: '+$2,340 from yesterday' },
          { label: 'Chains', value: '6', sub: 'ETH, BSC, POLY, OP, ARB, BASE' },
        ].map(s => (
          <div key={s.label} style={{ ...sectionStyle, padding: 20 }}>
            <p style={{ fontSize: 12, color: 'var(--dark-400)', fontWeight: 500, marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{s.value}</p>
            <p style={{ fontSize: 12, color: 'var(--dark-400)', marginTop: 4 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Assets */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: 'white' }}>Assets</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ padding: '4px 12px', fontSize: 12, fontWeight: 500, borderRadius: 999, background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', border: '1px solid rgba(99,102,241,0.2)' }}>All</span>
            <span style={{ padding: '4px 12px', fontSize: 12, fontWeight: 500, borderRadius: 999, background: 'rgba(255,255,255,0.05)', color: 'var(--dark-300)', border: '1px solid rgba(255,255,255,0.05)' }}>Chains</span>
            <span style={{ padding: '4px 12px', fontSize: 12, fontWeight: 500, borderRadius: 999, background: 'rgba(255,255,255,0.05)', color: 'var(--dark-300)', border: '1px solid rgba(255,255,255,0.05)' }}>Favorites</span>
          </div>
        </div>
        {ethBalance && (
          <div style={{ marginBottom: 8 }}>
            <TokenCard name="Ethereum" symbol="ETH" balance={ethAmount.toFixed(6)} usdValue={`$${(ethAmount * 3320).toFixed(2)}`} change24h={3.42} chain="Ethereum" />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {mockTokens.map((token, idx) => (
            <TokenCard key={token.symbol} {...token} />
          ))}
        </div>
      </div>
    </div>
  );
}
