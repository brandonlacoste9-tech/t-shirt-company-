'use client';

import Link from 'next/link';

export default function FeaturedBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Banner 1 */}
        <div className="relative aspect-[16/9] md:aspect-auto md:h-[600px] overflow-hidden bg-stone-100 group luxury-shadow">
          <div className="absolute inset-0 bg-stone-200 transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute inset-0 p-12 flex flex-col justify-end items-start text-white">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] mb-4 drop-shadow-md">Autumn Essentials</p>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 drop-shadow-lg">The Oversized Series</h3>
            <Link 
              href="/collections/all" 
              className="bg-white text-stone-900 px-8 py-4 text-[0.65rem] font-black uppercase tracking-[0.3em] hover:bg-stone-900 hover:text-white transition-luxury"
            >
              Shop Category
            </Link>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="relative aspect-[16/9] md:aspect-auto md:h-[600px] overflow-hidden bg-stone-200 group luxury-shadow">
          <div className="absolute inset-0 bg-stone-300 transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute inset-0 p-12 flex flex-col justify-end items-start text-white">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] mb-4 drop-shadow-md">Limited Release</p>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 drop-shadow-lg">Aura Signature Grails</h3>
            <Link 
              href="/collections/all" 
              className="bg-white text-stone-900 px-8 py-4 text-[0.65rem] font-black uppercase tracking-[0.3em] hover:bg-stone-900 hover:text-white transition-luxury"
            >
              Discover Grails
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
