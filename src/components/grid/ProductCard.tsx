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
    const [hovered, setHovered] = useState(false);

    const imageUrl = product.images.edges[0]?.node.url || '/placeholder.png';
    const secondImageUrl = product.images.edges[1]?.node.url;
    const altText = product.images.edges[0]?.node.altText || product.title;
    const price = parseFloat(product.priceRange.minVariantPrice.amount);

    return (
        <div
            className="group relative flex flex-col reveal"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image Container */}
            <Link href={`/products/${product.handle}`} className="block relative aspect-[3/4] overflow-hidden bg-stone-100">

                {/* Primary Image */}
                <Image
                    src={imageUrl}
                    alt={altText}
                    fill
                    className={`object-cover transition-all duration-700 ${secondImageUrl ? (hovered ? 'opacity-0' : 'opacity-100') : 'group-hover:scale-[1.04]'}`}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />

                {/* Secondary Image (if available) */}
                {secondImageUrl && (
                    <Image
                        src={secondImageUrl}
                        alt={altText}
                        fill
                        className={`object-cover transition-all duration-700 ${hovered ? 'opacity-100 scale-[1.03]' : 'opacity-0 scale-100'}`}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                )}

                {/* Wishlist Button */}
                <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                    aria-label="Add to wishlist"
                >
                    <Heart
                        size={13}
                        fill={liked ? '#1c1917' : 'none'}
                        stroke={liked ? '#1c1917' : '#78716c'}
                    />
                </button>

                {/* Quick Add Overlay */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <button
                        className="w-full bg-stone-900/95 backdrop-blur-sm text-white text-[0.58rem] font-black uppercase tracking-[0.25em] py-3.5 flex items-center justify-center gap-2 hover:bg-stone-900 transition-colors"
                        onClick={e => { e.preventDefault(); /* add to cart */ }}
                    >
                        <ShoppingBag size={11} />
                        Quick Add
                    </button>
                </div>
            </Link>

            {/* Info */}
            <div className="pt-3.5 pb-2 flex flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                    <Link
                        href={`/products/${product.handle}`}
                        className="text-stone-900 font-black text-[0.68rem] uppercase tracking-wider hover:text-stone-500 transition-colors leading-snug flex-1"
                    >
                        {product.title}
                    </Link>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-stone-900 font-bold text-[0.78rem]">${price.toFixed(2)}</span>
                    <span className="text-[0.52rem] uppercase tracking-widest text-stone-400 font-black">AUD</span>
                </div>
            </div>
        </div>
    );
}
