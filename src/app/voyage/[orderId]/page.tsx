'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const steps = [
    { id: 'origin', title: 'Origin', desc: 'Design Authenticated & Sequenced', status: 'completed' },
    { id: 'manufacturing', title: 'Production', desc: 'Active on Apliiq Floor', status: 'current' },
    { id: 'branding', title: 'Branding', desc: 'Custom Woven Label Application', status: 'pending' },
    { id: 'quality', title: 'Quality Control', desc: 'Final Technical Inspection', status: 'pending' },
    { id: 'voyage', title: 'On Voyage', desc: 'Dispatched to Destination', status: 'pending' }
];

export default function VoyageTracker() {
    const params = useParams();
    const orderId = params.orderId as string;
    const [activeStep, setActiveStep] = useState(0);
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

    return (
        <main className="min-h-screen bg-[#050507] text-white p-10 font-['Outfit'] overflow-hidden relative">
            {/* Background Map Graphic (Stylized) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] border border-primary/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] border border-secondary/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] border border-white/5 rounded-full"></div>
            </div>

            <nav className="relative z-10 mb-20 flex justify-between items-center max-w-7xl mx-auto">
                <Link href="/" className="logo text-2xl font-extrabold">AURA<span>THREADS</span></Link>
                <div className="text-right">
                    <p className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-1">Voyage Reference</p>
                    <p className="font-mono text-sm">{orderId}</p>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto relative z-10">
                <header className="text-center mb-24">
                    <h1 className="text-5xl font-extrabold mb-4">Track Your <span className="gradient-text">Voyage</span></h1>
                    <p className="text-white/60">Your garment is currently being crafted by our masters at Apliiq.</p>
                </header>

                <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2 hidden lg:block"></div>
                    <div 
                        className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary -translate-y-1/2 transition-all duration-1000 hidden lg:block"
                        style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                    ></div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex flex-col items-center text-center group">
                                <div className={`
                                    w-16 h-16 rounded-full flex items-center justify-center mb-6 z-10 transition-all duration-500 border-2
                                    ${index < activeStep ? 'bg-primary border-primary shadow-[0_0_20px_rgba(138,43,226,0.5)]' : 
                                      index === activeStep ? 'bg-bg-dark border-secondary animate-pulse' : 
                                      'bg-bg-dark border-white/10'}
                                `}>
                                    {index < activeStep ? (
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                                    ) : (
                                        <span className="text-sm font-bold">{index + 1}</span>
                                    )}
                                </div>
                                <h3 className={`font-bold mb-2 transition-colors ${index <= activeStep ? 'text-white' : 'text-white/20'}`}>{step.title}</h3>
                                <p className={`text-[0.7rem] leading-relaxed transition-colors ${index <= activeStep ? 'text-white/40' : 'text-white/10'}`}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
                        <h4 className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-4">Location</h4>
                        <p className="font-bold">{orderData?.details?.location || 'Apliiq Factory Floor'}</p>
                        <p className="text-sm text-white/60">{orderData?.details?.city || 'Los Angeles, CA'}</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
                        <h4 className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-4">Service Level</h4>
                        <p className="font-bold">{orderData?.details?.serviceLevel || 'Priority Production'}</p>
                        <p className="text-sm text-white/60">{orderData?.details?.branding ? `${orderData.details.branding} Active` : 'Bespoke Branding Active'}</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
                        <h4 className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-4">Estimated Arrival</h4>
                        <p className="font-bold">{orderData?.details?.arrival || 'May 14 - May 16'}</p>
                        <p className="text-sm text-white/60">International Express</p>
                    </div>
                </div>
            </div>

            <footer className="mt-40 text-center py-10 border-t border-white/5 opacity-30 text-xs">
                &copy; 2026 Aura Threads. Defined by Quality. Fulfilled by Apliiq.
            </footer>

            <style jsx>{`
                .logo { font-size: 1.5rem; font-weight: 800; color: white; text-decoration: none; }
                .logo span { color: #8a2be2; }
                .gradient-text { background: linear-gradient(135deg, #8a2be2, #00f2ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                .bg-bg-dark { background-color: #050507; }
            `}</style>
        </main>
    );
}
