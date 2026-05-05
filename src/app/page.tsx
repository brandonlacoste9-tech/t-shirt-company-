'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import ProductCard from '@/components/grid/ProductCard';
import ProductModal from '@/components/grid/ProductModal';
import FeaturedBanner from '@/components/grid/FeaturedBanner';
import { ArrowRight } from 'lucide-react';

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const catalogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => { setProducts(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const scrollToCatalog = () => {
        catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const featuredProducts = products.slice(0, 4);

    return (
        <main className="min-h-screen bg-white selection:bg-stone-200">
            <Header />

            {/* Hero */}
            <Hero onShopNow={scrollToCatalog} />

            {/* Trust bar */}
            <div className="bg-stone-950 border-b border-stone-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-800">
                        {[
                            { title: 'Global Shipping', desc: 'Worldwide fulfilment' },
                            { title: '30-Day Returns', desc: 'Hassle-free garment protection' },
                            { title: 'Secure Checkout', desc: 'SSL encrypted gateway' },
                            { title: 'Priority Support', desc: 'Real human assistance' },
                        ].map(item => (
                            <div key={item.title} className="py-5 px-6 text-center">
                                <p className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-stone-300 mb-1">{item.title}</p>
                                <p className="text-[0.52rem] font-black uppercase tracking-[0.15em] text-stone-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
                    <div>
                        <p className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-stone-400 mb-3">Curated Highlights</p>
                        <h2 className="text-4xl md:text-5xl font-black text-stone-900 uppercase tracking-tighter">Featured Pieces</h2>
                    </div>
                    <button
                        onClick={scrollToCatalog}
                        className="flex items-center gap-2 text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-400 hover:text-stone-900 transition-colors group"
                    >
                        Full Catalog
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-stone-100 aspect-[3/4] mb-4" />
                                <div className="bg-stone-100 h-2.5 w-3/4 mb-2 rounded" />
                                <div className="bg-stone-100 h-2.5 w-1/3 rounded" />
                            </div>
                        ))
                        : featuredProducts.map((p, i) => (
                            <div key={p.id} onClick={() => setSelectedProduct(p)} className="cursor-pointer" style={{ animationDelay: `${i * 0.08}s` }}>
                                <ProductCard product={p} />
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* Featured Banners */}
            <FeaturedBanner />

            {/* Full Catalog */}
            <section ref={catalogRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 border-t border-stone-100">
                <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
                    <div>
                        <p className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-stone-400 mb-3">The Collection</p>
                        <h2 className="text-4xl md:text-5xl font-black text-stone-900 uppercase tracking-tighter">Entire Catalog</h2>
                    </div>
                    {products.length > 0 && (
                        <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-400">
                            {products.length} Pieces
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
                    {loading
                        ? Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-stone-100 aspect-[3/4] mb-4" />
                                <div className="bg-stone-100 h-2.5 w-3/4 mb-2 rounded" />
                                <div className="bg-stone-100 h-2.5 w-1/3 rounded" />
                            </div>
                        ))
                        : products.length > 0
                            ? products.map((p, i) => (
                                <div key={p.id} onClick={() => setSelectedProduct(p)} className="cursor-pointer" style={{ animationDelay: `${(i % 8) * 0.06}s` }}>
                                    <ProductCard product={p} />
                                </div>
                            ))
                            : (
                                <div className="col-span-full py-24 text-center">
                                    <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-300">Synchronizing Product Sequence...</p>
                                </div>
                            )
                    }
                </div>
            </section>

            {/* Editorial Strip */}
            <section className="bg-stone-950 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-stone-500 mb-5">The Aura Standard</p>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-8 leading-tight">
                        Engineered For<br />The Modern Individual
                    </h2>
                    <p className="text-stone-400 text-sm max-w-xl mx-auto leading-relaxed mb-10">
                        Every garment is obsessively crafted — from fabric selection to stitching. No compromises, no shortcuts. Just timeless pieces built to outlast trends.
                    </p>
                    <button
                        onClick={scrollToCatalog}
                        className="bg-white text-stone-900 px-10 py-4 text-[0.7rem] font-black uppercase tracking-[0.3em] hover:bg-stone-100 transition-luxury"
                    >
                        Shop The Collection
                    </button>
                </div>
            </section>

            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            <Footer />
        </main>
    );
}
