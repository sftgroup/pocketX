import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, ChevronDown, LogOut, Copy, Check } from 'lucide-react';
import { useAccount, useBalance, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, bsc, base } from 'wagmi/chains';

const chains = [mainnet, polygon, optimism, arbitrum, bsc, base];
const chainColors: Record<number, string> = {
  [mainnet.id]: '#3b82f6',
  [polygon.id]: '#8b5cf6',
  [optimism.id]: '#ef4444',
  [arbitrum.id]: '#06b6d4',
  [bsc.id]: '#f59e0b',
  [base.id]: '#3b82f6',
};

export default function TopBar({ onConnectClick }: { onConnectClick: () => void }) {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [showNetwork, setShowNetwork] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [copied, setCopied] = useState(false);
  const netRef = useRef<HTMLDivElement>(null);
  const accRef = useRef<HTMLDivElement>(null);

  const currentChain = chains.find(c => c.id === chainId);
  const ethValue = balance ? (Number(balance.value) / 10 ** balance.decimals).toFixed(4) : '0';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (netRef.current && !netRef.current.contains(e.target as Node)) setShowNetwork(false);
      if (accRef.current && !accRef.current.contains(e.target as Node)) setShowAccount(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const btnStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '8px 12px', borderRadius: 12,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)',
    color: 'var(--dark-200)', fontSize: 14, cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute', right: 0, top: '100%', marginTop: 8,
    background: 'var(--dark-800)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12, boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    backdropFilter: 'blur(24px)', padding: '8px 0', zIndex: 50,
  };

  return (
    <header style={{
      height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.05)',
      background: 'rgba(10,10,10,0.5)', backdropFilter: 'blur(24px)',
    }}>
      <div style={{ position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--dark-400)' }} />
        <input
          placeholder="Search tokens, NFTs..."
          style={{
            width: 256, padding: '8px 12px 8px 36px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, color: 'var(--dark-200)', fontSize: 14,
            outline: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Network */}
        <div ref={netRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNetwork(!showNetwork)}
            style={btnStyle}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--dark-200)'; }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: chainColors[chainId] || 'var(--accent-green)',
              animation: 'pulse 2s infinite',
            }} />
            <span>{currentChain?.name || 'Network'}</span>
            <ChevronDown size={14} />
          </button>

          {showNetwork && (
            <div style={{ ...dropdownStyle, width: 180 }}>
              {chains.map(chain => (
                <button
                  key={chain.id}
                  onClick={() => { switchChain({ chainId: chain.id }); setShowNetwork(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 16px', width: '100%', fontSize: 14,
                    color: chain.id === chainId ? 'var(--accent)' : 'var(--dark-300)',
                    background: chain.id === chainId ? 'rgba(99,102,241,0.05)' : 'transparent',
                    transition: 'all 0.2s', cursor: 'pointer',
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: chainColors[chain.id] }} />
                  {chain.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notif */}
        <button style={{ ...btnStyle, padding: 10, position: 'relative' }}>
          <Bell size={16} />
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--accent-red)',
          }} />
        </button>

        {/* Account */}
        {!isConnected ? (
          <button
            onClick={onConnectClick}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 12,
              background: 'var(--accent)', color: 'white', fontSize: 14, fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-600)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; }}
          >
            <span style={{
              width: 20, height: 20, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10,
            }}>W</span>
            Connect Wallet
          </button>
        ) : (
          <div ref={accRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowAccount(!showAccount)}
              style={btnStyle}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--dark-200)'; }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <ChevronDown size={14} />
            </button>

            {showAccount && (
              <div style={{ ...dropdownStyle, width: 240 }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: 12, color: 'var(--dark-400)', marginBottom: 4 }}>Balance</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>{ethValue} ETH</p>
                </div>
                <div style={{ padding: '8px 16px' }}>
                  <p style={{ fontSize: 12, color: 'var(--dark-400)', marginBottom: 6 }}>Address</p>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 8,
                  }}>
                    <span style={{
                      flex: 1, fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
                      color: 'var(--dark-200)', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{address}</span>
                    <button
                      onClick={() => { if (address) { navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 2000); }}}
                      style={{ color: copied ? 'var(--accent-green)' : 'var(--dark-400)', cursor: 'pointer' }}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                <div style={{ padding: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <button
                    onClick={() => { disconnect(); setShowAccount(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '10px 12px', borderRadius: 12, width: '100%',
                      fontSize: 14, color: 'var(--accent-red)',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <LogOut size={16} /> Disconnect
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
