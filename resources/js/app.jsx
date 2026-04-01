import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './Context/CartContext';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

createInertiaApp({
    title: (title) => title ? `${title} - Kaffah Education Partner` : 'Kaffah Education Partner',
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        return pages[`./Pages/${name}.jsx`]();
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <CartProvider>
                <App {...props} />
                <SpeedInsights />
                <Analytics />
            </CartProvider>
        );
    },
});
