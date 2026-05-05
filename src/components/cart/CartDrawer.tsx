'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        const loadCart = () => {
            const savedCart = JSON.parse(localStorage.getItem('aura-cart') || '[]');
            setCartItems(savedCart);
        };
        loadCart();
        window.addEventListener('storage', loadCart);
        return () => window.removeEventListener('storage', loadCart);
    }, [isOpen]);

    const updateQty = (id: string, delta: number) => {
        const updated = cartItems.map(item => {
            if (item.cartItemId === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        localStorage.setItem('aura-cart', JSON.stringify(updated));
        setCartItems(updated);
        window.dispatchEvent(new Event('storage'));
    };

    const removeItem = (id: string) => {
        const updated = cartItems.filter(item => item.cartItemId !== id);
        localStorage.setItem('aura-cart', JSON.stringify(updated));
        setCartItems(updated);
        window.dispatchEvent(new Event('storage'));
    };

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className={`fixed inset-0 z-[3000] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <header className="px-6 py-6 border-b border-stone-100 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <ShoppingBag size={18} className="text-stone-900" />
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-stone-900">Your Bag ({cartItems.length})</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
                            <X size={20} className="text-stone-400 hover:text-stone-900" />
                        </button>
                    </header>

                    <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
                        {cartItems.length > 0 ? cartItems.map((item) => (
                            <div key={item.cartItemId} className="flex gap-6 items-start group">
                                <div className="w-24 aspect-[3/4] bg-stone-50 relative overflow-hidden flex-shrink-0 luxury-shadow">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-black text-[0.7rem] uppercase tracking-wider text-stone-900">{item.name}</h4>
                                        <button onClick={() => removeItem(item.cartItemId)} className="text-stone-300 hover:text-red-500 transition-colors">
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <p className="text-[0.6rem] text-stone-400 uppercase font-black tracking-widest">Size: {item.size}</p>
                                    
                                    <div className="flex justify-between items-center pt-4">
                                        <div className="flex items-center border border-stone-200">
                                            <button onClick={() => updateQty(item.cartItemId, -1)} className="p-1.5 hover:bg-stone-50 text-stone-400 hover:text-stone-900">
                                                <Minus size={12} />
                                            </button>
                                            <span className="text-[0.65rem] font-black w-8 text-center text-stone-900">{item.quantity}</span>
                                            <button onClick={() => updateQty(item.cartItemId, 1)} className="p-1.5 hover:bg-stone-50 text-stone-400 hover:text-stone-900">
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        <span className="text-stone-900 font-black text-xs">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <ShoppingBag size={48} className="text-stone-100 mb-6" />
                                <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-300">Your Bag is Empty</p>
                                <button 
                                    onClick={onClose}
                                    className="mt-8 text-[0.6rem] font-black uppercase tracking-[0.3em] text-stone-900 border-b border-stone-900 pb-1"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        )}
                    </div>

                    <footer className="p-6 bg-stone-50 border-t border-stone-100 space-y-6">
                        <div className="flex justify-between items-end">
                            <span className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-stone-400">Subtotal</span>
                            <span className="text-2xl font-black tracking-tighter text-stone-900">${total.toFixed(2)}</span>
                        </div>
                        <p className="text-[0.55rem] text-stone-400 uppercase font-black tracking-widest text-center">
                            Shipping and taxes calculated at checkout
                        </p>
                        <button 
                            className="w-full bg-stone-900 text-white py-5 text-[0.7rem] font-black uppercase tracking-[0.3em] hover:bg-stone-800 transition-luxury luxury-shadow"
                            disabled={cartItems.length === 0}
                            onClick={() => window.location.href = '/api/checkout'}
                        >
                            Proceed to Checkout
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}

