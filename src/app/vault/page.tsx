'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const tiers = ['Explorer', 'Navigator', 'Captain', 'Admiral'];

const brandingOptions = [
    { id: 'none', title: 'None', price: 0, image: null, minTier: 'Explorer' },
    { id: 'woven', title: 'Woven Hem Label', price: 5, image: '/assets/label-detail.png', minTier: 'Explorer' },
    { id: 'embroidery', title: 'Gold Embroidery', price: 15, image: '/assets/gold-embroidery.png', minTier: 'Navigator' },
    { id: 'neckprint', title: 'Silver Neck Print', price: 4, image: '/assets/neck-print.png', minTier: 'Explorer' },
    { id: 'black-gold', title: 'Black-Label: Gold-Stitched', price: 45, image: '/assets/black-label-gold.png', minTier: 'Admiral' },
    { id: 'black-leather', title: 'Black-Label: Obsidian Leather', price: 65, image: '/assets/black-label-leather.png', minTier: 'Admiral' }
];

export default function DesignerVault() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [activeBranding, setActiveBranding] = useState(brandingOptions[1]);
    const [zoomDetail, setZoomDetail] = useState(false);
    const [userTier, setUserTier] = useState('Explorer');

    useEffect(() => {
        const token = localStorage.getItem('swarm-token');
        if (token) {
            fetch('/api/auth/swarm/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(data => {
                if (data.customer) {
                    const totalSpent = data.customer.orders.edges.reduce((sum: number, e: any) => sum + parseFloat(e.node.totalPrice.amount), 0);
                    if (totalSpent >= 5000) setUserTier('Admiral');
                    else if (totalSpent >= 1500) setUserTier('Captain');
                    else if (totalSpent >= 500) setUserTier('Navigator');
                }
            });
        }

        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
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

    if (!selectedProduct) return <div className="min-h-screen bg-white flex items-center justify-center font-bold text-sm uppercase tracking-widest text-gray-300">Synchronizing Vault...</div>;

    const totalPrice = selectedProduct.price + activeBranding.price;

    return (
        <main className="min-h-screen bg-white text-black font-['Inter']">
            {/* Minimalist Header */}
            <header className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto h-20 flex justify-between items-center px-8">
                    <Link href="/" className="text-xl font-black bg-black text-white px-3 py-1">AURA</Link>
                    <nav className="flex gap-10 text-[0.7rem] font-bold uppercase tracking-widest">
                        <Link href="/" className="opacity-40 hover:opacity-100">Store</Link>
                        <span className="text-black border-b-2 border-black pb-1">Vault</span>
                        <Link href="/swarm" className="opacity-40 hover:opacity-100">Swarm</Link>
                    </nav>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Clinical Preview (7 Cols) */}
                    <div className="lg:col-span-7 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden relative min-h-[600px] flex items-center justify-center">
                        <div className={`relative transition-all duration-700 ease-in-out ${zoomDetail ? 'scale-[2.5] translate-y-[-10%]' : 'scale-100'}`}>
                            <Image 
                                src={(zoomDetail && activeBranding.image) ? activeBranding.image : selectedProduct.image} 
                                alt="Preview" 
                                width={600} 
                                height={600} 
                                className="object-contain mix-blend-multiply"
                            />
                        </div>
                        <button 
                            onClick={() => setZoomDetail(!zoomDetail)}
                            className="absolute bottom-8 left-8 text-[0.6rem] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1"
                        >
                            {zoomDetail ? 'Collapse View' : 'Inspect Quality'}
                        </button>
                    </div>

                    {/* Engineering Controls (5 Cols) */}
                    <div className="lg:col-span-5 space-y-12">
                        <div>
                            <h1 className="text-4xl font-black mb-4 tracking-tight">DESIGNER LABORATORY</h1>
                            <p className="text-gray-400 text-sm leading-relaxed">Configure your high-fidelity garment. All branding sequences are fulfilled via Apliiq Manufacturing.</p>
                        </div>

                        {/* Garment Selection */}
                        <div className="space-y-6">
                            <h2 className="text-[0.6rem] font-black uppercase tracking-widest text-gray-300">I. Base Garment</h2>
                            <div className="grid grid-cols-1 gap-2">
                                {products.slice(0, 3).map(item => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setSelectedProduct(item)}
                                        className={`w-full p-6 text-left border rounded-lg transition-all ${selectedProduct.id === item.id ? 'border-black bg-white ring-1 ring-black' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="font-bold text-sm">{item.name}</div>
                                            <div className="text-[0.7rem] font-black">${item.price}</div>
                                        </div>
                                        <div className="text-[0.6rem] text-gray-400 uppercase tracking-tight">{item.brand}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Branding Config */}
                        <div className="space-y-6">
                            <h2 className="text-[0.6rem] font-black uppercase tracking-widest text-gray-300">II. Branding Sequence</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {brandingOptions.map(opt => {
                                    const isLocked = tiers.indexOf(opt.minTier) > tiers.indexOf(userTier);
                                    return (
                                        <button 
                                            key={opt.id}
                                            disabled={isLocked}
                                            onClick={() => { setActiveBranding(opt); setZoomDetail(opt.id !== 'none'); }}
                                            className={`
                                                p-5 border rounded-lg text-center relative transition-all
                                                ${activeBranding.id === opt.id ? 'border-black bg-black text-white' : 'border-gray-100 bg-white hover:border-gray-300'}
                                                ${isLocked ? 'opacity-20 cursor-not-allowed' : ''}
                                            `}
                                        >
                                            <div className="text-[0.7rem] font-black mb-1">{opt.title}</div>
                                            <div className="text-[0.6rem] opacity-60">+{opt.price > 0 ? `$${opt.price}` : 'Incl.'}</div>
                                            {isLocked && <div className="absolute top-2 right-2 text-[0.5rem]">🔒</div>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="pt-10 border-t border-gray-100 space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-gray-400 uppercase">Subtotal</span>
                                <span className="text-3xl font-black">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button 
                                onClick={addToCart}
                                className="w-full bg-black text-white py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-red-600 transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="py-20 text-center text-[0.6rem] text-gray-300 font-bold uppercase tracking-[0.4em]">
                Aura Threads Canada &copy; 2026 / Laboratory v2.1
            </footer>
        </main>
    );
}
