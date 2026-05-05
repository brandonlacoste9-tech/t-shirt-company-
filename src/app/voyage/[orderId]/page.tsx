'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Check, Package, Truck, Info, MapPin, Calendar, Clock } from 'lucide-react';

const steps = [
    { id: 'origin', title: 'Origin', desc: 'Design Authenticated', status: 'completed' },
    { id: 'manufacturing', title: 'Production', desc: 'Active Sequence', status: 'current' },
    { id: 'branding', title: 'Branding', desc: 'Custom Labeling', status: 'pending' },
    { id: 'quality', title: 'Quality', desc: 'Final Inspection', status: 'pending' },
    { id: 'voyage', title: 'On Voyage', desc: 'Dispatched', status: 'pending' }
];

export default function VoyageTracker() {
    const params = useParams();
    const orderId = params.orderId as string;
    const [activeStep, setActiveStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        if (!orderId) return;

        fetch(`/api/order/${orderId}`)
            .then(res => res.json())
            .then(data => {
                if (data.activeStep !== undefined) {
                    setActiveStep(data.activeStep);
                    setOrderData(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Tracking fetch error:', err);
                setLoading(false);
            });
    }, [orderId]);

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-300 animate-pulse">Establishing Connection...</p>
        </div>
    );

    return (
        <main className="min-h-screen bg-white text-stone-900 selection:bg-stone-200">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <header className="mb-24 text-center reveal">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.5em] text-stone-400 mb-6">Voyage Status</p>
                    <h1 className="text-5xl md:text-6xl font-black text-stone-900 uppercase tracking-tighter mb-4 leading-none">Track Order</h1>
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-stone-300">Reference:</span>
                        <span className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-stone-900">{orderId}</span>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto mb-32">
                    <div className="relative">
                        {/* Progress Line */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-100 -translate-y-1/2 hidden lg:block"></div>
                        <div 
                            className="absolute top-1/2 left-0 h-[1px] bg-stone-900 -translate-y-1/2 transition-all duration-1000 hidden lg:block"
                            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                        ></div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex flex-col items-center text-center group reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className={`
                                        w-12 h-12 rounded-full flex items-center justify-center mb-6 z-10 transition-all duration-500 border
                                        ${index < activeStep ? 'bg-stone-900 border-stone-900 text-white' : 
                                          index === activeStep ? 'bg-white border-stone-900 text-stone-900 animate-pulse' : 
                                          'bg-white border-stone-100 text-stone-200'}
                                    `}>
                                        {index < activeStep ? (
                                            <Check size={18} strokeWidth={3} />
                                        ) : (
                                            <span className="text-[0.7rem] font-black">{index + 1}</span>
                                        )}
                                    </div>
                                    <h3 className={`text-[0.65rem] font-black uppercase tracking-[0.2em] mb-2 transition-colors ${index <= activeStep ? 'text-stone-900' : 'text-stone-200'}`}>{step.title}</h3>
                                    <p className={`text-[0.55rem] font-black uppercase tracking-[0.15em] transition-colors ${index <= activeStep ? 'text-stone-400' : 'text-stone-100'}`}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal" style={{ animationDelay: '0.6s' }}>
                    <div className="bg-stone-50 p-10 luxury-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <MapPin size={16} className="text-stone-400" />
                            <h4 className="text-[0.6rem] uppercase tracking-[0.4em] text-stone-400 font-black">Location</h4>
                        </div>
                        <p className="font-black text-sm uppercase tracking-wider text-stone-900">{orderData?.details?.location || 'Processing Node'}</p>
                        <p className="text-[0.6rem] font-black uppercase tracking-widest text-stone-400 mt-2">{orderData?.details?.city || 'Sequence Verified'}</p>
                    </div>
                    <div className="bg-stone-50 p-10 luxury-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <Package size={16} className="text-stone-400" />
                            <h4 className="text-[0.6rem] uppercase tracking-[0.4em] text-stone-400 font-black">Service Level</h4>
                        </div>
                        <p className="font-black text-sm uppercase tracking-wider text-stone-900">{orderData?.details?.serviceLevel || 'Standard Engineering'}</p>
                        <p className="text-[0.6rem] font-black uppercase tracking-widest text-stone-400 mt-2">Global Logistics Active</p>
                    </div>
                    <div className="bg-stone-50 p-10 luxury-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <Calendar size={16} className="text-stone-400" />
                            <h4 className="text-[0.6rem] uppercase tracking-[0.4em] text-stone-400 font-black">Estimated Arrival</h4>
                        </div>
                        <p className="font-black text-sm uppercase tracking-wider text-stone-900">{orderData?.details?.arrival || 'Awaiting Schedule'}</p>
                        <p className="text-[0.6rem] font-black uppercase tracking-widest text-stone-400 mt-2">Transit Pending</p>
                    </div>
                </div>

                <div className="mt-24 pt-12 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-8 reveal" style={{ animationDelay: '0.8s' }}>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-400 hover:text-stone-900 transition-colors">Return Home</Link>
                        <Link href="/collections/all" className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-400 hover:text-stone-900 transition-colors">Shop More</Link>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-stone-50 rounded-full luxury-shadow">
                        <Info size={14} className="text-stone-400" />
                        <span className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-stone-400">Garment engineering sequenced by Apliiq</span>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

