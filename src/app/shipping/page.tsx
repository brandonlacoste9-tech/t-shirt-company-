'use client';

import Link from 'next/link';

export default function ShippingLogistics() {
    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-accent/30">
            <header className="h-[100px] border-b border-white/5 flex items-center px-12 sticky top-0 bg-[#050505]/80 backdrop-blur-2xl z-50">
                <Link href="/" className="text-2xl font-black tracking-tighter uppercase">AURA<span className="text-accent italic">APEX</span></Link>
            </header>

            <div className="max-w-4xl mx-auto px-8 py-32 reveal">
                <header className="mb-20">
                    <h1 className="text-7xl font-black text-apex uppercase tracking-tighter mb-8 leading-none">Global Logistics</h1>
                    <p className="text-white/40 text-lg font-medium tracking-wide">High-fidelity delivery sequences for the sovereign individual.</p>
                </header>

                <div className="space-y-24">
                    <section className="space-y-8">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-accent">I. Manufacturing Sequence</h2>
                        <p className="text-white/60 leading-relaxed text-lg">
                            Every Aura Apex garment is engineered upon order. Once your transaction is verified by the node, your blueprint is transmitted to our primary manufacturing sequence via Apliiq logistics. Production typically takes 3-7 business days.
                        </p>
                    </section>

                    <section className="space-y-8">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-accent">II. Global Transit</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="apex-glass p-8 rounded-2xl border border-white/5">
                                <h3 className="text-sm font-black uppercase tracking-widest mb-4">North America</h3>
                                <p className="text-white/40 text-sm">3 - 5 Business Days via Express Transit</p>
                            </div>
                            <div className="apex-glass p-8 rounded-2xl border border-white/5">
                                <h3 className="text-sm font-black uppercase tracking-widest mb-4">International</h3>
                                <p className="text-white/40 text-sm">7 - 14 Business Days via Global Node</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-accent">III. Tracking Intelligence</h2>
                        <p className="text-white/60 leading-relaxed text-lg">
                            Upon dispatch, you will receive a unique <Link href="/voyage" className="text-white underline underline-offset-4">Voyage Tracker</Link> ID. This allows you to monitor the high-fidelity transit of your garment from our laboratory to your specific node.
                        </p>
                    </section>
                </div>

                <div className="mt-32 pt-16 border-t border-white/5 flex justify-between items-center">
                    <Link href="/" className="btn-apex py-4 px-10 text-xs">Return to Storefront</Link>
                    <span className="text-[0.5rem] font-black uppercase tracking-[1em] text-white/10">Aura Apex Logistics v2.6</span>
                </div>
            </div>
        </main>
    );
}
