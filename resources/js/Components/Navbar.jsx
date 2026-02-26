import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Beranda' },
        { href: '/program-pelatihan', label: 'Program' },
        { href: '/buku-modul', label: 'Buku & Modul' },
        { href: '/portofolio', label: 'Portofolio' },
        { href: '/insight', label: 'Insight' },
        { href: '/tentang-kami', label: 'Tentang' },
        { href: '/kontak', label: 'Kontak' },
    ];

    const isActive = (href) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    return (
        <header
            className={`sticky top-0 z-1000 transition-all duration-500 overflow-visible ${scrolled
                ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5'
                : 'bg-white shadow-sm'
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center h-16">
                {/* Logo — overflows the navbar */}
                <Link href="/" className="relative flex items-center group" style={{ zIndex: 10 }}>
                    <img
                        src="/img/logo_new.png"
                        alt="Kaffah Education Partner"
                        className={`transition-all duration-300 ${scrolled ? 'h-16' : 'h-24'}`}
                        style={{ marginTop: scrolled ? '0px' : '12px' }}
                    />
                </Link>

                <button
                    className="md:hidden bg-transparent border-none text-2xl cursor-pointer text-primary p-2"
                    aria-label="Toggle Menu"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        {isOpen ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </>
                        )}
                    </svg>
                </button>

                <nav
                    className={`
                        flex gap-1 items-center
                        max-md:fixed max-md:top-0 max-md:right-0 max-md:h-full max-md:w-[280px]
                        max-md:bg-white max-md:flex-col max-md:p-8 max-md:pt-20
                        max-md:shadow-2xl max-md:transition-transform max-md:duration-500 max-md:ease-out
                        ${isOpen ? 'max-md:translate-x-0' : 'max-md:translate-x-full'}
                    `}
                >
                    {/* Close btn in mobile */}
                    <button
                        className="hidden max-md:block absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`
                                px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                                max-md:w-full max-md:px-4 max-md:py-3 max-md:text-base
                                ${isActive(link.href)
                                    ? 'text-accent bg-accent/5 font-semibold'
                                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                                }
                            `}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/kontak"
                        className="ml-2 max-md:ml-0 max-md:mt-4 inline-block px-5 py-2.5 text-sm font-semibold
                                   bg-gradient-to-r from-accent to-[#e04a18] text-white rounded-full
                                   hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5
                                   transition-all duration-300 max-md:w-full max-md:text-center"
                        onClick={() => setIsOpen(false)}
                    >
                        Ajukan Kerja Sama
                    </Link>
                </nav>

                {/* Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 z-[-1] md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </div>
        </header>
    );
}
