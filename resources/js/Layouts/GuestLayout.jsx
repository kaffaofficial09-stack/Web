import { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FloatingWhatsApp from '../Components/FloatingWhatsApp';
import { FloatingCartButton } from '../Components/CartIcon';
import CartDrawer from '../Components/CartDrawer';

export default function GuestLayout({ children }) {
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingCartButton onClick={() => setCartOpen(true)} />
            <FloatingWhatsApp />
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
    );
}

