'use client';

import { X, ShoppingBag, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductModalProps {
  product: any | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) return null;

  const imageUrl = product.images.edges[0]?.node.url || '/placeholder.png';
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row reveal luxury-shadow">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full text-stone-400 hover:text-stone-900 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 relative aspect-square md:aspect-auto bg-stone-50">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <div className="mb-8">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-400 mb-2">Essential Collection</p>
            <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter mb-4">{product.title}</h2>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-stone-900">${price.toFixed(2)}</span>
              <span className="text-[0.6rem] font-black uppercase tracking-widest text-stone-400">AUD</span>
            </div>
          </div>

          <p className="text-stone-500 text-sm leading-relaxed mb-10 uppercase font-medium tracking-tight">
            {product.description || "High-fidelity garment engineered for the modern individual. Designed for maximum comfort and timeless aesthetic."}
          </p>

          <div className="space-y-8">
            {/* Size Selector (Mockup for now) */}
            <div>
              <div className="flex justify-between mb-4">
                <span className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-stone-900">Select Size</span>
                <button className="text-[0.55rem] font-black uppercase tracking-[0.3em] text-stone-400 border-b border-stone-200">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-[0.7rem] font-black transition-luxury border ${
                      selectedSize === size ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-stone-900 block mb-4">Quantity</span>
              <div className="flex items-center border border-stone-200 w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-stone-50 text-stone-400 hover:text-stone-900"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm font-black w-12 text-center text-stone-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-stone-50 text-stone-400 hover:text-stone-900"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button 
              className="w-full bg-stone-900 text-white py-5 text-[0.7rem] font-black uppercase tracking-[0.3em] hover:bg-stone-800 transition-luxury luxury-shadow flex items-center justify-center gap-3"
            >
              <ShoppingBag size={18} />
              Add to Bag — ${(price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
