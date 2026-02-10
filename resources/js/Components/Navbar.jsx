import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    const navLinks = [
        { href: '/', label: 'Beranda' },
        { href: '/program-pelatihan', label: 'Program Pelatihan' },
        { href: '/buku-modul', label: 'Buku & Modul' },
        { href: '/portofolio', label: 'Portofolio' },
        { href: '/insight', label: 'Insight' },
        { href: '/tentang-kami', label: 'Tentang Kami' },
        { href: '/kontak', label: 'Kontak' },
    ];

    const isActive = (href) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-1000 py-4">
            <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2.5">
                    {/* K Icon */}
                    <div className="relative w-10 h-10 border-2 border-primary rounded flex items-center justify-center overflow-hidden">
                        <span className="text-xl font-extrabold text-primary leading-none" style={{ fontFamily: 'Georgia, serif' }}>K</span>
                        <div className="absolute bottom-0 right-0 w-0 h-0" style={{ borderLeft: '10px solid transparent', borderBottom: '10px solid #F05A28' }}></div>
                    </div>
                    {/* Text */}
                    <div className="leading-none">
                        <div className="text-lg font-extrabold text-primary tracking-wide" style={{ lineHeight: '1.1' }}>KAFFAH</div>
                        <div className="text-[10px] font-bold text-primary tracking-wider" style={{ lineHeight: '1.3' }}>EDUCATION</div>
                        <div className="text-[10px] font-bold text-accent tracking-wider" style={{ lineHeight: '1.3' }}>PARTNER</div>
                    </div>
                </Link>

                <button
                    className="md:hidden bg-transparent border-none text-2xl cursor-pointer text-primary"
                    aria-label="Toggle Menu"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>

                <nav
                    className={`
                        flex gap-8 items-center
                        max-md:fixed max-md:top-[70px] max-md:left-0 max-md:w-full max-md:bg-white
                        max-md:flex-col max-md:p-8 max-md:shadow-md max-md:transition-transform max-md:duration-300
                        ${isOpen ? 'max-md:translate-y-0' : 'max-md:-translate-y-[150%]'}
                    `}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`
                                font-medium relative transition-all duration-300
                                after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0
                                after:bg-accent after:transition-all after:duration-300
                                hover:text-primary hover:after:w-full
                                ${isActive(link.href) ? 'text-primary after:w-full' : 'text-gray-900'}
                            `}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/kontak"
                        className="inline-block px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg
                                   hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                    >
                        Ajukan Kerja Sama
                    </Link>
                </nav>
            </div>
        </header>
    );
}
