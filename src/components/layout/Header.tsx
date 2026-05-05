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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Fetch collections for navigation
    fetch('/api/collections')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCollections(data);
      })
      .catch(err => console.error('Error fetching collections:', err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-white/95 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter text-stone-900 hover:text-stone-600 transition-colors uppercase"
          >
            AURA THREADS
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 border-none bg-transparent relative p-0 h-auto shadow-none backdrop-blur-0">
            <Link
              href="/collections/all"
              className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-500 hover:text-stone-900 transition-colors"
            >
              All
            </Link>
            {collections.slice(0, 4).map(col => (
              <Link
                key={col.id}
                href={`/collections/${col.handle}`}
                className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-500 hover:text-stone-900 transition-colors"
              >
                {col.title}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="border-b border-stone-900 text-[0.65rem] font-black uppercase tracking-widest outline-none py-1 w-40 bg-transparent placeholder-stone-400"
                />
                <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
                  <X size={18} className="text-stone-500 hover:text-stone-900 transition-colors" />
                </button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="text-stone-600 hover:text-stone-900 transition-colors">
                <Search size={20} />
              </button>
            )}

            <button onClick={() => setIsCartOpen(true)} className="relative text-stone-600 hover:text-stone-900 transition-colors">
              <ShoppingBag size={20} />
            </button>

            <button className="lg:hidden text-stone-600 hover:text-stone-900 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-80 border-t border-stone-100' : 'max-h-0'}`}>
        <nav className="px-4 py-6 flex flex-col gap-6 bg-white border-none shadow-none relative h-auto">
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
  );
}

