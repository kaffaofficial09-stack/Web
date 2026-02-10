import { useState } from 'react';
import { useCart } from '../Context/CartContext';

export default function CartIcon() {
    return null; // Rendering handled by CartDrawer toggle — this is the floating button
}

export function FloatingCartButton({ onClick }) {
    const { totalItems } = useCart();

    if (totalItems === 0) return null;

    return (
        <button
            onClick={onClick}
            className="fixed bottom-28 right-8 bg-primary text-white w-[60px] h-[60px] rounded-full
                       flex items-center justify-center shadow-lg z-100
                       hover:scale-110 hover:bg-primary-dark transition-all duration-300 cursor-pointer"
            aria-label="Buka Keranjang"
        >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
                    {totalItems > 99 ? '99+' : totalItems}
                </span>
            )}
        </button>
    );
}
