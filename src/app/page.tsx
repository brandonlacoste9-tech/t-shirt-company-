'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/grid/ProductCard';

const HERO_IMG = '/aura_masterpiece_hero_v3_1777951421477.png';

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/products').then(res => res.json()).then(setProducts);
    }, []);

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-accent/30">
            <div className="bg-accent text-white text-[0.6rem] font-black uppercase tracking-[0.4em] py-3 text-center fixed top-0 w-full z-[2000]">
                Aura Apex / Node 2.6 Active / Free Worldwide Shipping Sequence
            </div>

            <Header />

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
                        <ProductCard key={p.id} product={p} />
                    )) : (
                        <div className="col-span-full h-80 apex-glass rounded-3xl flex items-center justify-center text-white/20 font-black uppercase tracking-[0.5em] text-xs">
                            Synchronizing Sales Node...
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
