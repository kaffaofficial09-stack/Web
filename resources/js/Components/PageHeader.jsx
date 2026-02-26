import { Link } from '@inertiajs/react';

export default function PageHeader({ title, subtitle }) {
    return (
        <section className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20 md:py-24 px-6 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            </div>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }}></div>

            <div className="relative max-w-[1200px] mx-auto text-center">
                {/* Breadcrumb */}
                <div className="flex items-center justify-center gap-2 text-sm text-white/50 mb-6">
                    <Link href="/" className="hover:text-white/80 transition-colors">Beranda</Link>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    <span className="text-white/80">{title}</span>
                </div>

                <h1 className="text-white text-3xl md:text-5xl font-bold mb-5 animate-fade-up">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg md:text-xl max-w-[700px] mx-auto text-white/70 leading-relaxed animate-fade-up stagger-1">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-[30px] fill-white">
                    <path d="M0,60V30c200-30,400,10,600,0s400-30,600,0V60Z" />
                </svg>
            </div>
        </section>
    );
}
