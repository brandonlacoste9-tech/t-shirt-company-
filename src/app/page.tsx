'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HERO_IMG = '/aura_masterpiece_hero_v3_1777951421477.png';

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        fetch('/api/products').then(res => res.json()).then(setProducts);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-accent/30">
            {/* Promo Bar */}
            <div className="bg-accent text-white text-[0.6rem] font-black uppercase tracking-[0.4em] py-3 text-center fixed top-0 w-full z-[2000]">
                Aura Apex / Node 2.6 Active / Free Worldwide Shipping Sequence
            </div>

            {/* Header */}
            <nav className={`transition-all duration-700 ${scrolled ? 'h-20 bg-black/80' : 'h-[100px] bg-transparent'} pt-8`}>
                <div className="container-apex flex justify-between items-center h-full">
                    <Link href="/" className="text-2xl font-black tracking-tighter">AURA<span className="text-accent italic">APEX</span></Link>
                    <div className="flex gap-12">
                        <Link href="/vault" className="nav-link">The Vault</Link>
                        <Link href="#" className="nav-link">Collections</Link>
                        <Link href="#" className="nav-link">Bag [0]</Link>
                    </div>
                </div>
            </nav>

            {/* Cinematic Apex Hero */}
            <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-60">
                    <Image 
                        src={HERO_IMG} 
                        alt="Hero" 
                        fill 
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80"></div>
                </div>

                <div className="nebula-glow" style={{ top: '20%', left: '10%' }}></div>
                <div className="nebula-glow" style={{ bottom: '10%', right: '5%', background: 'radial-gradient(circle, #00f2ff 0%, transparent 70%)', opacity: 0.05 }}></div>

                <div className="relative z-10 text-center px-4 max-w-6xl reveal">
                    <span className="text-[0.65rem] font-black uppercase tracking-[0.6em] text-accent mb-10 block">Imperial Collection v1.0 / Autumn Sequence</span>
                    <h1 className="text-[12rem] text-apex gradient-text mb-12">SOVEREIGN</h1>
                    <p className="text-sm md:text-lg text-white/40 mb-16 max-w-2xl mx-auto font-medium tracking-[0.2em] leading-relaxed uppercase">
                        High-Fidelity Garment Engineering for the Sovereign Individual. sequenced in Canada, Fulfilled globally via the Apex Node.
                    </p>
                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                        <Link href="/vault" className="btn-apex">
                            Access The Vault
                        </Link>
                        <div className="text-[0.6rem] uppercase tracking-[0.6em] font-black text-white/20 border-l border-white/10 pl-8">
                            Sync Status: 100% Operational
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Apex Catalog */}
            <section className="relative py-60 container-apex">
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-white/5 pb-10">
                    <div className="reveal">
                        <h2 className="text-xs uppercase tracking-[0.5em] text-accent font-black mb-6">Active Engineering</h2>
                        <h3 className="text-7xl font-black text-apex tracking-tighter uppercase">Essentials</h3>
                    </div>
                    <Link href="/vault" className="text-[0.65rem] uppercase tracking-[0.4em] font-black opacity-30 hover:opacity-100 transition-opacity pb-2">
                        View Complete Catalog →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {products.length > 0 ? products.map((p: any) => (
                        <Link key={p.id} href={`/products/${p.handle || p.id}`} className="apex-card group reveal">
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <Image 
                                    src={p.image} 
                                    alt={p.name} 
                                    fill 
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                    <span className="text-[0.6rem] font-black uppercase tracking-widest bg-white text-black px-4 py-2 rounded-full">Explore Garment</span>
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-xl font-black tracking-tighter uppercase group-hover:text-accent transition-colors">{p.name}</h4>
                                    <span className="text-lg font-black text-accent">${p.price}</span>
                                </div>
                                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/20 font-black">Node SKU: {p.productCode}</p>
                            </div>
                        </Link>
                    )) : (
                        <div className="col-span-full h-80 apex-glass rounded-3xl flex items-center justify-center text-white/20 font-black uppercase tracking-[0.5em] text-xs">
                            Synchronizing Sales Node...
                        </div>
                    )}
                </div>
            </section>

            {/* Apex Footer */}
            <footer className="py-40 bg-black/40 border-t border-white/5">
                <div className="container-apex grid grid-cols-1 md:grid-cols-4 gap-20">
                    <div className="col-span-2 space-y-12">
                        <div className="text-4xl font-black tracking-tighter">AURA<span className="text-accent italic">APEX</span></div>
                        <p className="text-sm text-white/30 leading-relaxed font-medium max-w-sm">
                            The definitive signature in high-fidelity apparel. Engineered for the sovereign individual, fulfilled via the global Apliiq manufacturing sequence. Direct-to-patron retail.
                        </p>
                    </div>
                    <div className="space-y-8">
                        <h4 className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-white/20">Governance</h4>
                        <ul className="space-y-4 text-[0.65rem] font-black uppercase tracking-[0.4em] text-white/40">
                            <li><Link href="/vault" className="hover:text-white">The Vault</Link></li>
                            <li><Link href="/shipping" className="hover:text-white">Logistics & Shipping</Link></li>
                            <li><Link href="/returns" className="hover:text-white">Returns & Exchanges</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-8">
                        <h4 className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-white/20">Connect</h4>
                        <ul className="space-y-4 text-[0.65rem] font-black uppercase tracking-[0.4em] text-white/40">
                            <li><Link href="#" className="hover:text-white">Instagram</Link></li>
                            <li><Link href="#" className="hover:text-white">Email the Node</Link></li>
                            <li><Link href="/admin/sync" className="hover:text-white opacity-20">Sync Diagnostics</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-40 text-center text-[0.5rem] font-black uppercase tracking-[1em] text-white/5">
                    AURA THREADS CANADA &copy; 2026 / APEX NODE v2.6 / SOVEREIGNTY SECURED
                </div>
            </footer>
        </main>
    );
}
