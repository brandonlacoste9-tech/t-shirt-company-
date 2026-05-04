'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';

const brandingOptions = [
    { id: 'none', title: 'None', price: 0, image: null },
    { id: 'woven', title: 'Woven Hem Label', price: 5, image: '/assets/label-detail.png' },
    { id: 'embroidery', title: 'Gold Embroidery', price: 15, image: '/assets/gold-embroidery.png' },
    { id: 'neckprint', title: 'Silver Neck Print', price: 4, image: '/assets/neck-print.png' }
];

export default function DesignerVault() {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const [activeBranding, setActiveBranding] = useState(brandingOptions[1]);
    const [zoomDetail, setZoomDetail] = useState(false);

    const totalPrice = selectedProduct.price + activeBranding.price;

    return (
        <main className="min-h-screen bg-[#050507] text-white p-10 font-['Outfit']">
            <nav className="mb-20 flex justify-between items-center max-w-7xl mx-auto">
                <Link href="/" className="logo text-2xl font-extrabold">AURA<span>THREADS</span></Link>
                <div className="flex gap-8 items-center text-sm font-bold uppercase tracking-widest">
                    <Link href="/" className="opacity-50 hover:opacity-100 transition-opacity">Store</Link>
                    <span className="text-primary">Vault</span>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <h1 className="text-6xl font-extrabold mb-4">Designer <span className="gradient-text">Vault</span></h1>
                    <p className="text-white/40 max-w-xl text-lg">Engineer your garment. Preview the "Imperial" branding services of the Apliiq manufacturing floor in real-time.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Laboratory Preview */}
                    <div className="lg:col-span-8 bg-white/5 rounded-[40px] border border-white/10 overflow-hidden relative min-h-[600px] flex items-center justify-center group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,43,226,0.1),transparent_70%)]"></div>
                        
                        <div className={`relative transition-all duration-700 ${zoomDetail ? 'scale-[2.5] translate-y-[-20%]' : 'scale-100'}`}>
                            {zoomDetail && activeBranding.image ? (
                                <Image 
                                    src={activeBranding.image} 
                                    alt="Detail View" 
                                    width={600} 
                                    height={600} 
                                    className="object-contain drop-shadow-2xl animate-in fade-in zoom-in-95 duration-500"
                                />
                            ) : (
                                <Image 
                                    src={selectedProduct.image} 
                                    alt="Product Preview" 
                                    width={600} 
                                    height={600} 
                                    className="object-contain drop-shadow-2xl"
                                />
                            )}
                        </div>

                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
                            <button 
                                onClick={() => setZoomDetail(!zoomDetail)}
                                className="bg-black/60 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all"
                            >
                                {zoomDetail ? 'View Full Garment' : 'Zoom Craftsmanship Detail'}
                            </button>
                        </div>
                    </div>

                    {/* Laboratory Controls */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="space-y-6">
                            <h3 className="text-xs uppercase tracking-widest font-bold text-white/40">1. Select Apparel Blank</h3>
                            <div className="space-y-3">
                                {products.map(p => (
                                    <button 
                                        key={p.id}
                                        onClick={() => setSelectedProduct(p)}
                                        className={`w-full text-left p-4 rounded-2xl border transition-all ${selectedProduct.id === p.id ? 'bg-primary/10 border-primary text-white' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}
                                    >
                                        <div className="font-bold">{p.name}</div>
                                        <div className="text-[0.7rem] opacity-50">{p.brand} {p.productCode}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs uppercase tracking-widest font-bold text-white/40">2. Branding Service</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {brandingOptions.map(opt => (
                                    <button 
                                        key={opt.id}
                                        onClick={() => { setActiveBranding(opt); setZoomDetail(opt.id !== 'none'); }}
                                        className={`p-4 rounded-2xl border text-center transition-all ${activeBranding.id === opt.id ? 'bg-secondary/10 border-secondary text-white' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}
                                    >
                                        <div className="text-sm font-bold">{opt.title}</div>
                                        <div className="text-[0.6rem] opacity-50">+{opt.price > 0 ? `$${opt.price}` : 'Incl.'}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-10 border-t border-white/10">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h4 className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-1">Configuration Total</h4>
                                    <p className="text-4xl font-extrabold text-secondary">${totalPrice.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-1">Apliiq SKU</p>
                                    <p className="font-mono text-xs">{selectedProduct.productCode}-AURA-{activeBranding.id.toUpperCase()}</p>
                                </div>
                            </div>
                            <button className="w-full bg-primary py-5 rounded-3xl font-bold text-lg hover:brightness-110 shadow-lg shadow-primary/20 transition-all">
                                Add Custom to Bag
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="mt-40 text-center py-10 border-t border-white/5 opacity-30 text-xs">
                &copy; 2026 Aura Threads Designer Vault. Powered by Apliiq Manufacturing.
            </footer>

            <style jsx>{`
                .logo { font-size: 1.5rem; font-weight: 800; color: white; text-decoration: none; }
                .logo span { color: #8a2be2; }
                .gradient-text { background: linear-gradient(135deg, #8a2be2, #00f2ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
            `}</style>
        </main>
    );
}
