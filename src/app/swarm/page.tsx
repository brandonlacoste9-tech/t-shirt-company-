'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SwarmAuth() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = isLogin ? '/api/auth/swarm/login' : '/api/auth/swarm/signup';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem('swarm-token', data.token);
                router.push('/swarm/dashboard');
            } else {
                setError(data.error || 'Authentication failed. Please check your credentials.');
            }
        } catch (err) {
            setError('System error. The Swarm is currently inaccessible.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050507] text-white font-['Outfit'] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-md w-full relative z-10">
                <div className="text-center mb-12">
                    <Link href="/" className="logo text-3xl font-extrabold mb-4 inline-block">AURA<span>THREADS</span></Link>
                    <h1 className="text-4xl font-bold mt-4">Join the <span className="gradient-text">Swarm</span></h1>
                    <p className="text-white/40 mt-2">Access your bespoke archives and sovereign vault presets.</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
                    {/* Decorative "Imperial" Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50"></div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[0.6rem] uppercase tracking-widest font-bold text-white/40 ml-4">Patron Email</label>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-secondary transition-all placeholder:text-white/10"
                                placeholder="name@aura.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[0.6rem] uppercase tracking-widest font-bold text-white/40 ml-4">Security Sequence</label>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-secondary transition-all placeholder:text-white/10"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-xs font-bold text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <button 
                            disabled={loading}
                            className="w-full bg-white text-black py-5 rounded-2xl font-bold hover:bg-secondary hover:text-white transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-white/5"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                isLogin ? 'Initialize Session' : 'Create Identity'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button 
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-[0.7rem] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors"
                        >
                            {isLogin ? "Need a Swarm Identity? Register" : "Existing Patron? Log In"}
                        </button>
                    </div>
                </div>

                <Link href="/" className="mt-12 inline-block w-full text-center text-xs text-white/20 hover:text-white/40 transition-colors">
                    Return to the Storefront
                </Link>
            </div>

            <style jsx>{`
                .logo { font-size: 1.5rem; font-weight: 800; color: white; text-decoration: none; }
                .logo span { color: #8a2be2; }
                .gradient-text { background: linear-gradient(135deg, #d4af37, #f9d976); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
            `}</style>
        </main>
    );
}
