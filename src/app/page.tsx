'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HERO_IMG = '/aura_threads_hero_cinematic_1777949974270.png'; // Still high quality but will use in a clean context
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
        <main className="min-h-screen bg-white">
            {/* Header / Nav */}
            <header className="border-b border-border-light sticky top-0 bg-white z-[100]">
                <div className="container-clean h-20 flex justify-between items-center">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="text-2xl font-black bg-primary text-white px-2 py-1">
                            AURA
                        </Link>
                        <nav className="hidden md:flex gap-8 text-[0.8rem] font-bold uppercase tracking-tight">
                            <Link href="/vault" className="hover:text-primary border-b-2 border-transparent hover:border-primary pb-1">Designer Vault</Link>
                            <Link href="/swarm" className="hover:text-primary border-b-2 border-transparent hover:border-primary pb-1">Swarm Identity</Link>
                            <Link href="#" className="hover:text-primary border-b-2 border-transparent hover:border-primary pb-1 text-primary">New Arrivals</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                        <Link href="/swarm" className="p-2 hover:bg-gray-100 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </Link>
                        <button className="flex items-center gap-2 font-bold text-sm bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            <span>Cart</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Clean Hero */}
            <section className="bg-gray-100 py-12">
                <div className="container-clean">
                    <div className="relative aspect-[21/9] w-full overflow-hidden">
                        <Image 
                            src={HERO_IMG} 
                            alt="Collection Hero" 
                            fill 
                            className="object-cover grayscale brightness-125 contrast-75"
                        />
                        <div className="absolute inset-0 bg-white/10 flex flex-col justify-center items-start p-12 md:p-24">
                            <span className="bg-primary text-white text-[0.7rem] font-black px-3 py-1 mb-6 uppercase">Featured Collection</span>
                            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight text-black max-w-2xl leading-none uppercase">
                                Minimalist<br/>Sovereignty
                            </h1>
                            <p className="text-lg text-black/60 mb-8 max-w-lg font-medium">
                                High-fidelity streetwear designed for the modern voyageur. Pure cotton, precise sequences.
                            </p>
                            <Link href="/vault" className="btn-uniqlo">
                                Shop The Vault
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Grid Section */}
            <section className="py-24 animate-fade">
                <div className="container-clean">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-3xl font-black tracking-tight">NEW ARRIVALS</h2>
                        <Link href="/vault" className="text-sm font-bold border-b-2 border-black pb-1 hover:text-primary hover:border-primary transition-colors">VIEW ALL</Link>
                    </div>

                    {loading ? (
                        <div className="h-60 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">Synchronizing Catalog...</div>
                    ) : (
                        <div className="product-grid">
                            {products.length > 0 ? products.map((p: any) => (
                                <Link key={p.id} href={`/vault?product=${p.id}`} className="product-card-clean animate-fade">
                                    <div className="product-image-container">
                                        <Image 
                                            src={p.image || PRODUCT_MOCK} 
                                            alt={p.name} 
                                            fill 
                                            className="object-cover"
                                        />
                                        {p.isNew && (
                                            <div className="absolute top-4 left-4 bg-primary text-white text-[0.6rem] font-black px-2 py-1">NEW</div>
                                        )}
                                    </div>
                                    <div className="product-info-clean">
                                        <p className="product-category-clean">{p.brand || 'Aura Original'}</p>
                                        <h3 className="product-name-clean">{p.name}</h3>
                                        <p className="product-price-clean">${p.price}</p>
                                        <div className="flex gap-1 mt-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className={`w-3 h-3 rounded-full border border-gray-200 ${i === 1 ? 'bg-black' : i === 2 ? 'bg-white' : 'bg-gray-400'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            )) : (
                                <div className="col-span-full h-60 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest border-2 border-dashed border-gray-100">No garments detected in sales channel.</div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter / Foot Section */}
            <section className="bg-gray-50 py-24 border-t border-border-light">
                <div className="container-clean text-center">
                    <h2 className="text-4xl font-black mb-6">JOIN THE SWARM</h2>
                    <p className="text-gray-500 mb-10 max-w-md mx-auto">Subscribe for early access to Designer Vault drops and exclusive Admiral tier manufacturing runs.</p>
                    <div className="flex max-w-md mx-auto">
                        <input type="email" placeholder="Email Address" className="flex-1 px-6 py-4 border-2 border-r-0 border-black focus:outline-none" />
                        <button className="bg-black text-white px-8 py-4 font-black uppercase text-xs">Join</button>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-border-light bg-white">
                <div className="container-clean">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
                        <div className="space-y-4">
                            <h4 className="font-black text-[0.7rem] uppercase tracking-widest">ABOUT AURA</h4>
                            <ul className="space-y-2 text-gray-500 font-medium">
                                <li><Link href="#" className="hover:text-black">The Swarm</Link></li>
                                <li><Link href="#" className="hover:text-black">Manufacturing</Link></li>
                                <li><Link href="#" className="hover:text-black">Sovereignty</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-black text-[0.7rem] uppercase tracking-widest">HELP</h4>
                            <ul className="space-y-2 text-gray-500 font-medium">
                                <li><Link href="#" className="hover:text-black">Shipping</Link></li>
                                <li><Link href="#" className="hover:text-black">Returns</Link></li>
                                <li><Link href="#" className="hover:text-black">Voyage Tracker</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-black text-[0.7rem] uppercase tracking-widest">SOCIAL</h4>
                            <ul className="space-y-2 text-gray-500 font-medium">
                                <li><Link href="#" className="hover:text-black">Instagram</Link></li>
                                <li><Link href="#" className="hover:text-black">Twitter</Link></li>
                            </ul>
                        </div>
                        <div className="flex items-start justify-end">
                            <div className="text-3xl font-black text-gray-200">AURA</div>
                        </div>
                    </div>
                    <div className="mt-20 pt-8 border-t border-border-light text-[0.6rem] text-gray-400 font-bold uppercase tracking-[0.3em] flex justify-between">
                        <span>&copy; 2026 AURA THREADS CANADA</span>
                        <span>SOVEREIGN NODE V2.1</span>
                    </div>
                </div>
            </footer>
        </main>
    );
}
