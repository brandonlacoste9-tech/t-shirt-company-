import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-40 bg-black/40 border-t border-white/5">
            <div className="container-apex grid grid-cols-1 md:grid-cols-4 gap-20">
                <div className="col-span-2 space-y-12">
                    <div className="text-4xl font-black tracking-tighter uppercase">AURA<span className="text-accent italic">APEX</span></div>
                    <p className="text-sm text-white/30 leading-relaxed font-medium max-w-sm">
                        The definitive signature in high-fidelity apparel. Engineered for the sovereign individual, fulfilled via the global Apliiq manufacturing sequence. Direct-to-patron retail.
                    </p>
                </div>
                <div className="space-y-8">
                    <h4 className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-white/20">Governance</h4>
                    <ul className="space-y-4 text-[0.65rem] font-black uppercase tracking-[0.4em] text-white/40">
                        <li><Link href="/vault" className="hover:text-white">The Vault</Link></li>
                        <li><Link href="/shipping" className="hover:text-white">Logistics & Shipping</Link></li>
                        <li><Link href="/returns" className="hover:text-white">Returns & Exchanges</Link></li>
                    </ul>
                </div>
                <div className="space-y-8">
                    <h4 className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-white/20">Connect</h4>
                    <ul className="space-y-4 text-[0.65rem] font-black uppercase tracking-[0.4em] text-white/40">
                        <li><Link href="#" className="hover:text-white">Instagram</Link></li>
                        <li><Link href="#" className="hover:text-white">Email the Node</Link></li>
                        <li><Link href="/admin/sync" className="hover:text-white opacity-20">Sync Diagnostics</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-40 text-center text-[0.5rem] font-black uppercase tracking-[1em] text-white/5">
                AURA THREADS CANADA &copy; 2026 / APEX NODE v2.6 / SOVEREIGNTY SECURED
            </div>
        </footer>
    );
}
