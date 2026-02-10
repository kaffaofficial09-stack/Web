import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';

export default function Beranda() {
    return (
        <GuestLayout>
            <Head title="Solusi Literasi & Numerasi" />

            {/* Hero Section */}
            <section className="bg-linear-to-br from-blue-50 to-white py-32 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-dark leading-tight">
                                Membangun Generasi Cerdas Literasi & Numerasi
                            </h1>
                            <p className="text-lg text-gray-500 mb-8">
                                Mitra terpercaya lembaga pendidikan dalam meningkatkan kualitas pembelajaran dan kompetensi siswa melalui
                                pelatihan terukur dan buku berkualitas.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/program-pelatihan" className="inline-block px-7 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                                    Lihat Program Pelatihan
                                </Link>
                                <Link href="/kontak" className="inline-block px-7 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
                                    Hubungi Kami
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-primary-light w-full h-[400px] rounded-2xl opacity-10 absolute top-5 -right-5"></div>
                            <img
                                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Kegiatan Pendidikan"
                                className="rounded-2xl shadow-xl relative z-10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="py-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center max-w-[800px] mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-primary-dark mb-4">Tantangan Literasi & Numerasi Saat Ini</h2>
                        <p className="text-gray-500">Banyak lembaga pendidikan menghadapi kendala dalam implementasi kurikulum yang efektif.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Rendahnya Skor PISA', desc: 'Kemampuan literasi membaca dan matematika siswa Indonesia masih perlu ditingkatkan secara signifikan.', color: 'accent' },
                            { title: 'Metode Konvensional', desc: 'Pembelajaran yang monoton membuat siswa kurang tertarik untuk mendalami materi sains dan bahasa.', color: 'primary' },
                            { title: 'Minimnya Alat Bantu', desc: 'Kurangnya buku dan modul yang relevan dengan konteks kehidupan sehari-hari siswa.', color: 'accent' },
                        ].map((item, i) => (
                            <div key={i} className={`p-8 bg-white rounded-lg shadow-md border-t-4 ${item.color === 'accent' ? 'border-accent' : 'border-primary'}`}>
                                <h3 className="text-xl font-bold mb-4 text-primary-dark">{item.title}</h3>
                                <p className="text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solusi */}
            <section className="py-20 px-6 bg-gray-100">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary-dark">Solusi Komprehensif Kami</h2>
                        <p className="text-gray-500">Program Training & Pendampingan untuk hasil yang maksimal</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: '⚙️', title: 'Standard Mutu Sekolah', desc: 'Pendampingan peningkatan mutu sekolah melalui standarisasi proses pembelajaran dan manajemen.', link: '/program-pelatihan', linkText: 'Pelajari →' },
                            { icon: '📖', title: 'Reformasi Kurikulum', desc: 'Penyusunan dan pengembangan kurikulum yang relevan dan inovatif sesuai Kurikulum Merdeka.', link: '/program-pelatihan', linkText: 'Pelajari →' },
                            { icon: '🧮', title: 'Matrikulasi', desc: 'Program penyetaraan kemampuan dasar siswa dalam literasi dan numerasi.', link: '/program-pelatihan', linkText: 'Pelajari →' },
                            { icon: '📚', title: 'Buku & Modul', desc: 'Koleksi buku Ayo Berhitung dan Aku Membaca Tanpa Mengeja untuk pendukung pembelajaran.', link: '/buku-modul', linkText: 'Lihat Katalog →' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 p-8 text-center">
                                <div className="text-5xl mb-5">{item.icon}</div>
                                <h3 className="text-lg font-bold mb-2 text-primary-dark">{item.title}</h3>
                                <p className="text-gray-500 text-sm mb-6">{item.desc}</p>
                                <Link href={item.link} className="text-primary font-semibold text-sm hover:text-primary-dark transition-colors duration-300">
                                    {item.linkText}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Keunggulan */}
            <section className="py-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
                        <div className="space-y-8">
                            {[
                                { num: '1', title: 'Kurikulum Terstandarisasi', desc: 'Materi disusun oleh ahli pendidikan berpengalaman.' },
                                { num: '2', title: 'Metode Praktis', desc: 'Fokus pada 70% praktik dan 30% teori untuk hasil nyata.' },
                                { num: '3', title: 'Pendampingan Intensif', desc: 'Kami tidak hanya melatih, tapi mendampingi implementasi.' },
                                { num: '4', title: 'Fleksibel & Adaptif', desc: 'Program dapat disesuaikan dengan kebutuhan spesifik sekolah.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-[50px] h-[50px] bg-primary-light rounded-full flex items-center justify-center text-white font-bold shrink-0">
                                        {item.num}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary-dark">{item.title}</h4>
                                        <p className="text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-primary-dark mb-8">Mengapa Memilih Kaffah Education Partner?</h2>
                            <p className="text-gray-500 mb-8">
                                Kami berkomitmen memberikan dampak nyata bagi kualitas pendidikan di Indonesia. Pengalaman kami bekerja sama
                                dengan berbagai lembaga menjadi bukti dedikasi kami.
                            </p>
                            <img
                                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Teamwork"
                                className="rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Klien & Testimoni */}
            <section className="py-20 px-6 bg-primary-dark text-white">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-12">Dipercaya oleh Berbagai Lembaga</h2>
                    <div className="flex justify-center flex-wrap gap-12 mb-16 opacity-70">
                        {['SMP Harapan Bangsa', 'SD IT Insan Cendekia', 'Yayasan Pendidikan Al-Falah', 'Dinas Pendidikan Kota X'].map((name, i) => (
                            <div key={i} className="text-2xl font-bold">{name}</div>
                        ))}
                    </div>

                    <div className="max-w-[800px] mx-auto bg-white/10 p-12 rounded-2xl">
                        <p className="text-xl italic mb-6">
                            "Pelatihan dari Kaffah Education Partner sangat membuka wawasan guru-guru kami. Metode numerasi yang diajarkan sangat mudah dipahami siswa."
                        </p>
                        <h4 className="text-accent font-bold mb-0">Bpk. Ahmad Fauzi, M.Pd</h4>
                        <span className="text-sm opacity-80">Kepala Sekolah SD IT Insan Cendekia</span>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="bg-accent rounded-2xl p-16 text-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Siap Meningkatkan Kualitas Sekolah Anda?</h2>
                            <p className="text-lg mb-8 max-w-[600px] mx-auto">
                                Jadwalkan konsultasi gratis untuk memetakan kebutuhan literasi dan numerasi di lembaga Anda.
                            </p>
                            <Link href="/kontak" className="inline-block bg-white text-accent px-10 py-4 text-lg font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                                Konsultasi Program Sekarang
                            </Link>
                        </div>
                        <div className="absolute -top-[50px] -left-[50px] w-[200px] h-[200px] bg-white/20 rounded-full"></div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
