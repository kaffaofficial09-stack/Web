import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './Context/CartContext';

createInertiaApp({
    title: (title) => title ? `${title} - Kaffah Education Partner` : 'Kaffah Education Partner',
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <CartProvider>
                <App {...props} />
            </CartProvider>
        );
    },
});
