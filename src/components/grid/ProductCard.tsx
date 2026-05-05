'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart } from 'lucide-react';

interface ProductCardProps {
    product: {
        id: string;
        title: string;
        handle: string;
        description?: string;
        images: {
            edges: Array<{
                node: {
                    url: string;
                    altText?: string;
                }
            }>
        };
        priceRange: {
            minVariantPrice: {
                amount: string;
                currencyCode: string;
            }
        };
        variants?: {
            edges: Array<{
                node: {
                    id: string;
                    title: string;
                }
            }>
        };
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const [liked, setLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const imageUrl = product.images.edges[0]?.node.url || '/placeholder.png';
    const altText = product.images.edges[0]?.node.altText || product.title;
    const price = parseFloat(product.priceRange.minVariantPrice.amount);

    return (
        <div 
            className="group relative reveal"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <Link href={`/products/${product.handle}`} className="block relative aspect-[3/4] overflow-hidden bg-stone-100 luxury-shadow">
                <Image
                    src={imageUrl}
                    alt={altText}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />

                {/* Wishlist */}
                <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                    <Heart size={14} fill={liked ? '#1c1917' : 'none'} className="text-stone-800" />
                </button>

                {/* Quick Add Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button 
                        className="w-full bg-stone-900 text-white text-[0.6rem] font-black uppercase tracking-[0.3em] py-3 flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors"
                        onClick={(e) => { e.preventDefault(); /* Add to cart logic */ }}
                    >
                        <ShoppingBag size={12} />
                        Quick Add
                    </button>
                </div>
            </Link>

            {/* Info */}
            <div className="pt-4 pb-2">
                <div className="flex justify-between items-start mb-1">
                    <Link 
                        href={`/products/${product.handle}`}
                        className="text-stone-900 font-black text-[0.7rem] uppercase tracking-wider hover:text-stone-500 transition-colors leading-tight"
                    >
                        {product.title}
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-stone-900 font-bold text-[0.75rem] tracking-tight">${price.toFixed(2)}</span>
                    <span className="text-[0.55rem] uppercase tracking-widest text-stone-400 font-black">AUD</span>
                </div>
            </div>
        </div>
    );
}

