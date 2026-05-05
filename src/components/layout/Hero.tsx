'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  onShopNow?: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero.png"
          alt="Aura Threads Hero"
          fill
          priority
          className="object-cover object-center kb-zoom"
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
        <div className="absolute inset-0 bg-stone-950/30" />
      </div>

      {/* Content — fully centered */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="reveal text-[0.6rem] font-black uppercase tracking-[0.6em] text-stone-400 mb-6">
          Established MMXXVI &nbsp;/&nbsp; Autumn Sequence
        </p>

        <h1 className="reveal reveal-delay-1 text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8">
          AURA<br />THREADS
        </h1>

        <p className="reveal reveal-delay-2 text-sm text-stone-300 mb-10 max-w-md mx-auto font-medium tracking-wide leading-relaxed">
          Curated luxury streetwear engineered for the modern individual. Limited drops. Timeless aesthetics.
        </p>

        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={onShopNow}
            className="bg-white text-stone-900 px-10 py-4 text-[0.7rem] font-black uppercase tracking-[0.3em] hover:bg-stone-100 transition-luxury"
          >
            Explore Collection
          </button>
          <Link
            href="/collections/all"
            className="border border-white/30 text-white px-10 py-4 text-[0.7rem] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-luxury"
          >
            View All Pieces
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-16 bg-white/50" />
        <span className="text-[0.5rem] font-black uppercase tracking-[0.4em] text-white">Scroll</span>
      </div>
    </section>
  );
}
