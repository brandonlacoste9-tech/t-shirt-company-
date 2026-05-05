'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function CollectionPage() {
    const params = useParams();
    const handle = params.handle as string;
    const [collection, setCollection] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/collections/${handle}`)
            .then(res => res.json())
            .then(data => {
                setCollection(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [handle]);

    if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-black text-xs uppercase tracking-widest text-gray-200">Cataloging Collection...</div>;
    if (!collection) return <div className="min-h-screen bg-white flex items-center justify-center font-black text-xs uppercase tracking-widest">Collection Not Found</div>;

    return (
        <main className="min-h-screen bg-white text-black">
            <header className="h-[90px] border-b border-gray-100 flex justify-between items-center px-12 sticky top-0 bg-white/80 backdrop-blur-xl z-[100]">
                <Link href="/" className="text-2xl font-black tracking-tighter">AURA</Link>
                <nav className="flex gap-10 text-[0.7rem] font-black uppercase tracking-widest">
                    <Link href="/" className="opacity-40 hover:opacity-100 transition-opacity">Home</Link>
                    <span className="text-black border-b-2 border-black pb-1">{collection.title}</span>
                </nav>
            </header>

            <div className="container-wide py-20">
                <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-10">
                    <h1 className="text-5xl font-black tracking-tighter uppercase">{collection.title}</h1>
                    <p className="text-xs font-black text-gray-300 uppercase tracking-[0.4em]">{collection.products.length} Garments Found</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-20">
                    {collection.products.map((p: any) => (
                        <Link key={p.id} href={`/products/${p.handle}`} className="product-card group animate-in">
                            <div className="product-image rounded-sm">
                                <Image 
                                    src={p.image} 
                                    alt={p.name} 
                                    fill 
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-black tracking-tight group-hover:underline underline-offset-8">{p.name}</h3>
                                <p className="text-lg font-black text-red-600">${p.price.toFixed(2)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <footer className="py-24 border-t border-gray-100 bg-gray-50 mt-40 text-center">
                <div className="text-4xl font-black text-gray-100 select-none">AURA</div>
                <p className="text-[0.5rem] font-black text-gray-300 mt-4 uppercase tracking-[0.5em]">Node 2.6 Active</p>
            </footer>
        </main>
    );
}
