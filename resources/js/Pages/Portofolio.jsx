import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';
import PageHeader from '../Components/PageHeader';

export default function Portofolio({ portfolios = [] }) {
    const stats = [
        { value: '50+', label: 'Sekolah Mitra' },
        { value: '2000+', label: 'Guru Terlatih' },
        { value: '5+', label: 'Tahun Pengalaman' },
    ];

    const fallbackGallery = [
        { img: 'https://images.unsplash.com/photo-1544531696-6052504f6392?w=600&q=80', title: 'Workshop Jakarta', description: 'Pelatihan Numerasi Dasar' },
        { img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80', title: 'Pendampingan Sekolah X', description: 'Implementasi Pojok Baca' },
        { img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80', title: 'Seminar Nasional', description: 'Peningkatan Mutu Guru' },
    ];

    const gallery = portfolios.length > 0 ? portfolios : fallbackGallery;

    return (
        <GuestLayout>
            <Head title="Portofolio" />
            <PageHeader title="Pengalaman Kerja Sama" subtitle="Jejak langkah kami dalam membangun kualitas pendidikan di berbagai daerah." />

            {/* Stats */}
            <section className="py-16 px-6 bg-warm-bg">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="text-4xl font-extrabold text-primary-dark">{s.value}</div>
                            <div className="text-gray-500 mt-2 text-sm">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Gallery */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">Galeri</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">Dokumentasi Kegiatan</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gallery.map((item, i) => (
                            <div key={item.id || i} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={item.image || item.img}
                                        alt={item.title}
                                        className="h-[220px] w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-primary-dark text-lg mb-1">{item.title}</h4>
                                    <p className="text-sm text-gray-500 mb-3">{item.description || item.desc}</p>
                                    {item.id && (
                                        <Link href={`/portofolio/${item.id}`} className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm hover:gap-3 transition-all duration-300">
                                            Lihat Detail
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
