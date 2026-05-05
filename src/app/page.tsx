'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HERO_IMG = '/aura_minimalist_hoodie_white_1777950947179.png';

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/products').then(res => res.json()).then(setProducts);
    }, []);

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Header */}
            <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-[100]">
                <div className="container-wide h-[90px] flex justify-between items-center">
                    <div className="flex items-center gap-16">
                        <Link href="/" className="text-2xl font-black tracking-tighter">AURA</Link>
                        <nav className="hidden md:flex gap-10">
                            <Link href="/vault" className="nav-link">Vault</Link>
                            <Link href="#" className="nav-link text-red-600">New Arrivals</Link>
                        </nav>
                    </div>
                    <div className="flex gap-8 items-center font-black text-[0.7rem] uppercase tracking-widest">
                        <button className="hover:opacity-40">Cart (0)</button>
                    </div>
                </div>
            </header>

            {/* Clean, High-End Hero */}
            <section className="bg-gray-50 py-20">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
                        <div className="animate-in">
                            <span className="tag-premium mb-8 inline-block">High-Fidelity Engineering</span>
                            <h1 className="mb-10 uppercase font-black tracking-tighter leading-[0.85]">
                                QUALITY<br/>WITHOUT<br/>COMPROMISE
                            </h1>
                            <p className="text-gray-500 text-lg max-w-md mb-12 font-medium leading-relaxed">
                                Premium streetwear engineered for the modern voyageur. Direct-to-patron manufacturing via Apliiq logistics.
                            </p>
                            <Link href="/vault" className="btn-main inline-block">
                                Explore The Vault
                            </Link>
                        </div>
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl animate-in">
                            <Image 
                                src={HERO_IMG} 
                                alt="Aura Minimalist Hoodie" 
                                fill 
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Organized Product Grid */}
            <section className="py-40">
                <div className="container-wide">
                    <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-10">
                        <h2 className="text-5xl font-black tracking-tighter uppercase">Essentials</h2>
                        <Link href="/vault" className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-red-600 hover:border-red-600 transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-20">
                        {products.length > 0 ? products.map((p: any) => (
                            <Link key={p.id} href={`/vault?product=${p.id}`} className="product-card group animate-in">
                                <div className="product-image rounded-sm">
                                    <Image 
                                        src={p.image} 
                                        alt={p.name} 
                                        fill 
                                        className="object-cover"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[0.6rem] font-black text-gray-300 uppercase tracking-[0.3em]">{p.brand}</p>
                                    <h3 className="text-lg font-black tracking-tight group-hover:underline underline-offset-8">{p.name}</h3>
                                    <p className="text-lg font-black text-red-600">${p.price}</p>
                                </div>
                            </Link>
                        )) : (
                            <div className="col-span-full h-80 flex items-center justify-center text-gray-200 font-black uppercase tracking-[0.4em] border-2 border-dashed border-gray-100 rounded-xl">
                                Synchronizing Collection Node...
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Minimalist Foot Section */}
            <footer className="py-24 border-t border-gray-100 bg-gray-50 mt-40">
                <div className="container-wide">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                        <div className="space-y-6">
                            <h4 className="font-black text-[0.7rem] uppercase tracking-[0.4em]">Aura Threads</h4>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                High-fidelity manufacturing at scale. Every garment is a statement of sovereignty.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-black text-[0.7rem] uppercase tracking-[0.4em]">Voyage Tracker</h4>
                            <ul className="space-y-3 text-[0.65rem] font-black uppercase tracking-widest text-gray-300">
                                <li><Link href="/vault" className="hover:text-black transition-colors">The Vault</Link></li>
                                <li><Link href="#" className="hover:text-black transition-colors">Shipping Node</Link></li>
                                <li><Link href="#" className="hover:text-black transition-colors">Support Center</Link></li>
                            </ul>
                        </div>
                        <div className="flex flex-col justify-end items-end">
                            <div className="text-6xl font-black text-gray-100 select-none">AURA</div>
                            <p className="text-[0.5rem] font-black text-gray-300 mt-4 uppercase tracking-[0.5em]">Node 2.5 Active</p>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
