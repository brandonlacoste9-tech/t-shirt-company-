'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

        {/* Banner 1 — Tall left panel */}
        <div className="relative aspect-[4/5] md:aspect-auto md:h-[640px] overflow-hidden bg-stone-900 group luxury-shadow">
          <Image
            src="/assets/lifestyle-1.png"
            alt="Oversized Series"
            fill
            className="object-cover object-center kb-zoom opacity-80"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

          {/* Tag */}
          <div className="absolute top-6 left-6">
            <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[0.55rem] font-black uppercase tracking-[0.4em] px-3 py-1.5">
              Autumn Essentials
            </span>
          </div>

          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-400 mb-3">New Arrivals</p>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-6 leading-tight">
              The Oversized<br />Series
            </h3>
            <Link
              href="/collections/all"
              className="self-start bg-white text-stone-900 px-7 py-3.5 text-[0.6rem] font-black uppercase tracking-[0.3em] hover:bg-stone-100 transition-luxury"
            >
              Shop Category →
            </Link>
          </div>
        </div>

        {/* Banner 2 — Two stacked panels */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Top stacked */}
          <div className="relative aspect-[16/9] md:h-[300px] overflow-hidden bg-stone-800 group luxury-shadow">
            <Image
              src="/assets/lifestyle-2.png"
              alt="Aura Grails"
              fill
              className="object-cover object-center kb-zoom opacity-80"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

            <div className="absolute top-5 left-5">
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[0.55rem] font-black uppercase tracking-[0.4em] px-3 py-1.5">
                Limited Release
              </span>
            </div>

            <div className="absolute inset-0 p-7 flex flex-col justify-end">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mb-4 leading-tight">
                Aura Signature<br />Grails
              </h3>
              <Link
                href="/collections/all"
                className="self-start text-white text-[0.6rem] font-black uppercase tracking-[0.3em] border-b border-white/40 pb-0.5 hover:border-white transition-luxury"
              >
                Discover →
              </Link>
            </div>
          </div>

          {/* Bottom stacked */}
          <div className="relative aspect-[16/9] md:h-[316px] overflow-hidden bg-stone-700 group luxury-shadow">
            <Image
              src="/assets/p1.png"
              alt="Premium Heavyweight"
              fill
              className="object-cover object-center kb-zoom opacity-75"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

            <div className="absolute top-5 left-5">
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[0.55rem] font-black uppercase tracking-[0.4em] px-3 py-1.5">
                Essentials
              </span>
            </div>

            <div className="absolute inset-0 p-7 flex flex-col justify-end">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mb-4 leading-tight">
                Heavyweight<br />Premium Tees
              </h3>
              <Link
                href="/collections/all"
                className="self-start text-white text-[0.6rem] font-black uppercase tracking-[0.3em] border-b border-white/40 pb-0.5 hover:border-white transition-luxury"
              >
                Shop Now →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
