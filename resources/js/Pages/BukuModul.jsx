import { Head } from '@inertiajs/react';
import { useState } from 'react';
import GuestLayout from '../Layouts/GuestLayout';
import PageHeader from '../Components/PageHeader';
import { useCart } from '../Context/CartContext';

export default function BukuModul() {
    const { addItem } = useCart();
    const [toast, setToast] = useState(null);

    const products = [
        {
            id: 'berhitung-a', image: '/img/Berhitung A.jpg',
            title: 'Ayo Berhitung - A', desc: 'Buku berhitung untuk anak usia dini — isi jumlah dengan angka. Level A.',
            price: 'Rp 25.000', priceNum: 25000,
        },
        {
            id: 'berhitung-b', image: '/img/Berhitung B.jpg',
            title: 'Ayo Berhitung - B', desc: 'Buku berhitung untuk anak usia dini — isi jumlah dengan angka. Level B.',
            price: 'Rp 20.000', priceNum: 20000,
        },
        {
            id: 'berhitung-c', image: '/img/Berhitung C.jpg',
            title: 'Ayo Berhitung - C', desc: 'Buku berhitung untuk anak usia dini — isi jumlah dengan angka. Level C.',
            price: 'Rp 25.000', priceNum: 25000,
        },
        {
            id: 'berhitung-d', image: '/img/Berhitung D.jpg',
            title: 'Ayo Berhitung - D', desc: 'Buku berhitung untuk anak usia dini — isi jumlah dengan angka. Level D.',
            price: 'Rp 20.000', priceNum: 20000,
        },
        {
            id: 'membaca-a', image: '/img/Membaca A.jpg',
            title: 'Aku Membaca Tanpa Mengeja - A', desc: 'Panduan belajar membaca tanpa mengeja untuk anak. Level A.',
            price: 'Rp 25.000', priceNum: 25000,
        },
        {
            id: 'membaca-b', image: '/img/Membaca B.jpg',
            title: 'Aku Membaca Tanpa Mengeja - B', desc: 'Panduan belajar membaca tanpa mengeja untuk anak. Level B.',
            price: 'Rp 28.000', priceNum: 28000,
        },
        {
            id: 'membaca-c', image: '/img/Membaca C.jpg',
            title: 'Aku Membaca Tanpa Mengeja - C', desc: 'Panduan belajar membaca tanpa mengeja untuk anak. Level C.',
            price: 'Rp 28.000', priceNum: 28000,
        },
        {
            id: 'literasi', image: '/img/Literasi.jpg',
            title: 'Modul Literasi', desc: 'Modul pendukung literasi untuk meningkatkan kemampuan membaca dan menulis.',
            price: 'Rp 29.000', priceNum: 29000,
        },
        {
            id: 'numerasi', image: '/img/Numerasi.jpg',
            title: 'Modul Numerasi', desc: 'Modul pendukung numerasi untuk meningkatkan kemampuan berhitung dan logika.',
            price: 'Rp 23.000', priceNum: 23000,
        },
        {
            id: 'menulis', image: '/img/Menulis.jpg',
            title: 'Buku Menulis', desc: 'Panduan latihan menulis untuk mengembangkan keterampilan menulis anak.',
            price: 'Rp 20.000', priceNum: 20000,
        },
    ];

    const packages = [
        {
            id: 'paket-1', emoji: '📦', title: 'Paket Mandiri', subtitle: 'Cocok untuk guru individu', price: 'Rp 150.000', priceNum: 150000,
            features: ['1 Buku Berhitung', '1 Buku Membaca', 'Akses Video Tutorial'],
            featured: false, btnClass: 'bg-primary text-white hover:bg-primary-dark',
        },
        {
            id: 'paket-2', emoji: '📚', title: 'Paket Lembaga', subtitle: 'Untuk perpustakaan sekolah', price: 'Rp 1.400.000', priceNum: 1400000,
            features: ['10 Set Buku Lengkap', 'Bonus Alat Peraga', 'Gratis Ongkir Area Jabodetabek'],
            featured: true, badge: 'BEST SELLER', btnClass: 'bg-accent text-white hover:bg-accent-hover',
        },
        {
            id: 'paket-3', emoji: '🎓', title: 'Paket Pelatihan', subtitle: 'Bundling dengan Workshop', price: 'Hubungi Kami', priceNum: 0,
            features: ['Buku untuk Semua Peserta', '2 Hari Pelatihan Offline', 'Sertifikat 32 JP'],
            featured: false, btnClass: 'border-2 border-primary text-primary hover:bg-primary hover:text-white', isKontak: true,
        },
    ];

    const handleAddToCart = (item) => {
        addItem({ id: item.id, title: item.title, priceNum: item.priceNum, emoji: item.emoji || '📖', image: item.image });
        setToast(item.title);
        setTimeout(() => setToast(null), 2000);
    };

    return (
        <GuestLayout>
            <Head title="Buku & Modul" />

            <PageHeader
                title="Buku & Modul Pendukung"
                subtitle="Koleksi materi pembelajaran berkualitas untuk mendukung penguasaan literasi dan numerasi."
            />

            {/* Toast Notification */}
            <div
                className={`fixed top-24 right-6 z-3000 bg-primary text-white px-5 py-3 rounded-xl shadow-lg
                            flex items-center gap-3 transition-all duration-300 ${
                    toast ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
                }`}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm font-medium">{toast} ditambahkan ke keranjang</span>
            </div>

            {/* Product Grid */}
            <section className="py-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-3xl font-bold text-primary-dark mb-4 text-center">Katalog Buku</h2>
                    <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">Seri buku "Ayo Berhitung" dan "Aku Membaca Tanpa Mengeja" oleh Kaffah Education Partner</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((item) => (
                            <div key={item.id} className="group border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 bg-white">
                                <div className="bg-gray-50 h-[380px] flex items-center justify-center p-6 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-auto object-contain rounded-lg shadow-md group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-primary-dark mb-1">{item.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-extrabold text-accent">{item.price}</span>
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white font-semibold rounded-lg
                                                       hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-pointer"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="9" cy="21" r="1" />
                                                <circle cx="20" cy="21" r="1" />
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                            </svg>
                                            + Keranjang
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Paket Bundling */}
            <section className="py-20 px-6 bg-gray-100">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h2 className="text-3xl font-bold text-primary-dark mb-12">Paket Hemat Sekolah</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className={`bg-white px-8 py-12 rounded-2xl relative ${
                                    pkg.featured ? 'shadow-xl border-2 border-accent -mt-5' : 'shadow-md'
                                }`}
                            >
                                {pkg.badge && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-2 rounded-full text-sm font-bold">
                                        {pkg.badge}
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-primary-dark mb-4">{pkg.title}</h3>
                                <p className="text-gray-500 mb-8">{pkg.subtitle}</p>
                                <ul className="text-left mb-8 text-gray-500 space-y-2">
                                    {pkg.features.map((f, j) => (
                                        <li key={j}>✓ {f}</li>
                                    ))}
                                </ul>
                                <h2 className="text-2xl font-bold text-primary mb-8">{pkg.price}</h2>
                                {pkg.isKontak ? (
                                    <a
                                        href="/kontak"
                                        className={`block w-full py-3 text-center font-semibold rounded-lg transition-all duration-300 ${pkg.btnClass}`}
                                    >
                                        Konsultasi
                                    </a>
                                ) : (
                                    <button
                                        onClick={() => handleAddToCart(pkg)}
                                        className={`block w-full py-3 text-center font-semibold rounded-lg transition-all duration-300 cursor-pointer ${pkg.btnClass}`}
                                    >
                                        + Keranjang
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
