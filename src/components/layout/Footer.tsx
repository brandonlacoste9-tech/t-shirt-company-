import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-950 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top: Brand statement */}
        <div className="border-b border-stone-800 pb-16 mb-16">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-6">
            AURA<br />THREADS
          </h2>
          <p className="text-stone-500 text-sm max-w-sm leading-relaxed font-medium tracking-tight">
            Curating high-fidelity garment engineering for the modern individual. Fulfilled globally, designed in Canada.
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-500 mb-6">Shop</h4>
            <ul className="space-y-4">
              {['All Products', 'New Arrivals', 'Essentials', 'Featured'].map(item => (
                <li key={item}>
                  <Link href="/collections/all" className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-stone-400 hover:text-white transition-colors underline-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-500 mb-6">Support</h4>
            <ul className="space-y-4">
              {[
                { label: 'Shipping', href: '/shipping' },
                { label: 'Returns', href: '/returns' },
                { label: 'Size Guide', href: '#' },
                { label: 'Contact', href: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-stone-400 hover:text-white transition-colors underline-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-500 mb-6">Connect</h4>
            <ul className="space-y-4">
              {['Instagram', 'TikTok', 'Twitter', 'Pinterest'].map(social => (
                <li key={social}>
                  <Link href="#" className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-stone-400 hover:text-white transition-colors underline-link">
                    {social}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-stone-500 mb-6">Newsletter</h4>
            <p className="text-[0.6rem] text-stone-500 uppercase font-black tracking-wide leading-relaxed mb-4">
              Early access to drops & exclusive offers.
            </p>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-stone-900 border border-stone-800 text-white text-[0.6rem] font-black uppercase tracking-widest px-4 py-3 outline-none placeholder-stone-600 focus:border-stone-600 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-stone-900 text-[0.6rem] font-black uppercase tracking-[0.3em] py-3 hover:bg-stone-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[0.52rem] font-black uppercase tracking-[0.4em] text-stone-600">
            &copy; 2026 AURA THREADS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service'].map(policy => (
              <Link key={policy} href="#" className="text-[0.52rem] font-black uppercase tracking-[0.4em] text-stone-600 hover:text-stone-300 transition-colors">
                {policy}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
