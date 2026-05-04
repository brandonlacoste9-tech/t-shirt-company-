'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminLaunch() {
    const [isLaunching, setIsLaunching] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleLaunch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLaunching(true);
        
        // Simulated API sequence:
        // 1. Artwork Upload
        // 2. Design Creation
        // 3. SKU Generation
        
        setTimeout(() => {
            setIsLaunching(false);
            setResult({
                designId: 'AP-DSG-' + Math.floor(Math.random() * 1000000),
                sku: 'AURA-H-3719-BLK',
                status: 'Active on Apliiq Production Floor'
            });
        }, 3000);
    };

    return (
        <main className="min-h-screen bg-[#050507] text-white p-10 font-['Outfit']">
            <nav className="mb-20 flex justify-between items-center">
                <Link href="/" className="logo">AURA<span>THREADS</span> <span className="text-xs opacity-50 ml-2">ADMIN</span></Link>
                <Link href="/" className="text-sm opacity-50 hover:opacity-100 transition-opacity">Back to Store</Link>
            </nav>

            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold mb-4">Launch New <span className="gradient-text">Collection</span></h1>
                    <p className="text-white/60">Automated manufacturing bridge to the Apliiq production floor.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <form onSubmit={handleLaunch} className="space-y-8 bg-white/5 p-10 rounded-3xl border border-white/10">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-white/40">Artwork Asset</label>
                            <div className="border-2 border-dashed border-white/10 rounded-2xl h-48 flex items-center justify-center hover:border-primary/50 transition-colors cursor-pointer">
                                <span className="text-sm opacity-30">Drop Print File (.PNG, .AI)</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-white/40">Product Blank (Code)</label>
                            <select className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none focus:border-primary">
                                <option value="3719">Bella+Canvas 3719 (Hoodie)</option>
                                <option value="EC1000">Econscious EC1000 (Organic Tee)</option>
                                <option value="5000">Gildan 5000 (Heavy Tee)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-white/40">Branding Services</label>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked readOnly className="accent-primary" />
                                    <span className="text-sm">Inner Neck Print</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked readOnly className="accent-primary" />
                                    <span className="text-sm">Woven Hem Label (Aura Design)</span>
                                </label>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLaunching}
                            className="w-full bg-primary py-4 rounded-xl font-bold hover:brightness-110 transition-all disabled:opacity-50"
                        >
                            {isLaunching ? 'Syncing with Apliiq...' : 'Launch Production'}
                        </button>
                    </form>

                    <div className="space-y-8">
                        <div className="bg-white/5 p-10 rounded-3xl border border-white/10 h-full">
                            <h3 className="text-lg font-bold mb-6">Real-Time Sync Status</h3>
                            
                            {isLaunching && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                                        <span>Uploading High-Res Artwork...</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm opacity-30">
                                        <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                                        <span>Configuring Branding Services...</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm opacity-30">
                                        <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                                        <span>Generating Apliiq SKU...</span>
                                    </div>
                                </div>
                            )}

                            {!isLaunching && result && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
                                        ✅ {result.status}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[0.6rem] uppercase opacity-40 font-bold">Apliiq Design ID</label>
                                        <div className="bg-black/40 p-3 rounded-lg font-mono text-sm border border-white/5">{result.designId}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[0.6rem] uppercase opacity-40 font-bold">Active Store SKU</label>
                                        <div className="bg-black/40 p-3 rounded-lg font-mono text-sm border border-white/5">{result.sku}</div>
                                    </div>
                                </div>
                            )}

                            {!isLaunching && !result && (
                                <div className="h-full flex items-center justify-center opacity-20 italic text-sm">
                                    Waiting for launch sequence...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .logo { font-size: 1.5rem; font-weight: 800; color: white; text-decoration: none; }
                .logo span { color: #8a2be2; }
                .gradient-text { background: linear-gradient(135deg, #8a2be2, #00f2ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
            `}</style>
        </main>
    );
}
