'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ShoppingBag, Search, Maximize2, Minimize2 } from 'lucide-react';

const brandingOptions = [
    { id: 'none', title: 'None', price: 0, image: null },
    { id: 'woven', title: 'Woven Hem Label', price: 5.00, image: '/assets/label-detail.png' },
    { id: 'embroidery', title: 'Gold Embroidery', price: 15.00, image: '/assets/gold-embroidery.png' },
    { id: 'neckprint', title: 'Silver Neck Print', price: 4.00, image: '/assets/neck-print.png' }
];

export default function DesignerVault() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [activeBranding, setActiveBranding] = useState(brandingOptions[0]);
    const [zoomDetail, setZoomDetail] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                if (data.length > 0) setSelectedProduct(data[0]);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const addToCart = () => {
        if (!selectedProduct) return;
        const price = parseFloat(selectedProduct.priceRange.minVariantPrice.amount);
        const cartItem = {
            ...selectedProduct,
            cartItemId: `${selectedProduct.id}-${activeBranding.id}`,
            name: selectedProduct.title,
            image: selectedProduct.images.edges[0]?.node.url,
            size: 'L', 
            branding: activeBranding.id,
            quantity: 1,
            price: price + activeBranding.price
        };
        const existingCart = JSON.parse(localStorage.getItem('aura-cart') || '[]');
        localStorage.setItem('aura-cart', JSON.stringify([...existingCart, cartItem]));
        window.dispatchEvent(new Event('storage'));
        window.location.href = '/?cart=open';
    };

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-300 animate-pulse">Syncing Laboratory Node...</p>
        </div>
    );

    if (!selectedProduct) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-900">Laboratory Offline</p>
        </div>
    );

    const basePrice = parseFloat(selectedProduct.priceRange.minVariantPrice.amount);
    const totalPrice = basePrice + activeBranding.price;
    const mainImageUrl = selectedProduct.images.edges[0]?.node.url || '/placeholder.png';

    return (
        <main className="min-h-screen bg-white text-stone-900 selection:bg-stone-200">
            <Header />

            <div className="max-w-[1600px] mx-auto px-4 sm:px-12 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    
                    {/* Laboratory Preview */}
                    <div className="lg:col-span-7 bg-stone-50 overflow-hidden relative min-h-[600px] md:min-h-[800px] flex items-center justify-center group luxury-shadow reveal">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),transparent_70%)]"></div>
                        
                        <div className={`relative transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${zoomDetail ? 'scale-[2.5] translate-y-[-10%]' : 'scale-100'}`}>
                            <Image 
                                src={(zoomDetail && activeBranding.image) ? activeBranding.image : mainImageUrl} 
                                alt="Garment Engineering" 
                                width={800} 
                                height={800} 
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>

                        <button 
                            onClick={() => setZoomDetail(!zoomDetail)}
                            className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-stone-100 px-8 py-4 rounded-full text-[0.6rem] font-black uppercase tracking-[0.3em] text-stone-900 hover:bg-stone-900 hover:text-white transition-luxury flex items-center gap-3 shadow-sm"
                        >
                            {zoomDetail ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                            {zoomDetail ? 'Collapse View' : 'Inspect Craftsmanship'}
                        </button>
                    </div>

                    {/* Engineering Controls */}
                    <div className="lg:col-span-5 space-y-12 py-4 reveal" style={{ animationDelay: '0.2s' }}>
                        <header>
                            <p className="text-[0.65rem] font-black text-stone-400 uppercase tracking-[0.4em] mb-4">Laboratory Sequence</p>
                            <h1 className="text-5xl md:text-6xl font-black text-stone-900 mb-6 tracking-tighter leading-none uppercase">The Vault</h1>
                            <p className="text-stone-500 text-sm leading-relaxed max-w-sm font-medium tracking-tight uppercase">
                                Custom engineering sequence. All garments are constructed using premium textiles and fulfilled via our global manufacturing pipeline.
                            </p>
                        </header>

                        {/* Garment Selection */}
                        <div className="space-y-6">
                            <h2 className="text-[0.65rem] font-black uppercase tracking-[0.5em] text-stone-900">I. Select Blueprint</h2>
                            <div className="grid grid-cols-1 gap-3">
                                {products.slice(0, 5).map(item => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setSelectedProduct(item)}
                                        className={`w-full p-6 text-left border transition-luxury ${selectedProduct.id === item.id ? 'border-stone-900 bg-stone-50' : 'border-stone-100 hover:border-stone-300'}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="font-black text-[0.7rem] uppercase tracking-wider text-stone-900">{item.title}</div>
                                            <div className="text-[0.65rem] font-black text-stone-400">${parseFloat(item.priceRange.minVariantPrice.amount).toFixed(2)}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Branding Config */}
                        <div className="space-y-6">
                            <h2 className="text-[0.65rem] font-black uppercase tracking-[0.5em] text-stone-900">II. Select Sequence</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {brandingOptions.map(opt => (
                                    <button 
                                        key={opt.id}
                                        onClick={() => { setActiveBranding(opt); setZoomDetail(opt.id !== 'none'); }}
                                        className={`
                                            p-6 border text-center transition-luxury
                                            ${activeBranding.id === opt.id ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-100 hover:border-stone-300 text-stone-500'}
                                        `}
                                    >
                                        <div className="text-[0.65rem] font-black uppercase tracking-widest mb-1">{opt.title}</div>
                                        <div className={`text-[0.55rem] font-black tracking-widest ${activeBranding.id === opt.id ? 'text-stone-400' : 'text-stone-300'}`}>
                                            {opt.price > 0 ? `+$${opt.price.toFixed(2)}` : 'INCLUDED'}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="pt-12 border-t border-stone-100 space-y-8">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[0.6rem] uppercase tracking-[0.5em] text-stone-400 mb-2 font-black">Total Engineering</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-5xl font-black tracking-tighter text-stone-900">${totalPrice.toFixed(2)}</span>
                                        <span className="text-[0.6rem] font-black uppercase tracking-widest text-stone-400">AUD</span>
                                    </div>
                                </div>
                                <div className="text-right hidden md:block">
                                    <p className="text-[0.55rem] uppercase tracking-[0.4em] text-stone-300 mb-2 font-black">Sequence ID</p>
                                    <p className="font-black text-[0.6rem] text-stone-400 uppercase tracking-widest">
                                        {selectedProduct.handle.substring(0,4).toUpperCase()}-{activeBranding.id.toUpperCase()}
                                    </p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={addToCart}
                                className="w-full bg-stone-900 text-white py-6 text-[0.75rem] font-black uppercase tracking-[0.3em] hover:bg-stone-800 transition-luxury luxury-shadow flex items-center justify-center gap-3"
                            >
                                <ShoppingBag size={20} />
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

