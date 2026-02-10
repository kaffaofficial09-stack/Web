import { Head } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';
import PageHeader from '../Components/PageHeader';

export default function Portofolio({ portfolios = [] }) {
    const stats = [
        { value: '50+', label: 'Sekolah Mitra', color: 'text-accent' },
        { value: '2000+', label: 'Guru Terlatih', color: 'text-primary' },
        { value: '5+', label: 'Tahun Pengalaman', color: 'text-accent' },
    ];

    // Fallback gallery when no DB data yet
    const fallbackGallery = [
        { img: 'https://images.unsplash.com/photo-1544531696-6052504f6392?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Workshop Jakarta', description: 'Pelatihan Numerasi Dasar' },
        { img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Pendampingan Sekolah X', description: 'Implementasi Pojok Baca' },
        { img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Seminar Nasional', description: 'Peningkatan Mutu Guru' },
    ];

    const gallery = portfolios.length > 0 ? portfolios : fallbackGallery;

    return (
        <GuestLayout>
            <Head title="Portofolio" />

            <PageHeader
                title="Pengalaman Kerja Sama"
                subtitle="Jejak langkah kami dalam membangun kualitas pendidikan di berbagai daerah."
            />

            {/* Stats */}
            <section className="py-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                        {stats.map((s, i) => (
                            <div key={i} className="p-8 rounded-lg bg-gray-50">
                                <div className={`text-5xl font-extrabold ${s.color}`}>{s.value}</div>
                                <div className="text-gray-500 mt-2">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-20 px-6 bg-gray-100">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-3xl font-bold text-primary-dark text-center mb-12">Dokumentasi Kegiatan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gallery.map((item, i) => (
                            <div key={item.id || i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300">
                                <img
                                    src={item.image || item.img || 'https://images.unsplash.com/photo-1544531696-6052504f6392?w=600'}
                                    alt={item.title}
                                    className="h-[200px] w-full object-cover"
                                />
                                <div className="p-4">
                                    <h4 className="font-bold text-primary-dark">{item.title}</h4>
                                    <p className="text-sm text-gray-500">{item.description || item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
