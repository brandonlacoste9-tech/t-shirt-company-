'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/grid/ProductCard';
import ProductModal from '@/components/grid/ProductModal';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    useEffect(() => {
        if (!query) {
            setLoading(false);
            return;
        }

        setLoading(true);
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [query]);

    return (
        <main className="min-h-screen bg-white text-stone-900 selection:bg-stone-200">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-stone-100 pb-10 gap-6">
                    <div className="reveal">
                        <p className="text-[0.65rem] font-black uppercase tracking-[0.5em] text-stone-400 mb-4">Discovery Sequence</p>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-stone-900">
                            {query ? `Search: ${query}` : 'Find Your Aura'}
                        </h1>
                    </div>
                    <p className="text-[0.6rem] font-black text-stone-300 uppercase tracking-[0.4em]">
                        {products.length} {products.length === 1 ? 'Garment' : 'Garments'} Found
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-stone-50 aspect-[3/4] mb-4 luxury-shadow" />
                                <div className="bg-stone-50 h-3 w-3/4 mb-2" />
                                <div className="bg-stone-50 h-3 w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                        {products.map((p: any) => (
                            <div key={p.id} onClick={() => setSelectedProduct(p)} className="cursor-pointer">
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center reveal">
                        <div className="mb-8 flex justify-center text-stone-100">
                            <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-300 mb-8">No garments matched your search sequence</p>
                        <button 
                            onClick={() => window.location.href = '/collections/all'}
                            className="bg-stone-900 text-white px-10 py-5 text-[0.65rem] font-black uppercase tracking-[0.3em] hover:bg-stone-800 transition-luxury luxury-shadow"
                        >
                            Explore All Products
                        </button>
                    </div>
                )}
            </div>

            <ProductModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
            />

            <Footer />
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-300 animate-pulse">Initializing Search Node...</p>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
