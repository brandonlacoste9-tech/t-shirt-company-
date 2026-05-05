'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const tiers = [
    { name: 'Explorer', threshold: 0, icon: '🧭' },
    { name: 'Navigator', threshold: 500, icon: '🗺️' },
    { name: 'Captain', threshold: 1500, icon: '⚓' },
    { name: 'Admiral', threshold: 5000, icon: '👑' }
];

export default function SwarmDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [blueprints, setBlueprints] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('swarm-token');
        if (!token) {
            router.push('/swarm');
            return;
        }

        // Fetch customer data from our API
        fetch('/api/auth/swarm/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            if (!res.ok) throw new Error('Session expired');
            return res.json();
        })
        .then(data => {
            setCustomer(data.customer);
            setOrders(data.customer.orders.edges.map((e: any) => e.node));
            
            // Parse blueprints from metafields
            const bpMeta = data.customer.metafields?.[0]?.value;
            if (bpMeta) setBlueprints(JSON.parse(bpMeta));
            
            setLoading(false);
        })
        .catch(() => {
            localStorage.removeItem('swarm-token');
            router.push('/swarm');
        });
    }, [router]);

    if (loading) return <div className="min-h-screen bg-[#050507] flex items-center justify-center text-white/20 font-mono tracking-widest uppercase text-xs">Authenticating with the Swarm...</div>;

    const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.totalPrice.amount), 0);
    const currentTier = [...tiers].reverse().find(t => totalSpent >= t.threshold) || tiers[0];

    return (
        <main className="min-h-screen bg-[#050507] text-white font-['Outfit'] p-10 pb-40">
            <nav className="mb-20 flex justify-between items-center max-w-7xl mx-auto">
                <Link href="/" className="logo text-2xl font-extrabold">AURA<span>THREADS</span></Link>
                <div className="flex gap-8 items-center text-xs font-bold uppercase tracking-widest">
                    <Link href="/" className="opacity-50 hover:opacity-100 transition-opacity">Store</Link>
                    <Link href="/vault" className="opacity-50 hover:opacity-100 transition-opacity">Vault</Link>
                    <button 
                        onClick={() => { localStorage.removeItem('swarm-token'); router.push('/swarm'); }}
                        className="opacity-50 hover:opacity-100 transition-opacity text-red-500"
                    >
                        Disconnect
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto animate-obsidian-open">
                <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
                    <div>
                        <h1 className="text-5xl font-extrabold mb-2">Welcome Back, <span className="gradient-text">{customer.firstName || 'Patron'}</span></h1>
                        <p className="text-white/40 text-lg">Your sovereign archive is synchronized.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center gap-6 backdrop-blur-xl">
                        <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-secondary/20">
                            {currentTier.icon}
                        </div>
                        <div>
                            <p className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-1">Swarm Status</p>
                            <p className="text-xl font-bold">{currentTier.name}</p>
                            <div className="w-32 h-1 bg-white/10 mt-2 rounded-full overflow-hidden">
                                <div className="h-full bg-secondary" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Voyage Archive */}
                    <div className="lg:col-span-8 space-y-8">
                        <h3 className="text-xs uppercase tracking-widest font-bold text-white/40 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-white/10"></span> Voyage Archive
                        </h3>
                        
                        {orders.length === 0 ? (
                            <div className="bg-white/5 border border-white/5 border-dashed p-20 rounded-[40px] text-center">
                                <p className="text-white/20 italic">No voyages recorded in this archive yet.</p>
                                <Link href="/#collection" className="inline-block mt-6 text-secondary text-sm font-bold uppercase tracking-widest hover:brightness-110 transition-all">Launch Your First Voyage &rarr;</Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {orders.map(order => (
                                    <div key={order.id} className="bg-white/5 border border-white/10 p-8 rounded-[40px] group hover:bg-white/10 transition-all relative overflow-hidden">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h4 className="text-2xl font-bold">{order.name}</h4>
                                                <p className="text-xs text-white/40 font-mono mt-1">{new Date(order.processedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                            </div>
                                            <Link href={`/voyage/${order.name}`} className="bg-secondary/10 text-secondary border border-secondary/20 px-6 py-2 rounded-full text-[0.6rem] font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all">
                                                Re-Track Voyage
                                            </Link>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="bg-white/5 text-[0.6rem] uppercase font-bold px-3 py-1 rounded-md text-white/40">{order.fulfillmentStatus || 'Processing'}</span>
                                            <span className="bg-white/5 text-[0.6rem] uppercase font-bold px-3 py-1 rounded-md text-white/40">${parseFloat(order.totalPrice.amount).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* DNA Vault / Presets */}
                    <div className="lg:col-span-4 space-y-8">
                        <h3 className="text-xs uppercase tracking-widest font-bold text-white/40 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-white/10"></span> DNA Vault
                        </h3>
                        
                        {blueprints.length === 0 ? (
                            <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] relative overflow-hidden group min-h-[300px] flex flex-col justify-center items-center text-center">
                                <div className="text-4xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity">🧬</div>
                                <h4 className="font-bold mb-2">Preset Vault Empty</h4>
                                <p className="text-xs text-white/40 leading-relaxed">Save your custom layouts from the Designer Vault to create instant blueprints.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {blueprints.map(bp => (
                                    <div key={bp.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-secondary transition-all blueprint-card">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-sm">{bp.name}</h4>
                                            <span className="text-[0.6rem] text-white/20 uppercase font-mono">{bp.id}</span>
                                        </div>
                                        <p className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-4">{bp.garment} / {bp.branding}</p>
                                        <button className="w-full bg-white/10 py-3 rounded-xl text-[0.6rem] font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all">
                                            Re-Voyage Blueprint
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 p-8 rounded-[40px] relative overflow-hidden group">
                            <h4 className="font-bold mb-4">Imperial Perks</h4>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-xs text-white/60">
                                    <span className="text-secondary">✓</span> High-fidelity tracking archives
                                </li>
                                <li className="flex items-center gap-3 text-xs text-white/60">
                                    <span className="text-secondary">✓</span> Priority manufacturing access
                                </li>
                                <li className={`flex items-center gap-3 text-xs ${currentTier.name === 'Admiral' ? 'text-white/60' : 'text-white/20'}`}>
                                    <span>{currentTier.name === 'Admiral' ? '✓' : '×'}</span> 
                                    Black-Label textures {currentTier.name === 'Admiral' ? '(Unlocked)' : '(Unlock at Admiral)'}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .logo { font-size: 1.5rem; font-weight: 800; color: white; text-decoration: none; }
                .logo span { color: #8a2be2; }
                .gradient-text { background: linear-gradient(135deg, #d4af37, #f9d976); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
            `}</style>
        </main>
    );
}
