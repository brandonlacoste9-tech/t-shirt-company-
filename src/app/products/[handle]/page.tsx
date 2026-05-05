'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProductPage() {
    const params = useParams();
    const handle = params.handle as string;
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('L');

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
            size: selectedSize,
            quantity: 1
        };
        const existingCart = JSON.parse(localStorage.getItem('aura-cart') || '[]');
        localStorage.setItem('aura-cart', JSON.stringify([...existingCart, cartItem]));
        window.location.href = '/?cart=open';
    };

    if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-black text-xs uppercase tracking-widest text-gray-200">Retrieving Blueprint...</div>;
    if (!product) return <div className="min-h-screen bg-white flex items-center justify-center font-black text-xs uppercase tracking-widest">Garment Not Found</div>;

    return (
        <main className="min-h-screen bg-white text-black font-sans">
            <header className="h-16 border-b border-gray-100 flex justify-between items-center px-8 sticky top-0 bg-white/80 backdrop-blur-xl z-50">
                <Link href="/" className="font-black text-xl tracking-tighter">AURA</Link>
                <div className="flex gap-8 text-[0.65rem] font-black uppercase tracking-widest">
                    <Link href="/" className="opacity-40 hover:opacity-100">Return</Link>
                    <Link href="/vault" className="opacity-40 hover:opacity-100">Vault</Link>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Gallery */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden rounded-sm">
                            <Image 
                                src={product.images[selectedImage]} 
                                alt={product.name} 
                                fill 
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                            {product.images.map((img: string, i: number) => (
                                <button 
                                    key={i} 
                                    onClick={() => setSelectedImage(i)}
                                    className={`aspect-square relative bg-gray-50 rounded-sm overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-black' : 'border-transparent opacity-50'}`}
                                >
                                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:col-span-5 space-y-12 py-10">
                        <div>
                            <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-[0.4em] mb-4">Aura Threads / Collection v1</p>
                            <h1 className="text-5xl font-black tracking-tighter uppercase leading-none mb-4">{product.name}</h1>
                            <p className="text-2xl font-black text-red-600">${product.price.toFixed(2)}</p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-[0.6rem] font-black uppercase tracking-widest text-gray-300">Description</h2>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">{product.description}</p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-[0.6rem] font-black uppercase tracking-widest text-gray-300">Select Variant</h2>
                            <div className="flex flex-wrap gap-3">
                                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                    <button 
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 border rounded-full flex items-center justify-center font-black text-xs transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-gray-400'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-10 border-t border-gray-100">
                            <button 
                                onClick={addToCart}
                                className="w-full bg-black text-white py-6 font-black text-xs uppercase tracking-[0.4em] hover:bg-red-600 transition-colors shadow-2xl shadow-black/5"
                            >
                                Add to Bag
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="py-20 text-center text-[0.6rem] text-gray-200 font-black uppercase tracking-[0.8em]">
                Aura Threads Canada / Node 2.6
            </footer>
        </main>
    );
}
