'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import CartDrawer from '../cart/CartDrawer';

interface Collection {
  id: string;
  title: string;
  handle: string;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });

    fetch('/api/collections')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setCollections(data); })
      .catch(() => {});

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('aura-cart') || '[]');
      setCartCount(cart.reduce((acc: number, item: any) => acc + item.quantity, 0));
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar w-full overflow-hidden">
        <div className="marquee-track py-2.5">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-[0.55rem] font-black uppercase tracking-[0.4em] text-stone-400 px-12">
              Free Shipping On Orders Over $150 &nbsp;&nbsp;·&nbsp;&nbsp; New Drop: Autumn Sequence &nbsp;&nbsp;·&nbsp;&nbsp; Designed In Canada &nbsp;&nbsp;·&nbsp;&nbsp; 30-Day Returns
            </span>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-black tracking-tighter text-stone-900 hover:text-stone-500 transition-colors uppercase"
            >
              AURA THREADS
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              <Link
                href="/collections/all"
                className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-500 hover:text-stone-900 transition-colors underline-link"
              >
                All
              </Link>
              {collections.slice(0, 4).map(col => (
                <Link
                  key={col.id}
                  href={`/collections/${col.handle}`}
                  className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-500 hover:text-stone-900 transition-colors underline-link"
                >
                  {col.title}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-5">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2 animate-[fadeInUp_0.3s_ease_forwards]">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="border-b border-stone-900 text-[0.65rem] font-black uppercase tracking-widest outline-none py-1 w-36 bg-transparent placeholder-stone-300"
                  />
                  <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
                    <X size={16} className="text-stone-400 hover:text-stone-900 transition-colors" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="text-stone-500 hover:text-stone-900 transition-colors">
                  <Search size={18} />
                </button>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-stone-500 hover:text-stone-900 transition-colors"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-stone-900 text-white rounded-full text-[0.5rem] font-black flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className="lg:hidden text-stone-500 hover:text-stone-900 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-400 ${mobileOpen ? 'max-h-96 border-t border-stone-100' : 'max-h-0'}`}>
          <nav className="px-6 py-8 flex flex-col gap-7 bg-white">
            <Link
              href="/collections/all"
              onClick={() => setMobileOpen(false)}
              className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-500 hover:text-stone-900 transition-colors"
            >
              All Products
            </Link>
            {collections.map(col => (
              <Link
                key={col.id}
                href={`/collections/${col.handle}`}
                onClick={() => setMobileOpen(false)}
                className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-500 hover:text-stone-900 transition-colors"
              >
                {col.title}
              </Link>
            ))}
          </nav>
        </div>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </header>
    </>
  );
}
