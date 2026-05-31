import React from 'react';
import { Filter, Grid3X3, List, ExternalLink, Clock, Eye } from 'lucide-react';

const nfts = [
  { name: 'Bored Ape #8845', collection: 'Bored Ape Yacht Club', image: '🦧', chain: 'Ethereum', floorPrice: '32.5 ETH', lastSale: '29.8 ETH' },
  { name: 'Azuki #3421', collection: 'Azuki', image: '🌸', chain: 'Ethereum', floorPrice: '5.8 ETH', lastSale: '6.2 ETH' },
  { name: 'Pudgy #5672', collection: 'Pudgy Penguins', image: '🐧', chain: 'Polygon', floorPrice: '8.2 ETH', lastSale: '7.9 ETH' },
  { name: 'DeGod #2231', collection: 'DeGods', image: '🎭', chain: 'Solana', floorPrice: '450 SOL', lastSale: '430 SOL' },
  { name: 'CloneX #7890', collection: 'CloneX', image: '👾', chain: 'Ethereum', floorPrice: '2.1 ETH', lastSale: '1.9 ETH' },
  { name: 'MAYC #4567', collection: 'Mutant Ape Yacht Club', image: '🐵', chain: 'Ethereum', floorPrice: '6.8 ETH', lastSale: '7.1 ETH' },
  { name: 'Doodles #8901', collection: 'Doodles', image: '🎨', chain: 'Ethereum', floorPrice: '3.4 ETH', lastSale: '3.6 ETH' },
  { name: 'Cool Cat #3456', collection: 'Cool Cats', image: '😺', chain: 'Ethereum', floorPrice: '0.8 ETH', lastSale: '0.75 ETH' },
];

const cardBase: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
  backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
};

export default function NFTsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>NFTs</h1>
          <p style={{ fontSize: 14, color: 'var(--dark-400)', marginTop: 4 }}>Browse your digital collectibles</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: 10, background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', color: 'var(--dark-200)', cursor: 'pointer' }}><Filter size={16} /></button>
          <button style={{ padding: 10, background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', color: 'var(--dark-200)', cursor: 'pointer' }}><Grid3X3 size={16} /></button>
          <button style={{ padding: 10, background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', color: 'var(--dark-200)', cursor: 'pointer' }}><List size={16} /></button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {[
          { label: 'Total NFTs', value: '24' },
          { label: 'Floor Value', value: '183.4 ETH', sub: '~$549,234' },
          { label: 'Collections', value: '8', sub: 'Across 3 chains' },
        ].map(s => (
          <div key={s.label} style={{ ...cardBase, padding: 20 }}>
            <p style={{ fontSize: 12, color: 'var(--dark-400)', marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{s.value}</p>
            {s.sub && <p style={{ fontSize: 12, color: 'var(--dark-400)', marginTop: 4 }}>{s.sub}</p>}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {nfts.map((nft, idx) => (
          <div key={nft.name} style={{
            ...cardBase, overflow: 'hidden', cursor: 'pointer',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
          >
            <div style={{
              aspectRatio: '1', background: 'linear-gradient(135deg, var(--dark-700), var(--dark-800))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, position: 'relative',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(17,17,17,0.6), transparent)',
                opacity: 0, transition: 'opacity 0.3s',
              }} className="nft-overlay" />
              <span style={{ position: 'relative', zIndex: 10 }}>{nft.image}</span>
              <button style={{
                position: 'absolute', top: 12, right: 12, zIndex: 20,
                padding: 6, background: 'rgba(17,17,17,0.5)', borderRadius: 8,
                opacity: 0, transition: 'opacity 0.3s', cursor: 'pointer',
              }} className="nft-ext-btn"><ExternalLink size={16} color="white" /></button>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} />
                <span style={{ fontSize: 10, color: 'var(--dark-400)' }}>{nft.chain}</span>
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nft.name}</h3>
              <p style={{ fontSize: 12, color: 'var(--dark-400)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 12 }}>{nft.collection}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--dark-400)' }}>
                  <Eye size={12} />Floor: <span style={{ color: 'white', fontWeight: 500 }}>{nft.floorPrice}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--dark-400)' }}>
                  <Clock size={12} />Last: <span style={{ color: 'white', fontWeight: 500 }}>{nft.lastSale}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
