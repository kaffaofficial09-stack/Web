import { Head } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';
import PageHeader from '../Components/PageHeader';

export default function Insight({ insights = [] }) {
    // Fallback articles when no DB data yet
    const fallbackArticles = [
        {
            img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'LITERASI',
            title: '5 Tren Pendidikan di Tahun 2024 yang Wajib Diketahui Guru',
            description: 'Digitalisasi dan personalisasi pembelajaran menjadi kunci utama...',
        },
        {
            img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'STRATEGI MENGAJAR',
            title: 'Strategi Ampuh Mengajar Generasi Alpha',
            description: 'Pendekatan visual dan interaktif lebih disukai siswa saat ini daripada metode ceramah konvensional...',
        },
        {
            img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            category: 'NUMERASI',
            title: 'Mengapa Numerasi Bukan Sekadar Berhitung?',
            description: 'Membongkar miskonsepsi tentang matematika. Numerasi adalah tentang logika berpikir...',
        },
    ];

    const articles = insights.length > 0 ? insights : fallbackArticles;

    return (
        <GuestLayout>
            <Head title="Insight Pendidikan" />

            <PageHeader
                title="Insight Pendidikan"
                subtitle="Artikel, tips, dan wawasan terkini seputar dunia pendidikan, literasi, dan numerasi."
            />

            {/* Blog Grid */}
            <section className="py-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {articles.map((article, i) => (
                            <div key={article.id || i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 transition-all duration-300">
                                <img
                                    src={article.image || article.img || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'}
                                    alt={article.title}
                                    className="h-[200px] w-full object-cover"
                                />
                                <div className="p-8">
                                    <div className="text-xs text-accent font-bold mb-2">{article.category}</div>
                                    <h3 className="text-lg font-bold text-primary-dark mb-4">{article.title}</h3>
                                    <p className="text-gray-500 mb-6">{article.description || article.desc}</p>
                                    <span className="text-primary font-semibold">
                                        Baca Selengkapnya →
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
