'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/data/products';

// i18n Data
const translations: any = {
    en: {
        hero_title: 'Wear the <span class="gradient-text">Future</span>',
        hero_desc: "Premium quality t-shirts, designed by artists, fulfilled by the world's best printers, and delivered directly to your doorstep.",
        shop_now: 'Shop Collection',
        learn_more: 'Learn More',
        bag: 'Your Bag',
        checkout: 'Proceed to Checkout',
        branding_label: 'Custom Branding',
        standard: 'Standard Neck Print',
        woven: 'Premium Woven Label (+$5.00)',
        empty_bag: 'Your bag is empty!',
        success: 'Success! Your order has been sent to our fulfillment partner.',
        view_details: 'View Brand Details',
        shipping_est: 'Estimated Shipping',
        story_title: 'The Modern Voyageur',
        story_desc: 'Designed for the nomad who demands quality without compromise. Every thread is a journey, every print a destination.'
    },
    fr: {
        hero_title: 'Portez le <span class="gradient-text">Futur</span>',
        hero_desc: "Des t-shirts de qualité premium, conçus par des artistes, imprimés par les meilleurs au monde et livrés directement chez vous.",
        shop_now: 'Voir la Collection',
        learn_more: 'En Savoir Plus',
        bag: 'Votre Panier',
        checkout: 'Passer à la Caisse',
        branding_label: 'Marquage Personnalisé',
        standard: 'Impression Col Standard',
        woven: 'Étiquette Tissée Premium (+5.00$)',
        empty_bag: 'Votre panier est vide!',
        success: 'Succès! Votre commande a été envoyée à notre partenaire.',
        view_details: 'Voir les Détails',
        shipping_est: 'Livraison Estimée',
        story_title: 'Le Voyageur Moderne',
        story_desc: 'Conçu pour le nomade qui exige la qualité sans compromis. Chaque fil est un voyage, chaque impression une destination.'
    }
};

interface CartItem extends Product {
    cartItemId: string;
    size: string;
    branding: string;
    quantity: number;
}

export default function Home() {
    const router = useRouter();
    const [lang, setLang] = useState<'en' | 'fr'>('en');
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showLabelDetail, setShowLabelDetail] = useState<string | null>(null);

    const t = translations[lang];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        
        // Dynamic Catalog Fetch
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Catalog fetch error:', err));

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const addToCart = (productId: string) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const size = (document.getElementById(`size-${productId}`) as HTMLSelectElement).value;
        const branding = (document.getElementById(`branding-${productId}`) as HTMLSelectElement).value;
        const cartItemId = `${productId}-${size}-${branding}`;

        const existingItem = cart.find(item => item.cartItemId === cartItemId);

        let finalPrice = product.price;
        if (branding === 'woven') finalPrice += 5.00;

        if (existingItem) {
            setCart(cart.map(item => 
                item.cartItemId === cartItemId 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ));
        } else {
            setCart([...cart, { ...product, cartItemId, size, branding, price: finalPrice, quantity: 1 }]);
        }

        setIsCartOpen(true);
    };

    const removeFromCart = (cartItemId: string) => {
        setCart(cart.filter(item => item.cartItemId !== cartItemId));
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 12.00 : 0;
    const total = subtotal + shipping;
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const processCheckout = async () => {
        if (cart.length === 0) {
            alert(t.empty_bag);
            return;
        }

        setIsProcessing(true);
        
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cart }),
            });

            const data = await response.json();

            if (data.url) {
                // Redirect to Stripe Checkout
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Checkout initialization failed');
            }
        } catch (error: any) {
            console.error('Checkout Error:', error);
            alert(`Checkout Error: ${error.message}. Please check if STRIPE_SECRET_KEY is configured.`);
            
            // Fallback for development if no key is present
            if (process.env.NODE_ENV === 'development') {
                const orderId = 'AT-DEV-' + Math.floor(Math.random() * 1000000);
                router.push(`/voyage/${orderId}`);
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <main className="min-h-screen">
            {/* Navbar */}
            <nav className={`navbar ${scrolled ? 'py-4 bg-[#0a0a0ce6]' : 'py-6 bg-[#0a0a0ccc]'}`}>
                <div className="nav-container">
                    <a href="#" className="logo">AURA<span>THREADS</span></a>
                    <ul className="nav-links">
                        <li><a href="#story">Story</a></li>
                        <li><a href="#collection">Collection</a></li>
                        <li><Link href="/vault" className="text-secondary font-bold">Vault</Link></li>
                    </ul>
                    <div className="nav-actions">
                        <div className="lang-toggle">
                            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
                            <span>|</span>
                            <button className={lang === 'fr' ? 'active' : ''} onClick={() => setLang('fr')}>FR</button>
                        </div>
                        <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                            </svg>
                            <span className="cart-count">{cartCount}</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="hero flex items-center justify-between px-[10%] h-screen pt-20">
                <div className="hero-content max-w-2xl">
                    <h1 className="text-7xl font-extrabold leading-tight mb-6" dangerouslySetInnerHTML={{ __html: t.hero_title }}></h1>
                    <p className="text-xl text-white/60 mb-10 leading-relaxed">{t.hero_desc}</p>
                    <div className="flex gap-6">
                        <a href="#collection" className="btn btn-primary bg-primary py-4 px-10 rounded-full font-bold shadow-lg shadow-primary/30 transition-transform hover:-translate-y-1">{t.shop_now}</a>
                        <a href="#story" className="btn border border-white/10 py-4 px-10 rounded-full font-bold hover:bg-white/5 transition-colors">{t.learn_more}</a>
                    </div>
                </div>
                <div className="hero-visual hidden lg:flex items-center justify-center flex-1">
                    <div className="relative w-[500px] h-[500px] animate-[float_6s_ease-in-out_infinite]">
                        <Image src="/assets/hero.png" alt="Aura Threads Hero" fill className="object-contain drop-shadow-2xl" />
                    </div>
                </div>
            </header>

            {/* Lifestyle Story Section */}
            <section id="story" className="py-32 bg-bg relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                                <Image src="/assets/lifestyle-1.png" alt="Modern Voyageur Lifestyle" fill className="object-cover" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-5xl font-bold mb-6">{t.story_title}</h2>
                            <p className="text-xl text-white/60 mb-10 leading-relaxed italic border-l-4 border-primary pl-8">"{t.story_desc}"</p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                    <h4 className="font-bold text-primary mb-2">Sustainable</h4>
                                    <p className="text-sm text-white/40">Organic cottons & eco-inks.</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                    <h4 className="font-bold text-secondary mb-2">Bespoke</h4>
                                    <p className="text-sm text-white/40">Custom woven labeling.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collection */}
            <section id="collection" className="py-32 bg-bg-dark px-10 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold mb-4">The <span className="gradient-text">SS26</span> Drop</h2>
                    <p className="text-white/60">Curated boutique essentials for the Modern Voyageur.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    {products.map(product => (
                        <div key={product.id} className="product-card group/card">
                            <div className="product-image h-[400px] relative bg-[#1e1e22] overflow-hidden">
                                {showLabelDetail === product.id ? (
                                    <Image src="/assets/label-detail.png" alt="Woven Label Detail" fill className="object-cover animate-in fade-in zoom-in duration-500" />
                                ) : (
                                    <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover/card:scale-110" />
                                )}
                                <div className="product-badge absolute top-4 right-4 bg-primary text-white text-[0.7rem] font-bold px-3 py-1 rounded-full">{product.brand}</div>
                                
                                <button 
                                    onClick={() => setShowLabelDetail(showLabelDetail === product.id ? null : product.id)}
                                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[0.7rem] font-bold px-4 py-2 rounded-full border border-white/20 opacity-0 group-hover/card:opacity-100 transition-all hover:bg-primary"
                                >
                                    {t.view_details}
                                </button>
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <div className="mb-2">
                                    <span className="text-[0.7rem] text-white/40 font-mono">SKU: {product.sku}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                <p className="text-sm text-white/60 mb-8 leading-relaxed">{product.description}</p>
                                
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="selector">
                                        <label className="block text-[0.7rem] text-white/40 uppercase tracking-wider mb-2">Size</label>
                                        <select id={`size-${product.id}`} className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl outline-none focus:border-primary transition-colors">
                                            {product.variants.map(v => <option key={v} value={v} className="bg-bg-dark">{v}</option>)}
                                        </select>
                                    </div>
                                    <div className="selector">
                                        <label className="block text-[0.7rem] text-white/40 uppercase tracking-wider mb-2">{t.branding_label}</label>
                                        <select id={`branding-${product.id}`} className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl outline-none focus:border-primary transition-colors">
                                            <option value="standard" className="bg-bg-dark">{t.standard}</option>
                                            <option value="woven" className="bg-bg-dark">{t.woven}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-auto">
                                    <p className="text-2xl font-extrabold text-secondary">${product.price.toFixed(2)}</p>
                                    <button 
                                        onClick={() => addToCart(product.id)}
                                        className="bg-white/10 hover:bg-primary hover:text-white text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                                    >
                                        Add to Bag
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lifestyle Image Section 2 */}
            <section className="h-[60vh] relative">
                <Image src="/assets/lifestyle-2.png" alt="Urban Voyageur" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent"></div>
            </section>

            {/* Cart Drawer */}
            <div className={`cart-drawer ${isCartOpen ? 'active' : ''}`}>
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-bold">{t.bag}</h3>
                    <button className="text-4xl leading-none" onClick={() => setIsCartOpen(false)}>&times;</button>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-4">
                    {cart.map(item => (
                        <div key={item.cartItemId} className="cart-item">
                            <div className="relative w-20 h-20 bg-white/5 rounded-xl overflow-hidden shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold mb-1">{item.name}</h4>
                                <p className="text-sm text-white/40 mb-2">{item.size} | {t[item.branding]}</p>
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-secondary">${item.price.toFixed(2)} x {item.quantity}</p>
                                    <button onClick={() => removeFromCart(item.cartItemId)} className="text-xs text-red-500 uppercase font-bold tracking-widest hover:text-red-400">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/10">
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm text-white/60">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-white/60">
                            <span>{t.shipping_est}:</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-bold pt-4 border-t border-white/10">
                            <span>Total:</span>
                            <span className="text-secondary">${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button 
                        onClick={processCheckout}
                        disabled={isProcessing}
                        className="w-full bg-primary py-4 rounded-2xl font-bold text-lg hover:brightness-110 transition-all disabled:opacity-50"
                    >
                        {isProcessing ? '...' : t.checkout}
                    </button>
                </div>
            </div>

            <footer className="py-20 text-center border-t border-white/5 bg-bg-dark">
                <div className="logo mb-6">AURA<span>THREADS</span></div>
                <p className="text-white/20 text-sm">&copy; 2026 Aura Threads. Defined by Quality. Fulfilled by Apliiq.</p>
            </footer>
        </main>
    );
}
