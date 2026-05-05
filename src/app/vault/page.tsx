'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const brandingOptions = [
    { id: 'none', title: 'None', price: 0, image: null },
    { id: 'woven', title: 'Woven Hem Label', price: 5, image: '/assets/label-detail.png' },
    { id: 'embroidery', title: 'Embroidery', price: 15, image: '/assets/gold-embroidery.png' },
    { id: 'neckprint', title: 'Neck Print', price: 4, image: '/assets/neck-print.png' }
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
        window.location.href = '/?cart=open';
    };

    if (!selectedProduct) return <div className="min-h-screen bg-white flex items-center justify-center font-black text-xs uppercase tracking-[0.5em] text-gray-200">Synchronizing Laboratory...</div>;

    const totalPrice = selectedProduct.price + activeBranding.price;

    return (
        <main className="min-h-screen bg-white text-black font-sans">
            {/* Header */}
            <header className="h-[90px] border-b border-gray-100 flex justify-between items-center px-12 sticky top-0 bg-white/80 backdrop-blur-xl z-[100]">
                <Link href="/" className="text-2xl font-black tracking-tighter hover:opacity-50 transition-opacity">AURA</Link>
                <nav className="flex gap-10 text-[0.7rem] font-black uppercase tracking-widest">
                    <Link href="/" className="opacity-40 hover:opacity-100 transition-opacity">Return</Link>
                    <span className="text-black border-b-2 border-black pb-1">Designer Vault</span>
                </nav>
            </header>

            <div className="container-wide py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    {/* Clinical Preview */}
                    <div className="lg:col-span-7 bg-gray-50 border border-gray-100 rounded-sm overflow-hidden relative min-h-[700px] flex items-center justify-center group animate-in">
                        <div className={`relative transition-all duration-1000 ease-in-out ${zoomDetail ? 'scale-[2.5] translate-y-[-10%]' : 'scale-100'}`}>
                            <Image 
                                src={(zoomDetail && activeBranding.image) ? activeBranding.image : selectedProduct.image} 
                                alt="Garment Preview" 
                                width={650} 
                                height={650} 
                                className="object-contain mix-blend-multiply"
                                priority
                            />
                        </div>
                        <button 
                            onClick={() => setZoomDetail(!zoomDetail)}
                            className="absolute bottom-10 left-10 text-[0.65rem] font-black uppercase tracking-[0.3em] border-b-2 border-black pb-1 hover:text-red-600 hover:border-red-600 transition-colors"
                        >
                            {zoomDetail ? 'Collapse Detail' : 'Inspect Quality'}
                        </button>
                    </div>

                    {/* Engineering Controls */}
                    <div className="lg:col-span-5 space-y-16 py-10 animate-in">
                        <div>
                            <h1 className="text-6xl font-black mb-8 tracking-tighter uppercase leading-none">DESIGNER<br/>LABORATORY</h1>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">Configure your high-fidelity garment. All branding sequences are fulfilled via the Apliiq manufacturing node.</p>
                        </div>

                        {/* Garment Selection */}
                        <div className="space-y-6">
                            <h2 className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-gray-200">I. Select Base</h2>
                            <div className="grid grid-cols-1 gap-3">
                                {products.slice(0, 4).map(item => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setSelectedProduct(item)}
                                        className={`w-full p-6 text-left border rounded-sm transition-all ${selectedProduct.id === item.id ? 'border-black bg-white ring-1 ring-black' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="font-black text-sm">{item.name}</div>
                                            <div className="text-[0.75rem] font-black text-red-600">${item.price}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Branding Config */}
                        <div className="space-y-6">
                            <h2 className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-gray-200">II. Select Sequence</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {brandingOptions.map(opt => (
                                    <button 
                                        key={opt.id}
                                        onClick={() => { setActiveBranding(opt); setZoomDetail(opt.id !== 'none'); }}
                                        className={`
                                            p-6 border rounded-sm text-center transition-all
                                            ${activeBranding.id === opt.id ? 'border-black bg-black text-white' : 'border-gray-100 bg-white hover:border-gray-300'}
                                        `}
                                    >
                                        <div className="text-[0.75rem] font-black mb-1">{opt.title}</div>
                                        <div className="text-[0.6rem] font-bold opacity-60">+{opt.price > 0 ? `$${opt.price}` : 'Incl.'}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="pt-16 border-t border-gray-100 space-y-10">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h4 className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-gray-200 mb-2">Total Sovereignty</h4>
                                    <p className="text-5xl font-black tracking-tighter">${totalPrice.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-gray-200 mb-2">SKU ID</p>
                                    <p className="font-mono text-[0.65rem] text-gray-300">{selectedProduct.productCode}-AURA-{activeBranding.id.toUpperCase()}</p>
                                </div>
                            </div>
                            <button 
                                onClick={addToCart}
                                className="btn-main w-full py-6 text-sm"
                            >
                                Initiate Manufacturing
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="py-20 text-center text-[0.6rem] text-gray-200 font-black uppercase tracking-[0.8em] border-t border-gray-50 mt-40">
                AURA THREADS CANADA &copy; 2026 / LAB NODE 2.5
            </footer>
        </main>
    );
}
