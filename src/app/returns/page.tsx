'use client';

import Link from 'next/link';

export default function ReturnsPolicy() {
    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-accent/30">
            <header className="h-[100px] border-b border-white/5 flex items-center px-12 sticky top-0 bg-[#050505]/80 backdrop-blur-2xl z-50">
                <Link href="/" className="text-2xl font-black tracking-tighter uppercase">AURA<span className="text-accent italic">APEX</span></Link>
            </header>

            <div className="max-w-4xl mx-auto px-8 py-32 reveal">
                <header className="mb-20">
                    <h1 className="text-7xl font-black text-apex uppercase tracking-tighter mb-8 leading-none">The Guarantee</h1>
                    <p className="text-white/40 text-lg font-medium tracking-wide">Aura Apex quality sovereignty and exchange protocols.</p>
                </header>

                <div className="space-y-24">
                    <section className="space-y-8">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-accent">I. Sovereignty Guarantee</h2>
                        <p className="text-white/60 leading-relaxed text-lg">
                            We take pride in our engineering. If your garment arrives with a defect in craftsmanship or material, we will provide a direct replacement at no cost to your node. All reports must be filed within 14 days of successful delivery.
                        </p>
                    </section>

                    <section className="space-y-8">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-accent">II. Exchange Protocol</h2>
                        <p className="text-white/60 leading-relaxed text-lg">
                            Because each garment is sequenced on-demand, we cannot accept returns for change of mind. However, we offer an Exchange Protocol for sizing adjustments. Patrons are responsible for return transit costs to our secondary laboratory.
                        </p>
                    </section>

                    <section className="space-y-8">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-accent">III. Initiate Resolution</h2>
                        <p className="text-white/60 leading-relaxed text-lg">
                            To report a defect or initiate an exchange, transmit your Order ID and photographic evidence to <strong className="text-white">support@aurathreads.ca</strong>. Our nodes will process your resolution within 48 hours.
                        </p>
                    </section>
                </div>

                <div className="mt-32 pt-16 border-t border-white/5 flex justify-between items-center">
                    <Link href="/" className="btn-apex py-4 px-10 text-xs">Return to Storefront</Link>
                    <span className="text-[0.5rem] font-black uppercase tracking-[1em] text-white/10">Aura Apex Governance v2.6</span>
                </div>
            </div>
        </main>
    );
}
