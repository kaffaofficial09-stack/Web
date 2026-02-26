import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';
import PageHeader from '../Components/PageHeader';

export default function PortofolioDetail({ portfolio }) {
    return (
        <GuestLayout>
            <Head title={portfolio.title} />
            <PageHeader title="Portofolio" subtitle={portfolio.title} />

            <section className="py-16 md:py-24 px-6">
                <div className="max-w-[800px] mx-auto">
                    {/* Back link */}
                    <Link href="/portofolio" className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-8 hover:gap-3 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                        Kembali ke Portofolio
                    </Link>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-primary-dark leading-tight mb-6">{portfolio.title}</h1>

                    {/* Image */}
                    {portfolio.image && (
                        <div className="rounded-2xl overflow-hidden mb-8">
                            <img src={portfolio.image} alt={portfolio.title} className="w-full h-[400px] object-cover" />
                        </div>
                    )}

                    {/* Description */}
                    <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">{portfolio.description}</p>
                </div>
            </section>
        </GuestLayout>
    );
}
