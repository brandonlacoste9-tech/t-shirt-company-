'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HERO_IMG = '/aura_threads_hero_cinematic_1777949974270.png';
const PRODUCT_MOCK = '/aura_minimalist_hoodie_white_1777950947179.png';

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-red-100">
            {/* Minimal Header */}
            <header className="border-b border-gray-100 sticky top-0 bg-white z-[100]">
                <div className="max-w-[1440px] mx-auto h-20 flex justify-between items-center px-6 md:px-12">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="text-2xl font-black bg-black text-white px-3 py-1">
                            AURA
                        </Link>
                        <nav className="hidden md:flex gap-8 text-[0.75rem] font-bold uppercase tracking-tight">
                            <Link href="/vault" className="hover:text-red-600 transition-colors">Designer Vault</Link>
                            <Link href="#" className="text-red-600">New Arrivals</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 font-bold text-[0.75rem] uppercase tracking-tighter bg-gray-100 px-5 py-2.5 rounded-full hover:bg-gray-200 transition-all">
                            <span>Bag</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Direct Hero */}
            <section className="bg-gray-50 py-10">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm">
                        <Image 
                            src={HERO_IMG} 
                            alt="Collection" 
                            fill 
                            className="object-cover contrast-75 brightness-110 grayscale"
                            priority
                        />
                        <div className="absolute inset-0 bg-white/5 flex flex-col justify-center items-start p-10 md:p-20">
                            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.85] uppercase">
                                MINIMAL<br/>SOVEREIGNTY
                            </h1>
                            <Link href="/vault" className="bg-black text-white px-10 py-4 font-black uppercase text-[0.7rem] tracking-widest hover:bg-red-600 transition-colors">
                                Shop The Collection
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Organized Product Grid */}
            <section className="py-24">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-6">
                        <h2 className="text-3xl font-black tracking-tighter uppercase">Essentials</h2>
                        <Link href="/vault" className="text-xs font-bold border-b border-black pb-1 hover:text-red-600 hover:border-red-600 transition-colors">VIEW ALL</Link>
                    </div>

                    {loading ? (
                        <div className="h-60 flex items-center justify-center text-gray-300 font-bold uppercase tracking-[0.2em] text-sm italic">Synchronizing...</div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                            {products.length > 0 ? products.map((p: any) => (
                                <Link key={p.id} href={`/vault?product=${p.id}`} className="group block">
                                    <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden mb-4 rounded-sm">
                                        <Image 
                                            src={p.image || PRODUCT_MOCK} 
                                            alt={p.name} 
                                            fill 
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">{p.brand || 'AURA'}</p>
                                        <h3 className="text-sm font-bold leading-tight group-hover:underline underline-offset-4">{p.name}</h3>
                                        <p className="text-sm font-black text-red-600">${p.price}</p>
                                    </div>
                                </Link>
                            )) : (
                                <div className="col-span-full h-60 flex items-center justify-center border-2 border-dashed border-gray-100 text-gray-300 font-black uppercase tracking-widest">Store catalog is empty</div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Minimal Footer */}
            <footer className="py-20 border-t border-gray-100 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                        <div className="space-y-6">
                            <h4 className="font-black text-[0.7rem] uppercase tracking-widest text-black">Aura Threads</h4>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                High-fidelity apparel engineering. Direct-to-patron manufacturing via Apliiq logistics.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-black text-[0.7rem] uppercase tracking-widest text-black">Links</h4>
                            <ul className="space-y-3 text-xs font-bold uppercase tracking-tight text-gray-400">
                                <li><Link href="/vault" className="hover:text-black">Designer Vault</Link></li>
                                <li><Link href="#" className="hover:text-black">Voyage Tracker</Link></li>
                                <li><Link href="#" className="hover:text-black">Support</Link></li>
                            </ul>
                        </div>
                        <div className="flex flex-col justify-end items-end">
                            <div className="text-5xl font-black text-gray-100 select-none">AURA</div>
                            <p className="text-[0.6rem] text-gray-300 font-black mt-4 uppercase tracking-[0.4em]">Node v2.5 Online</p>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
