'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HERO_IMG = '/aura_masterpiece_hero_v3_1777951421477.png';
const NEBULA_BG = '/aura_nebula_texture_bg_1777951461525.png';

export default function Home() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrolled, setScrolled] = useState(false);
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        
        fetch('/api/products').then(res => res.json()).then(setProducts);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <main className="min-h-screen bg-[#050508] text-white selection:bg-secondary/30">
            {/* Custom Aura Glow */}
            <div className="aura-glow" style={{ left: mousePos.x, top: mousePos.y }} />

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 px-12 py-8 flex justify-between items-center ${scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5' : ''}`}>
                <Link href="/" className="text-3xl font-black tracking-tighter hover:opacity-70 transition-opacity">
                    AURA<span className="text-secondary italic">THREADS</span>
                </Link>
                <div className="flex gap-12 text-[0.65rem] font-black uppercase tracking-[0.4em] items-center">
                    <Link href="/vault" className="hover:text-secondary transition-colors">The Vault</Link>
                    <Link href="/swarm" className="hover:text-secondary transition-colors opacity-30">Identity</Link>
                    <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-secondary hover:text-white transition-all">
                        BAG [0]
                    </button>
                </div>
            </nav>

            {/* Cinematic Sovereign Hero */}
            <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src={HERO_IMG} 
                        alt="Aura Threads Masterpiece" 
                        fill 
                        className="object-cover opacity-70 animate-nebula"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent"></div>
                </div>
                
                <div className="relative z-10 text-center px-4 max-w-6xl animate-reveal">
                    <h1 className="text-8xl md:text-[14rem] font-black text-imperial mb-8 gradient-aura leading-none">
                        SOVEREIGN
                    </h1>
                    <p className="text-sm md:text-lg text-white/40 mb-16 max-w-xl mx-auto font-medium tracking-[0.2em] leading-relaxed uppercase">
                        High-Fidelity Engineering for the Modern Voyageur. Controlled by the Node.
                    </p>
                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                        <Link href="/vault" className="btn-sovereign">
                            Enter The Vault
                        </Link>
                        <div className="text-[0.6rem] uppercase tracking-[0.6em] font-black text-white/20 border-l border-white/10 pl-8">
                            Status: Online / Node 2.5
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Laboratory Section */}
            <section className="relative py-60 px-12 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
                    <Image src={NEBULA_BG} alt="Nebula" fill className="object-cover animate-nebula" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
                        <div>
                            <h2 className="text-xs uppercase tracking-[0.5em] text-secondary font-black mb-6">Current Sequence</h2>
                            <h3 className="text-6xl font-black text-imperial tracking-tighter">ESSENTIALS V1.0</h3>
                        </div>
                        <Link href="/vault" className="text-[0.6rem] uppercase tracking-[0.4em] font-black border-b border-white/20 pb-2 hover:border-secondary transition-colors">
                            View All Engineering
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {products.length > 0 ? products.slice(0, 3).map((p: any) => (
                            <Link key={p.id} href={`/vault?product=${p.id}`} className="obsidian-card group p-10 flex flex-col gap-8">
                                <div className="aspect-[4/5] relative overflow-hidden rounded-[24px]">
                                    <Image 
                                        src={p.image} 
                                        alt={p.name} 
                                        fill 
                                        className="object-cover transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[0.5rem] uppercase tracking-[0.4em] text-white/30 font-black mb-2">{p.brand}</p>
                                        <h4 className="text-xl font-black tracking-tight group-hover:text-secondary transition-colors">{p.name}</h4>
                                    </div>
                                    <span className="text-lg font-black text-secondary">${p.price}</span>
                                </div>
                            </Link>
                        )) : (
                            <div className="col-span-full h-80 obsidian-card flex items-center justify-center text-white/20 font-black uppercase tracking-[0.5em] text-xs">
                                Connecting to Sales Channel...
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Manifesto Section */}
            <section className="py-60 px-12 bg-black/40">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <h2 className="text-xs uppercase tracking-[0.8em] text-secondary font-black">The Manifesto</h2>
                    <p className="text-3xl md:text-5xl font-black text-imperial leading-tight tracking-tighter">
                        WE DO NOT DESIGN CLOTHING.<br/>
                        WE SEQUENCE <span className="text-secondary italic">DNA BLUEPRINTS</span><br/>
                        FOR THE SOVEREIGN INDIVIDUAL.
                    </p>
                    <div className="w-20 h-[1px] bg-white/10 mx-auto"></div>
                    <p className="text-sm md:text-lg text-white/40 leading-relaxed font-medium tracking-wide max-w-2xl mx-auto">
                        Every thread is a node. Every garment is a statement of sovereignty. Fulfilling the vision of the modern voyageur via Apliiq logistics.
                    </p>
                </div>
            </section>

            <footer className="py-20 border-t border-white/5 text-center">
                <div className="text-5xl font-black text-white/5 select-none tracking-[0.5em] mb-8">AURA</div>
                <p className="text-[0.5rem] uppercase tracking-[0.4em] text-white/20 font-black italic">
                    Aura Threads Canada &copy; 2026 / Colony OS Sovereign Node
                </p>
            </footer>
        </main>
    );
}
