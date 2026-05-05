'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Minus, Plus, ShoppingBag, Heart, Shield, RefreshCw, Truck } from 'lucide-react';

export default function ProductPage() {
    const params = useParams();
    const handle = params.handle as string;
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        fetch(`/api/products/${handle}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [handle]);

    const addToCart = () => {
        const cartItem = {
            ...product,
            cartItemId: `${product.id}-${selectedSize}`,
            image: product.images[0],
            size: selectedSize,
            quantity: quantity
        };
        const existingCart = JSON.parse(localStorage.getItem('aura-cart') || '[]');
        localStorage.setItem('aura-cart', JSON.stringify([...existingCart, cartItem]));
        window.location.href = '/?cart=open';
    };

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-300 animate-pulse">Retrieving Blueprint...</p>
        </div>
    );
    
    if (!product) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-900">Garment Not Found</p>
        </div>
    );

    return (
        <main className="min-h-screen bg-white text-stone-900 selection:bg-stone-200">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                    {/* Gallery */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="aspect-[3/4] bg-stone-50 relative overflow-hidden luxury-shadow reveal">
                            <Image 
                                src={product.images[selectedImage]} 
                                alt={product.name} 
                                fill 
                                className="object-cover"
                                priority
                            />
                            <button
                                onClick={() => setLiked(!liked)}
                                className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-sm hover:bg-white transition-all"
                            >
                                <Heart size={20} fill={liked ? '#1c1917' : 'none'} className="text-stone-800" />
                            </button>
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                            {product.images.map((img: string, i: number) => (
                                <button 
                                    key={i} 
                                    onClick={() => setSelectedImage(i)}
                                    className={`aspect-square relative bg-stone-50 overflow-hidden transition-all border ${selectedImage === i ? 'border-stone-900' : 'border-stone-100 opacity-60 hover:opacity-100'}`}
                                >
                                    <Image src={img} alt="Thumbnail" fill className="object-cover" sizes="100px" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:col-span-5 space-y-12 py-4 reveal" style={{ animationDelay: '0.2s' }}>
                        <div>
                            <p className="text-[0.6rem] font-black text-stone-400 uppercase tracking-[0.4em] mb-4">Aura Threads / Collection v1</p>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-stone-900 mb-6">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-black text-stone-900">${product.price.toFixed(2)}</span>
                                <span className="text-[0.6rem] font-black uppercase tracking-widest text-stone-400">AUD</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-stone-900">Description</h2>
                            <p className="text-sm text-stone-500 leading-relaxed font-medium uppercase tracking-tight">
                                {product.description || "High-fidelity garment engineered for the modern individual. Designed for maximum comfort and timeless aesthetic."}
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-stone-900">Select Size</span>
                                    <button className="text-[0.55rem] font-black uppercase tracking-[0.3em] text-stone-400 border-b border-stone-200">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                        <button 
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-14 h-14 flex items-center justify-center text-[0.7rem] font-black transition-luxury border ${
                                                selectedSize === size ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-stone-900 block mb-4">Quantity</span>
                                <div className="flex items-center border border-stone-200 w-fit">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-4 hover:bg-stone-50 text-stone-400 hover:text-stone-900"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="text-sm font-black w-14 text-center text-stone-900">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-4 hover:bg-stone-50 text-stone-400 hover:text-stone-900"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button 
                                onClick={addToCart}
                                disabled={!selectedSize}
                                className="w-full bg-stone-900 text-white py-6 text-[0.75rem] font-black uppercase tracking-[0.3em] hover:bg-stone-800 transition-luxury luxury-shadow flex items-center justify-center gap-3 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed"
                            >
                                <ShoppingBag size={20} />
                                Add to Bag — ${(product.price * quantity).toFixed(2)}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6 pt-12 border-t border-stone-100">
                            {[
                                { icon: Truck, text: 'Free Express Shipping' },
                                { icon: RefreshCw, text: '30-Day Easy Returns' },
                                { icon: Shield, text: 'Secure Payment Sequence' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-stone-400">
                                    <item.icon size={18} strokeWidth={1.5} />
                                    <span className="text-[0.6rem] font-black uppercase tracking-[0.2em]">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

