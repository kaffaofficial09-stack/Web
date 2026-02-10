import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        program: resolve(__dirname, 'program-pelatihan.html'),
        buku: resolve(__dirname, 'buku-modul.html'),
        portofolio: resolve(__dirname, 'portofolio.html'),
        insight: resolve(__dirname, 'insight.html'),
        tentang: resolve(__dirname, 'tentang-kami.html'),
        kontak: resolve(__dirname, 'kontak.html'),
      },
    },
  },
});
