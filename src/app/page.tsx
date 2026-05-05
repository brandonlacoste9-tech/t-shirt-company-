'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import ProductCard from '@/components/grid/ProductCard';
import ProductModal from '@/components/grid/ProductModal';
import FeaturedBanner from '@/components/grid/FeaturedBanner';

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const catalogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, []);

    const scrollToCatalog = () => {
        catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const featuredProducts = products.slice(0, 4);

    return (
        <main className="min-h-screen bg-white selection:bg-stone-200">
            <Header />

            {/* Hero Section */}
            <Hero onShopNow={scrollToCatalog} />

            {/* Featured Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="reveal">
                        <p className="text-[0.65rem] font-black uppercase tracking-[0.5em] text-stone-400 mb-4">Curated Highlights</p>
                        <h2 className="text-4xl md:text-5xl font-black text-stone-900 uppercase tracking-tighter">Featured Pieces</h2>
                    </div>
                    <button 
                        onClick={scrollToCatalog}
                        className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-400 hover:text-stone-900 transition-colors border-b border-stone-200 pb-1"
                    >
                        Explore Complete Catalog →
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-stone-100 aspect-[3/4] mb-4" />
                                <div className="bg-stone-100 h-3 w-3/4 mb-2" />
                                <div className="bg-stone-100 h-3 w-1/2" />
                            </div>
                        ))
                    ) : (
                        featuredProducts.map((p) => (
                            <div key={p.id} onClick={() => setSelectedProduct(p)} className="cursor-pointer">
                                <ProductCard product={p} />
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Banners */}
            <FeaturedBanner />

            {/* Catalog Section */}
            <section ref={catalogRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-stone-100">
                <div className="mb-12">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.5em] text-stone-400 mb-4">The Collection</p>
                    <h2 className="text-4xl md:text-5xl font-black text-stone-900 uppercase tracking-tighter">Entire Catalog</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-stone-100 aspect-[3/4] mb-4" />
                                <div className="bg-stone-100 h-3 w-3/4 mb-2" />
                                <div className="bg-stone-100 h-3 w-1/2" />
                            </div>
                        ))
                    ) : products.length > 0 ? (
                        products.map((p) => (
                            <div key={p.id} onClick={() => setSelectedProduct(p)} className="cursor-pointer">
                                <ProductCard product={p} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-300">Synchronizing Product Sequence...</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Value Props */}
            <section className="bg-stone-50 py-20 border-y border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { title: 'Global Logistics', desc: 'Secure fulfillment sequence' },
                            { title: 'Easy Returns', desc: '30-day garment protection' },
                            { title: 'Secure Checkout', desc: 'SSL encrypted gateway' },
                            { title: 'Priority Support', desc: 'Engineering assistance' },
                        ].map(item => (
                            <div key={item.title} className="reveal">
                                <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-stone-900 mb-2">{item.title}</p>
                                <p className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-stone-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ProductModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
            />

            <Footer />
        </main>
    );
}

