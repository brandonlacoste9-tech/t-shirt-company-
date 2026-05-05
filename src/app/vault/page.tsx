'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const brandingOptions = [
    { id: 'none', title: 'None', price: 0, image: null },
    { id: 'woven', title: 'Woven Hem Label', price: 5, image: '/assets/label-detail.png' },
    { id: 'embroidery', title: 'Gold Embroidery', price: 15, image: '/assets/gold-embroidery.png' },
    { id: 'neckprint', title: 'Silver Neck Print', price: 4, image: '/assets/neck-print.png' },
    { id: 'black-label', title: 'Black-Label Elite', price: 55, image: '/assets/black-label-gold.png' }
];

export default function DesignerVault() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [activeBranding, setActiveBranding] = useState(brandingOptions[1]);
    const [zoomDetail, setZoomDetail] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        
        fetch('/api/products').then(res => res.json()).then(data => {
            setProducts(data);
            if (data.length > 0) setSelectedProduct(data[0]);
        });

        return () => window.removeEventListener('mousemove', handleMouseMove);
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
        window.location.href = '/?cart=open';
    };

    if (!selectedProduct) return <div className="min-h-screen bg-[#050508] flex items-center justify-center font-black text-xs uppercase tracking-[0.5em] text-white/10">Syncing Vault Node...</div>;

    const totalPrice = selectedProduct.price + activeBranding.price;

    return (
        <main className="min-h-screen bg-[#050508] text-white selection:bg-secondary/30 overflow-hidden">
            {/* Custom Aura Glow */}
            <div className="aura-glow" style={{ left: mousePos.x, top: mousePos.y }} />

            {/* Minimal Header */}
            <header className="h-24 flex justify-between items-center px-16 sticky top-0 z-[100] bg-black/40 backdrop-blur-3xl border-b border-white/5">
                <Link href="/" className="text-2xl font-black tracking-tighter hover:opacity-70 transition-opacity">AURA<span className="text-secondary">THREADS</span></Link>
                <nav className="flex gap-12 text-[0.65rem] font-black uppercase tracking-[0.4em] items-center">
                    <Link href="/" className="opacity-30 hover:opacity-100 transition-opacity">Return</Link>
                    <span className="text-secondary border-b border-secondary pb-1">Vault Engineering</span>
                </nav>
            </header>

            <div className="max-w-[1600px] mx-auto px-16 py-24 animate-reveal">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    
                    {/* Laboratory Preview */}
                    <div className="lg:col-span-7 obsidian-card rounded-[60px] overflow-hidden relative min-h-[750px] flex items-center justify-center group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        
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

                        <div className="absolute bottom-12 left-12 flex items-center gap-6">
                            <button 
                                onClick={() => setZoomDetail(!zoomDetail)}
                                className="bg-white/5 backdrop-blur-2xl border border-white/10 px-10 py-4 rounded-full text-[0.6rem] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
                            >
                                {zoomDetail ? 'Collapse Blueprint' : 'Inspect Craftsmanship'}
                            </button>
                            <div className="text-[0.5rem] uppercase tracking-[0.4em] font-black text-white/20 italic">Optical Sovereignty Mode</div>
                        </div>
                    </div>

                    {/* Engineering Controls */}
                    <div className="lg:col-span-5 space-y-16 py-10">
                        <header>
                            <h1 className="text-7xl font-black text-imperial mb-6 tracking-tighter leading-none">THE VAULT</h1>
                            <p className="text-white/40 text-sm leading-relaxed max-w-sm font-medium tracking-wide">Secure the node. All garments are sequenced using premium textiles and fulfilled via Apliiq manufacturing pipelines.</p>
                        </header>

                        {/* Garment Selection */}
                        <div className="space-y-8">
                            <h2 className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-white/20 italic">I. Select Base Garment</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {products.slice(0, 4).map(item => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setSelectedProduct(item)}
                                        className={`w-full p-8 text-left obsidian-card transition-all ${selectedProduct.id === item.id ? 'border-secondary bg-white/5' : 'border-white/5 hover:border-white/20'}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="font-black text-sm tracking-tight">{item.name}</div>
                                            <div className="text-[0.7rem] font-black text-secondary">${item.price}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Branding Config */}
                        <div className="space-y-8">
                            <h2 className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-white/20 italic">II. Branding Sequences</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {brandingOptions.map(opt => (
                                    <button 
                                        key={opt.id}
                                        onClick={() => { setActiveBranding(opt); setZoomDetail(opt.id !== 'none'); }}
                                        className={`
                                            p-8 obsidian-card text-center transition-all relative overflow-hidden
                                            ${activeBranding.id === opt.id ? 'border-secondary bg-secondary/10' : 'border-white/5 hover:border-white/20'}
                                        `}
                                    >
                                        <div className="text-[0.7rem] font-black mb-1 group-hover:text-secondary transition-colors">{opt.title}</div>
                                        <div className="text-[0.5rem] text-white/40 tracking-widest">+{opt.price > 0 ? `$${opt.price}` : 'Incl.'}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="pt-16 border-t border-white/5 space-y-10">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h4 className="text-[0.5rem] uppercase tracking-[0.5em] text-white/20 mb-2">Configuration Total</h4>
                                    <p className="text-6xl font-black tracking-tighter text-secondary">${totalPrice.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[0.5rem] uppercase tracking-[0.5em] text-white/20 mb-2">Laboratory SKU</p>
                                    <p className="font-mono text-[0.6rem] text-white/40">{selectedProduct.productCode}-AURA-{activeBranding.id.toUpperCase()}</p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={addToCart}
                                className="w-full btn-sovereign text-sm py-8"
                            >
                                Initiate Manufacturing Run
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="py-20 text-center opacity-10 text-[0.6rem] uppercase tracking-[0.8em] font-black italic">
                Aura Threads Canada / Laboratory Node 2.5
            </footer>
        </main>
    );
}
