'use client';

import Link from 'next/link';

interface HeroProps {
  onShopNow?: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-100 pt-20">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-stone-200 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-stone-300 rounded-full blur-3xl opacity-30" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl reveal">
        <p className="text-[0.65rem] font-black uppercase tracking-[0.6em] text-stone-400 mb-6">
          Established MMXXVI / Autumn Sequence
        </p>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-stone-900 tracking-tighter mb-8 leading-[0.9]">
          AURA<br />THREADS
        </h1>
        <p className="text-sm md:text-base text-stone-500 mb-12 max-w-xl mx-auto font-medium tracking-wide leading-relaxed uppercase">
          Curated luxury streetwear engineered for the modern individual. 
          Limited drops. Timeless aesthetics. Global fulfillment.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={onShopNow}
            className="w-full sm:w-auto bg-stone-900 text-white px-10 py-5 text-[0.7rem] font-black uppercase tracking-[0.3em] hover:bg-stone-800 transition-luxury luxury-shadow"
          >
            Explore Collection
          </button>
          <Link 
            href="/collections/all"
            className="w-full sm:w-auto border border-stone-200 text-stone-900 px-10 py-5 text-[0.7rem] font-black uppercase tracking-[0.3em] hover:bg-white transition-luxury"
          >
            View All Pieces
          </Link>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-24 bg-stone-200" />
    </section>
  );
}
