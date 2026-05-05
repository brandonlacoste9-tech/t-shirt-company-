'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

    const removeItem = (id: string) => {
        const updated = cartItems.filter(item => item.cartItemId !== id);
        localStorage.setItem('aura-cart', JSON.stringify(updated));
        setCartItems(updated);
        window.dispatchEvent(new Event('storage'));
    };

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className={`fixed inset-0 z-[3000] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/5 shadow-2xl transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <header className="p-8 border-b border-white/5 flex justify-between items-center">
                        <h2 className="text-xl font-black tracking-tighter uppercase">Your Bag [{cartItems.length}]</h2>
                        <button onClick={onClose} className="text-white/40 hover:text-white uppercase text-[0.6rem] font-black tracking-widest">Close</button>
                    </header>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        {cartItems.length > 0 ? cartItems.map((item) => (
                            <div key={item.cartItemId} className="flex gap-6 items-center group">
                                <div className="w-20 h-24 bg-white/5 relative rounded-lg overflow-hidden flex-shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h4 className="font-black text-sm uppercase tracking-tight">{item.name}</h4>
                                    <p className="text-[0.6rem] text-white/40 uppercase tracking-widest">Size: {item.size}</p>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-accent font-black text-sm">${item.price.toFixed(2)}</span>
                                        <button onClick={() => removeItem(item.cartItemId)} className="text-[0.5rem] font-black uppercase text-red-500/40 hover:text-red-500 tracking-widest">Remove</button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="h-full flex flex-center items-center justify-center">
                                <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/10">Your Bag is Empty</p>
                            </div>
                        )}
                    </div>

                    <footer className="p-8 border-t border-white/5 bg-black/40 space-y-8">
                        <div className="flex justify-between items-end">
                            <span className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-white/20">Estimated Total</span>
                            <span className="text-3xl font-black tracking-tighter">${total.toFixed(2)}</span>
                        </div>
                        <button 
                            className="w-full btn-apex py-6 text-center block"
                            disabled={cartItems.length === 0}
                            onClick={() => window.location.href = '/api/checkout'}
                        >
                            Initiate Checkout
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}
