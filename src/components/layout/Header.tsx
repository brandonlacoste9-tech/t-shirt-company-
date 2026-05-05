'use client';

import { useState } from 'react';
import Link from 'next/link';
import CartDrawer from '../cart/CartDrawer';

export default function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <nav className="h-[100px] border-b border-white/5 flex items-center justify-between px-16 sticky top-0 bg-[#050505]/80 backdrop-blur-2xl z-[1000]">
                <Link href="/" className="text-2xl font-black tracking-tighter uppercase">AURA<span className="text-accent italic">APEX</span></Link>
                
                <div className="hidden md:flex gap-12 text-[0.65rem] font-black uppercase tracking-[0.4em]">
                    <Link href="/vault" className="nav-link">The Vault</Link>
                    <Link href="/collections/essentials" className="nav-link">Essentials</Link>
                    <Link href="/shipping" className="nav-link">Shipping</Link>
                </div>

                <div className="flex items-center gap-8">
                    <button className="text-white/40 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                    <button 
                        onClick={() => setIsCartOpen(true)}
                        className="text-[0.65rem] font-black uppercase tracking-[0.4em] bg-white text-black px-6 py-3 rounded-full hover:bg-accent hover:text-white transition-all"
                    >
                        Bag
                    </button>
                </div>
            </nav>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
