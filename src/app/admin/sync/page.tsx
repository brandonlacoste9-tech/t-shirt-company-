'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SyncDoctor() {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const checkSync = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setStatus(data);
        } catch (e) {
            setStatus({ error: 'Connection Failed' });
        }
        setLoading(false);
    };

    useEffect(() => {
        checkSync();
    }, []);

    return (
        <main className="min-h-screen bg-[#050505] text-white p-20 font-sans">
            <header className="mb-20">
                <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">Shopify Sync Doctor</h1>
                <p className="text-white/40 text-sm">Diagnostic tool for Aura Apex Storefront.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Connection Status */}
                <div className="apex-glass p-10 rounded-3xl space-y-8">
                    <h2 className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-accent">I. Connection Intelligence</h2>
                    <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${status?.error ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
                        <span className="font-black text-sm uppercase tracking-widest">
                            {status?.error ? 'Bridge Fragmented' : 'Bridge Active'}
                        </span>
                    </div>
                    <div className="p-6 bg-black/40 rounded-xl font-mono text-xs text-white/60 overflow-auto max-h-60">
                        {JSON.stringify(status, null, 2)}
                    </div>
                    <button 
                        onClick={checkSync}
                        className="w-full bg-white text-black py-4 font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all"
                    >
                        Re-Scan Connection
                    </button>
                </div>

                {/* Instructions */}
                <div className="apex-glass p-10 rounded-3xl space-y-8">
                    <h2 className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-accent">II. How to add more clothing</h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <span className="text-accent font-black">01</span>
                            <p className="text-sm text-white/60 leading-relaxed">Go to <strong className="text-white">Shopify Admin</strong> &gt; Products &gt; Add Product.</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-accent font-black">02</span>
                            <p className="text-sm text-white/60 leading-relaxed">Ensure the product <strong className="text-white">Status is Active</strong> (not Draft).</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-accent font-black">03</span>
                            <p className="text-sm text-white/60 leading-relaxed">Under "Publishing", click <strong className="text-white">Manage</strong> and check the <strong className="text-white">"Headless"</strong> channel.</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-accent font-black">04</span>
                            <p className="text-sm text-white/60 leading-relaxed">Add a "Product Category" like <strong className="text-white">Clothing</strong> so it shows up in your catalog filters.</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="mt-20 flex justify-between items-center opacity-20">
                <Link href="/" className="text-[0.6rem] font-black uppercase tracking-widest border-b border-white hover:text-accent transition-colors">Return to Storefront</Link>
                <span className="text-[0.5rem] font-black uppercase tracking-[1em]">Aura Apex Diagnostic v1.0</span>
            </footer>
        </main>
    );
}
