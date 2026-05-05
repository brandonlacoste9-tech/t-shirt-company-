'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Truck, Box, MapPin, ShieldCheck } from 'lucide-react';

export default function ShippingLogistics() {
    return (
        <main className="min-h-screen bg-white text-stone-900 selection:bg-stone-200">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-32">
                <header className="mb-24 text-center reveal">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.5em] text-stone-400 mb-6">Logistics Sequence</p>
                    <h1 className="text-5xl md:text-6xl font-black text-stone-900 uppercase tracking-tighter mb-8 leading-none">Shipping & Delivery</h1>
                    <p className="text-stone-500 text-lg font-medium tracking-wide max-w-2xl mx-auto uppercase">High-fidelity delivery sequences curated for the modern individual.</p>
                </header>

                <div className="space-y-32">
                    <section className="reveal" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-4 mb-8">
                            <Box className="text-stone-900" size={24} />
                            <h2 className="text-[0.7rem] font-black uppercase tracking-[0.4em] text-stone-900">I. Manufacturing Sequence</h2>
                        </div>
                        <p className="text-stone-500 leading-relaxed text-base uppercase tracking-tight font-medium">
                            Every Aura Threads garment is engineered upon order. Once your transaction is verified, your blueprint is transmitted to our manufacturing partners. Production typically takes 3-7 business days to ensure premium quality control.
                        </p>
                    </section>

                    <section className="reveal" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center gap-4 mb-8">
                            <Truck className="text-stone-900" size={24} />
                            <h2 className="text-[0.7rem] font-black uppercase tracking-[0.4em] text-stone-900">II. Transit Timelines</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-stone-50 p-10 luxury-shadow">
                                <h3 className="text-[0.65rem] font-black uppercase tracking-widest text-stone-900 mb-4">North America</h3>
                                <p className="text-stone-500 text-sm uppercase font-black tracking-widest">3 - 5 Business Days via Express Transit</p>
                            </div>
                            <div className="bg-stone-50 p-10 luxury-shadow">
                                <h3 className="text-[0.65rem] font-black uppercase tracking-widest text-stone-900 mb-4">International</h3>
                                <p className="text-stone-500 text-sm uppercase font-black tracking-widest">7 - 14 Business Days via Global Node</p>
                            </div>
                        </div>
                    </section>

                    <section className="reveal" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center gap-4 mb-8">
                            <MapPin className="text-stone-900" size={24} />
                            <h2 className="text-[0.7rem] font-black uppercase tracking-[0.4em] text-stone-900">III. Tracking Intelligence</h2>
                        </div>
                        <p className="text-stone-500 leading-relaxed text-base uppercase tracking-tight font-medium">
                            Upon dispatch, you will receive a unique tracking identifier. This allows you to monitor the high-fidelity transit of your garment from our laboratory to your specific destination in real-time.
                        </p>
                    </section>

                    <section className="reveal" style={{ animationDelay: '0.4s' }}>
                        <div className="flex items-center gap-4 mb-8">
                            <ShieldCheck className="text-stone-900" size={24} />
                            <h2 className="text-[0.7rem] font-black uppercase tracking-[0.4em] text-stone-900">IV. Secure Fulfillment</h2>
                        </div>
                        <p className="text-stone-500 leading-relaxed text-base uppercase tracking-tight font-medium">
                            All shipments are fully insured and tracked. In the event of a logistical anomaly, our engineering support team is available to ensure the sovereignty of your delivery sequence.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}

