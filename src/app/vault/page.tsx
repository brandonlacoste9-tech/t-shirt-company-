'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const brandingOptions = [
    { id: 'none', title: 'None', price: 0, image: null },
    { id: 'woven', title: 'Woven Hem Label', price: 5, image: '/assets/label-detail.png' },
    { id: 'embroidery', title: 'Gold Embroidery', price: 15, image: '/assets/gold-embroidery.png' },
    { id: 'neckprint', title: 'Silver Neck Print', price: 4, image: '/assets/neck-print.png' }
];

export default function DesignerVault() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [activeBranding, setActiveBranding] = useState(brandingOptions[1]);
    const [zoomDetail, setZoomDetail] = useState(false);

    useEffect(() => {
        fetch('/api/products').then(res => res.json()).then(data => {
            setProducts(data);
            if (data.length > 0) setSelectedProduct(data[0]);
        });
    }, []);

    const addToCart = () => {
        if (!selectedProduct) return;
        const cartItem = {
            ...selectedProduct,
            cartItemId: `${selectedProduct.id}-${activeBranding.id}`,
            size: 'L', 
            branding: activeBranding.id,
            quantity: 1,
            price: selectedProduct.price + activeBranding.price
        };
        const existingCart = JSON.parse(localStorage.getItem('aura-cart') || '[]');
        localStorage.setItem('aura-cart', JSON.stringify([...existingCart, cartItem]));
        window.dispatchEvent(new Event('storage'));
        // Trigger bag open would be better here but for now just redirecting works
    };

    if (!selectedProduct) return <div className="min-h-screen bg-[#050505] flex items-center justify-center font-black text-xs uppercase tracking-[0.5em] text-white/10">Syncing Apex Node...</div>;

    const totalPrice = selectedProduct.price + activeBranding.price;

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-accent/30">
            <div className="bg-accent text-white text-[0.6rem] font-black uppercase tracking-[0.4em] py-3 text-center fixed top-0 w-full z-[2000]">
                Aura Apex Laboratory / Node 2.6 / Secure Connection Established
            </div>

            <Header />

            <div className="max-w-[1600px] mx-auto px-16 py-24 reveal">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    
                    {/* Laboratory Preview */}
                    <div className="lg:col-span-7 apex-glass rounded-[40px] overflow-hidden relative min-h-[750px] flex items-center justify-center group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,43,226,0.1),transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        
                        <div className={`relative transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${zoomDetail ? 'scale-[2.8] translate-y-[-10%]' : 'scale-100'}`}>
                            <Image 
                                src={(zoomDetail && activeBranding.image) ? activeBranding.image : selectedProduct.image} 
                                alt="Garment Engineering" 
                                width={750} 
                                height={750} 
                                className="object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
                                priority
                            />
                        </div>

                        <button 
                            onClick={() => setZoomDetail(!zoomDetail)}
                            className="absolute bottom-12 left-12 bg-white/5 backdrop-blur-2xl border border-white/10 px-10 py-4 rounded-full text-[0.6rem] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
                        >
                            {zoomDetail ? 'Collapse Blueprint' : 'Inspect Craftsmanship'}
                        </button>
                    </div>

                    {/* Engineering Controls */}
                    <div className="lg:col-span-5 space-y-16 py-10">
                        <header>
                            <h1 className="text-7xl font-black text-apex mb-6 tracking-tighter leading-none uppercase">THE VAULT</h1>
                            <p className="text-white/30 text-sm leading-relaxed max-w-sm font-medium tracking-wide">Secure the node. All garments are sequenced using premium textiles and fulfilled via global Apliiq manufacturing pipelines.</p>
                        </header>

                        {/* Garment Selection */}
                        <div className="space-y-8">
                            <h2 className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-white/10 italic">I. Select Base Blueprint</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {products.slice(0, 4).map(item => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setSelectedProduct(item)}
                                        className={`w-full p-8 text-left apex-card transition-all ${selectedProduct.id === item.id ? 'border-accent bg-accent/5' : 'border-white/5 hover:border-white/20'}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="font-black text-sm tracking-tight">{item.name}</div>
                                            <div className="text-[0.7rem] font-black text-accent">${item.price}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Branding Config */}
                        <div className="space-y-8">
                            <h2 className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-white/10 italic">II. Select Sequence</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {brandingOptions.map(opt => (
                                    <button 
                                        key={opt.id}
                                        onClick={() => { setActiveBranding(opt); setZoomDetail(opt.id !== 'none'); }}
                                        className={`
                                            p-8 apex-card text-center transition-all
                                            ${activeBranding.id === opt.id ? 'border-accent bg-accent/20' : 'border-white/5 hover:border-white/20'}
                                        `}
                                    >
                                        <div className="text-[0.7rem] font-black mb-1">{opt.title}</div>
                                        <div className="text-[0.5rem] text-white/40 tracking-widest">+{opt.price > 0 ? `$${opt.price}` : 'Incl.'}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="pt-16 border-t border-white/5 space-y-10">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h4 className="text-[0.5rem] uppercase tracking-[0.5em] text-white/10 mb-2">Total Engineering</h4>
                                    <p className="text-6xl font-black tracking-tighter text-accent">${totalPrice.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[0.5rem] uppercase tracking-[0.5em] text-white/10 mb-2">Node SKU</p>
                                    <p className="font-mono text-[0.6rem] text-white/30">{selectedProduct.productCode}-APEX-{activeBranding.id.toUpperCase()}</p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={addToCart}
                                className="w-full btn-apex py-8"
                            >
                                Initiate Manufacturing Run
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
