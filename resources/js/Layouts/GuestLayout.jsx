import { useState, lazy, Suspense } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FloatingWhatsApp from '../Components/FloatingWhatsApp';
import { FloatingCartButton } from '../Components/CartIcon';

// Lazy load heavy components that are not immediately visible
const Chatbot = lazy(() => import('../Components/Chatbot'));
const CartDrawer = lazy(() => import('../Components/CartDrawer'));

export default function GuestLayout({ children }) {
    const [cartOpen, setCartOpen] = useState(false);
    const [chatbotLoaded, setChatbotLoaded] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingCartButton onClick={() => setCartOpen(true)} />
            <FloatingWhatsApp />

            {/* Chatbot: load only after user interaction or after idle */}
            <div onMouseEnter={() => setChatbotLoaded(true)} onClick={() => setChatbotLoaded(true)}>
                {chatbotLoaded ? (
                    <Suspense fallback={null}>
                        <Chatbot />
                    </Suspense>
                ) : (
                    // Minimal placeholder toggle button
                    <div className="fixed bottom-8 left-8 z-[100]">
                        <button
                            onClick={() => setChatbotLoaded(true)}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-[#1A3C34] hover:scale-110 shadow-[#1A3C34]/30 hover:shadow-xl hover:shadow-[#1A3C34]/40 transition-all duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
                            </div>
                        </button>
                    </div>
                )}
            </div>

            {/* CartDrawer: load only when opened */}
            {cartOpen && (
                <Suspense fallback={null}>
                    <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                </Suspense>
            )}
        </div>
    );
}
