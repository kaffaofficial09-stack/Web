import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    build: {
        // Split vendor chunks for better caching
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-inertia': ['@inertiajs/react'],
                },
            },
        },
        // Increase chunk size warning (we're intentionally splitting)
        chunkSizeWarningLimit: 200,
        // Enable minification
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
