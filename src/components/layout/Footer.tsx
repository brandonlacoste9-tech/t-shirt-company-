import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-black tracking-tighter text-stone-900 uppercase mb-6 block">
              AURA THREADS
            </Link>
            <p className="text-stone-500 text-sm max-w-sm leading-relaxed mb-8 uppercase font-medium tracking-tight">
              Curating high-fidelity garment engineering for the modern individual. 
              Fulfilled globally, designed in Canada.
            </p>
            <div className="flex gap-6">
              {['Instagram', 'Twitter', 'Pinterest'].map(social => (
                <Link key={social} href="#" className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-stone-400 hover:text-stone-900 transition-colors">
                  {social}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-900 mb-6">Shop</h4>
            <ul className="space-y-4">
              {['All Products', 'New Arrivals', 'Essentials', 'Featured'].map(item => (
                <li key={item}>
                  <Link href="/collections/all" className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-stone-500 hover:text-stone-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-900 mb-6">Support</h4>
            <ul className="space-y-4">
              {['Shipping', 'Returns', 'Size Guide', 'Contact'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-stone-500 hover:text-stone-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[0.55rem] font-black uppercase tracking-[0.4em] text-stone-400">
            &copy; 2026 AURA THREADS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service'].map(policy => (
              <Link key={policy} href="#" className="text-[0.55rem] font-black uppercase tracking-[0.4em] text-stone-400 hover:text-stone-900 transition-colors">
                {policy}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

