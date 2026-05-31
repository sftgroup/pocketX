import React from 'react';
import { ChevronRight, Lock, Eye, Key, Shield, Palette, Globe, Bell, Smartphone, Wallet } from 'lucide-react';

const settingGroups = [
  {
    title: 'Security',
    items: [
      { icon: Lock, label: 'Auto-Lock', desc: 'Lock wallet after 5 min of inactivity', color: 'linear-gradient(135deg, #ef4444, #f59e0b)' },
      { icon: Eye, label: 'Show Balance', desc: 'Display balance on dashboard', color: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
      { icon: Key, label: 'Private Key', desc: 'Export or view private keys', color: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
      { icon: Shield, label: 'Two-Factor Auth', desc: 'Add extra layer of security', color: 'linear-gradient(135deg, #10b981, #34d399)' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: Palette, label: 'Theme', desc: 'Dark mode (default)', color: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
      { icon: Globe, label: 'Default Network', desc: 'Ethereum Mainnet', color: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
      { icon: Bell, label: 'Notifications', desc: 'Transaction alerts & market updates', color: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
      { icon: Smartphone, label: 'Mobile Sync', desc: 'Connect with PocketX mobile app', color: 'linear-gradient(135deg, #06b6d4, #10b981)' },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { icon: Wallet, label: 'Connected Dapps', desc: '8 dapps connected', color: 'linear-gradient(135deg, #6366f1, #3b82f6)' },
      { icon: Key, label: 'Seed Phrase', desc: 'Backup your recovery phrase', color: 'linear-gradient(135deg, #ef4444, #ec4899)' },
    ],
  },
];

const cardBase: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
  backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
};

export default function SettingsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>Settings</h1>
        <p style={{ fontSize: 14, color: 'var(--dark-400)', marginTop: 4 }}>Manage your wallet preferences</p>
      </div>

      <div className="gradient-border" style={{ padding: 20 }}>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700, color: 'white',
          }}>PX</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'white' }}>PocketX Wallet</h2>
            <p style={{ fontSize: 14, color: 'var(--dark-400)', fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>0x1a3...9b4c</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <span style={{ padding: '4px 12px', fontSize: 10, fontWeight: 500, borderRadius: 999, background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', border: '1px solid rgba(99,102,241,0.2)' }}>Ethereum</span>
              <span style={{ padding: '4px 12px', fontSize: 10, fontWeight: 500, borderRadius: 999, background: 'rgba(255,255,255,0.05)', color: 'var(--dark-300)', border: '1px solid rgba(255,255,255,0.05)' }}>Polygon</span>
              <span style={{ padding: '4px 12px', fontSize: 10, fontWeight: 500, borderRadius: 999, background: 'rgba(255,255,255,0.05)', color: 'var(--dark-300)', border: '1px solid rgba(255,255,255,0.05)' }}>+4 more</span>
            </div>
          </div>
          <button style={{ padding: '12px 24px', background: 'var(--accent)', color: 'white', fontWeight: 500, borderRadius: 12, cursor: 'pointer', fontSize: 14 }}>Edit Profile</button>
        </div>
      </div>

      {settingGroups.map(group => (
        <div key={group.title}>
          <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark-400)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: 4, marginBottom: 12 }}>{group.title}</h3>
          <div style={{ ...cardBase, overflow: 'hidden' }}>
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 16px', cursor: 'pointer',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: item.color, padding: '1px' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: 11, background: 'var(--dark-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={16} color="white" />
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: 'white' }}>{item.label}</p>
                    <p style={{ fontSize: 12, color: 'var(--dark-400)', marginTop: 2 }}>{item.desc}</p>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--dark-500)' }} />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <p style={{ fontSize: 12, color: 'var(--dark-500)' }}>
          PocketX v0.1.0 · Secured by encryption · 
          <span style={{ color: 'var(--accent)', cursor: 'pointer', marginLeft: 4 }}>Terms</span> 
          <span style={{ color: 'var(--dark-500)', margin: '0 4px' }}>·</span>
          <span style={{ color: 'var(--accent)', cursor: 'pointer' }}>Privacy</span>
        </p>
      </div>
    </div>
  );
}
