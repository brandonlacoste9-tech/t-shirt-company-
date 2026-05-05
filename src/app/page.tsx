'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className="min-h-screen bg-white text-black font-sans">
            {/* Standard Header */}
            <header className="border-b border-gray-200 bg-white sticky top-0 z-[100]">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <Link href="/" className="text-xl font-black tracking-tight">AURA THREADS</Link>
                    <nav className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest">
                        <Link href="/vault" className="hover:text-red-600 transition-colors">The Vault</Link>
                        <Link href="#" className="hover:text-red-600 transition-colors">Catalog</Link>
                        <Link href="#" className="hover:text-red-600 transition-colors">Support</Link>
                    </nav>
                    <div className="flex items-center space-x-6">
                        <button className="text-xs font-bold uppercase tracking-widest hover:text-red-600">Cart (0)</button>
                    </div>
                </div>
            </header>

            {/* Standard Hero Banner */}
            <section className="relative h-[60vh] bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image 
                    src="/aura_minimalist_hoodie_white_1777950947179.png" 
                    alt="Hero" 
                    fill 
                    className="object-cover opacity-60"
                    priority
                />
                <div className="relative text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">New Collection</h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">High-fidelity textiles engineered for the modern voyageur. Direct-to-patron manufacturing.</p>
                    <Link href="/vault" className="inline-block bg-black text-white px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-red-600 transition-colors">
                        Shop The Vault
                    </Link>
                </div>
            </section>

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Featured Items</h2>
                    <Link href="/vault" className="text-[0.6rem] font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:text-red-600 hover:border-red-600 transition-colors">View All</Link>
                </div>

                {loading ? (
                    <div className="h-60 flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-xs">Syncing Catalog...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {products.map((p: any) => (
                            <Link key={p.id} href={`/vault?product=${p.id}`} className="group flex flex-col gap-4">
                                <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden rounded-sm">
                                    <Image 
                                        src={p.image} 
                                        alt={p.name} 
                                        fill 
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">{p.brand || 'Aura'}</p>
                                    <h3 className="text-sm font-bold leading-tight group-hover:underline">{p.name}</h3>
                                    <p className="text-sm font-black text-red-600">${p.price.toFixed(2)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* Simple Footer */}
            <footer className="border-t border-gray-100 bg-white py-16">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest">Aura Threads</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">Advanced garment engineering for the sovereign individual. Node v2.6.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest">Support</h4>
                        <ul className="text-xs font-bold uppercase tracking-widest text-gray-400 space-y-2">
                            <li><Link href="#" className="hover:text-black">Shipping</Link></li>
                            <li><Link href="#" className="hover:text-black">Returns</Link></li>
                            <li><Link href="#" className="hover:text-black">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col justify-end items-end text-gray-200">
                        <span className="text-4xl font-black select-none">AURA</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
