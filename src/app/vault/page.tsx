'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';

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
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeBranding, setActiveBranding] = useState(brandingOptions[1]);
    const [zoomDetail, setZoomDetail] = useState(false);
    const [cart, setCart] = useState<any[]>([]);
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

        const newCart = [...cart, cartItem];
        setCart(newCart);
        localStorage.setItem('aura-cart', JSON.stringify(newCart));
        window.location.href = '/?cart=open';
    };

    const saveBlueprint = async () => {
        if (!selectedProduct) return;
        const token = localStorage.getItem('swarm-token');
        if (!token) return alert('Please join the Swarm to save DNA Blueprints.');

        const blueprint = {
            name: `${selectedProduct.name} - ${activeBranding.title}`,
            garment: selectedProduct.name,
            branding: activeBranding.id
        };

        const res = await fetch('/api/auth/swarm/blueprints', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ blueprint })
        });

        if (res.ok) alert('DNA Blueprint Archived to the Swarm.');
    };

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                if (data.length > 0) setSelectedProduct(data[0]);
            });
    }, []);

    if (!selectedProduct) return <div className="min-h-screen bg-[#050507] flex items-center justify-center text-white font-['Outfit']">Syncing Vault with Apliiq...</div>;

    const totalPrice = selectedProduct.price + activeBranding.price;

    return (
        <main className="min-h-screen bg-[#050507] text-white p-10 font-['Outfit']">
            <nav className="mb-20 flex justify-between items-center max-w-7xl mx-auto">
                <Link href="/" className="logo text-2xl font-extrabold">AURA<span>THREADS</span></Link>
                <div className="flex gap-8 items-center text-sm font-bold uppercase tracking-widest">
                    <Link href="/" className="opacity-50 hover:opacity-100 transition-opacity">Store</Link>
                    <span className="text-primary">Vault</span>
                    <Link href="/swarm" className="opacity-50 hover:opacity-100 transition-opacity ml-4">Swarm</Link>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto animate-obsidian-open">
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
                                {brandingOptions.map(opt => {
                                    const isLocked = tiers.indexOf(opt.minTier) > tiers.indexOf(userTier);
                                    return (
                                        <button 
                                            key={opt.id}
                                            disabled={isLocked}
                                            onClick={() => { setActiveBranding(opt); setZoomDetail(opt.id !== 'none'); }}
                                            className={`p-4 rounded-2xl border text-center transition-all relative group/btn ${activeBranding.id === opt.id ? (opt.id.includes('black') ? 'animate-gold-trace border-secondary text-white' : 'bg-secondary/10 border-secondary text-white') : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'} ${isLocked ? 'cursor-not-allowed opacity-50 grayscale' : ''}`}
                                        >
                                            <div className="text-sm font-bold flex items-center justify-center gap-2">
                                                {opt.title}
                                                {isLocked && <span>🔒</span>}
                                            </div>
                                            <div className="text-[0.6rem] opacity-50">
                                                {isLocked ? `Requires ${opt.minTier}` : `+${opt.price > 0 ? `$${opt.price}` : 'Incl.'}`}
                                            </div>
                                            {isLocked && (
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/btn:opacity-100 transition-opacity flex items-center justify-center rounded-2xl p-4">
                                                    <p className="text-[0.5rem] leading-tight uppercase font-bold tracking-tighter">Increase your Command Status to unlock Black-Label exclusivity.</p>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
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
                            <button 
                                onClick={addToCart}
                                className="w-full bg-primary py-5 rounded-3xl font-bold text-lg hover:brightness-110 shadow-lg shadow-primary/20 transition-all mb-4"
                            >
                                Add Custom to Bag
                            </button>
                            <button 
                                onClick={saveBlueprint}
                                className="w-full border border-white/10 py-4 rounded-3xl font-bold text-sm hover:bg-white/5 transition-all text-white/40 flex items-center justify-center gap-2"
                            >
                                🧬 Save DNA Blueprint
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
