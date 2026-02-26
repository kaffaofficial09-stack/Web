import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';
import PageHeader from '../Components/PageHeader';

export default function InsightDetail({ insight }) {
    const formatDate = (str) => new Date(str).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
    });

    return (
        <GuestLayout>
            <Head title={insight.title} />
            <PageHeader title="Insight Pendidikan" subtitle={insight.title} />

            <section className="py-16 md:py-24 px-6">
                <div className="max-w-[800px] mx-auto">
                    {/* Back link */}
                    <Link href="/insight" className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-8 hover:gap-3 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                        Kembali ke Insight
                    </Link>

                    {/* Category + Date */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">{insight.category}</span>
                        <span className="text-sm text-gray-400">{formatDate(insight.created_at)}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark leading-tight mb-6">{insight.title}</h1>

                    {/* Image */}
                    {insight.image && (
                        <div className="rounded-2xl overflow-hidden mb-8">
                            <img src={insight.image} alt={insight.title} className="w-full h-[400px] object-cover" />
                        </div>
                    )}

                    {/* Description */}
                    <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium">{insight.description}</p>

                    {/* Content */}
                    {insight.content && (
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                            {insight.content}
                        </div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
