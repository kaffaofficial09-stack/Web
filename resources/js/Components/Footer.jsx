import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-primary-dark text-white pt-16 pb-8">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="text-2xl font-bold mb-4">Kaffah Education Partner</div>
                        <p className="text-white/70">
                            Mitra strategis pengembangan pendidikan Indonesia melalui literasi dan numerasi.
                        </p>
                    </div>

                    {/* Program */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Program</h4>
                        <ul className="space-y-3">
                            <li><Link href="/program-pelatihan" className="text-white/80 hover:text-accent transition-colors duration-300">Pelatihan Literasi</Link></li>
                            <li><Link href="/program-pelatihan" className="text-white/80 hover:text-accent transition-colors duration-300">Pelatihan Numerasi</Link></li>
                            <li><Link href="/buku-modul" className="text-white/80 hover:text-accent transition-colors duration-300">Buku & Modul</Link></li>
                        </ul>
                    </div>

                    {/* Perusahaan */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Perusahaan</h4>
                        <ul className="space-y-3">
                            <li><Link href="/tentang-kami" className="text-white/80 hover:text-accent transition-colors duration-300">Tentang Kami</Link></li>
                            <li><Link href="/portofolio" className="text-white/80 hover:text-accent transition-colors duration-300">Portofolio</Link></li>
                            <li><Link href="/insight" className="text-white/80 hover:text-accent transition-colors duration-300">Insight Pendidikan</Link></li>
                            <li><Link href="/kontak" className="text-white/80 hover:text-accent transition-colors duration-300">Kontak</Link></li>
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
                        <ul className="space-y-3">
                            <li><a href="tel:+6281220745064" className="text-white/80 hover:text-accent transition-colors duration-300">+62 812-2074-5064</a></li>
                            <li><a href="mailto:info@kaffah-education.com" className="text-white/80 hover:text-accent transition-colors duration-300">info@kaffah-education.com</a></li>
                            <li><span className="text-white/80">Jl. Pendidikan No. 123, Jakarta</span></li>
                        </ul>
                        <div className="flex gap-4 mt-4">
                            <a href="#" className="bg-white/10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-300">IG</a>
                            <a href="#" className="bg-white/10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-300">FB</a>
                            <a href="#" className="bg-white/10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-300">LI</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
                    &copy; 2024 Kaffah Education Partner. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
