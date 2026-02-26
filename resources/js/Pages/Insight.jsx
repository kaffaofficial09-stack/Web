import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';
import PageHeader from '../Components/PageHeader';

export default function Insight({ insights = [] }) {
    const fallbackArticles = [
        {
            img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
            category: 'LITERASI',
            title: '5 Tren Pendidikan di Tahun 2024 yang Wajib Diketahui Guru',
            description: 'Digitalisasi dan personalisasi pembelajaran menjadi kunci utama...',
            date: '15 Jan 2024',
            readTime: '5 menit',
        },
        {
            img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80',
            category: 'STRATEGI MENGAJAR',
            title: 'Strategi Ampuh Mengajar Generasi Alpha',
            description: 'Pendekatan visual dan interaktif lebih disukai siswa saat ini...',
            date: '10 Jan 2024',
            readTime: '4 menit',
        },
        {
            img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
            category: 'NUMERASI',
            title: 'Mengapa Numerasi Bukan Sekadar Berhitung?',
            description: 'Membongkar miskonsepsi tentang matematika. Numerasi adalah tentang logika berpikir...',
            date: '5 Jan 2024',
            readTime: '6 menit',
        },
    ];

    const articles = insights.length > 0 ? insights : fallbackArticles;

    return (
        <GuestLayout>
            <Head title="Insight Pendidikan" />
            <PageHeader title="Insight Pendidikan" subtitle="Artikel, tips, dan wawasan terkini seputar dunia pendidikan, literasi, dan numerasi." />

            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {articles.map((article, i) => (
                            <article key={article.id || i} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={article.image || article.img}
                                        alt={article.title}
                                        className="h-[200px] w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-7">
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                        <span>{article.date || 'Jan 2024'}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span>{article.readTime || '5 menit'}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-primary-dark mb-3 leading-snug group-hover:text-accent transition-colors duration-300">{article.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{article.description || article.desc}</p>
                                    <Link href={article.id ? `/insight/${article.id}` : '#'} className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                                        Baca Selengkapnya
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
