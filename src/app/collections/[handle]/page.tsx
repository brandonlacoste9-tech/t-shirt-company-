'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/grid/ProductCard';
import ProductModal from '@/components/grid/ProductModal';

export default function CollectionPage() {
    const params = useParams();
    const handle = params.handle as string;
    const [collection, setCollection] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    useEffect(() => {
        fetch(`/api/collections/${handle}`)
            .then(res => res.json())
            .then(data => {
                setCollection(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [handle]);

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-300 animate-pulse">Cataloging Collection...</p>
        </div>
    );
    
    if (!collection) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-900">Collection Not Found</p>
        </div>
    );

    return (
        <main className="min-h-screen bg-white text-stone-900 selection:bg-stone-200">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-stone-100 pb-10 gap-6">
                    <div className="reveal">
                        <p className="text-[0.65rem] font-black uppercase tracking-[0.5em] text-stone-400 mb-4">Category</p>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-stone-900">{collection.title}</h1>
                    </div>
                    <p className="text-[0.6rem] font-black text-stone-300 uppercase tracking-[0.4em]">{collection.products.length} Garments Found</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                    {collection.products.map((p: any) => (
                        <div key={p.id} onClick={() => setSelectedProduct(p)} className="cursor-pointer">
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            </div>

            <ProductModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
            />

            <Footer />
        </main>
    );
}

