import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';

export default function Beranda() {
    const mitraSD = [
        'MI Pembangunan Kucur Lamongan',
        'MI Al Jihad Brondong Lamongan',
        'MI Darul Ulum Brondong Lamongan',
        'MI Islamiyah Brondong',
        'MI Al Aminah Brondong',
        'MI Maslakul Huda Paciran Lamongan',
        'MI Islamiyah Suberwudi Lamongan',
        'MI Al Mukhlisin Karanggeneng Lamongan',
        'MI Islam Kalitengah Lamongan',
        'MI Islamiyah Nguwok Babat Lamongan',
        'MI Islamiyah Kedungmegarih Kembangbahu Lamongan',
        'MI Miftahul Ulum Wringinanom Gresik',
        'MI Darul Muta\'allimin Patianrowo Nganjuk',
        'MI Al Azhaar Bandung Tulungagung',
        'MI Taman Qur\'an Bandung Tulungagung',
        'SD Hasyim As\'ary Cisarua Bogor',
        'SD Tahfidz Assa\'adah Sangata Kaltim',
        'SD Ya Bunayya Pujon Malang',
        'MI Islamiyah Puter Lamongan',
        'MI Nurul Ulum Tikung Lamongan',
        'MI Al Hidayah Deket Lamongan',
    ];

    const mitraSMP = [
        'SMP Cahaya Qur\'an IBS Tritunggal Babat',
        'SMP Darul Hikam IBS Karangbinangun Lamongan',
        'SMP NU Brondong',
        'SMP Sains Al Ishlah IBS Bandarkidul Kediri',
        'SMP Sains Al Furqon IBS Penggung Boyolali',
        'SMP Al Azhaar Bandung Tulungagung',
        'MTs. Al Huda Bandung Tulungagung',
        'SMP Sains Roudhotun Nafi\'iyah (Rouna) IBS Gempol Pasuruan',
    ];

    const rasionalisasi = [
        {
            num: '01',
            title: 'Kendala Standar Mutu',
            desc: 'Banyak lembaga belum mampu menerjemahkan visi, program dijalankan hanya berdasarkan tren, dan tidak memiliki manual program.',
            color: 'from-accent/10 to-accent/5',
            border: 'border-accent/20',
            numColor: 'text-accent',
        },
        {
            num: '02',
            title: 'Tantangan Kurikulum',
            desc: 'Kebijakan kurikulum sering berubah dan kepadatan materi membuat capaian belajar siswa melambat.',
            color: 'from-primary/10 to-primary/5',
            border: 'border-primary/20',
            numColor: 'text-primary',
        },
        {
            num: '03',
            title: 'Metode Pengajaran',
            desc: 'Tradisi mengajar yang terpaku pada satu buku paket/LKS dengan hasil belajar yang hanya diukur melalui tes tertulis.',
            color: 'from-accent/10 to-accent/5',
            border: 'border-accent/20',
            numColor: 'text-accent',
        },
        {
            num: '04',
            title: 'Kelemahan Dasar',
            desc: 'Fakta rendahnya kemampuan dasar siswa dalam membaca dan berhitung, serta pendidikan karakter yang belum efektif.',
            color: 'from-primary/10 to-primary/5',
            border: 'border-primary/20',
            numColor: 'text-primary',
        },
    ];

    const pilar = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
            ),
            title: 'Pelatihan Standar Mutu Sekolah',
            desc: 'Mengarahkan lembaga mencapai visi dengan hasil berupa manual program yang efektif.',
            link: '/program-pelatihan',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            ),
            title: 'Pelatihan Reformulasi Kurikulum',
            desc: 'Membantu lembaga memiliki Kurikulum Satuan Pendidikan (KSP) yang simpel dan efektif sesuai kebutuhan siswa.',
            link: '/program-pelatihan',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
            ),
            title: 'Pelatihan Program Matrikulasi',
            desc: 'Membekali siswa basic knowledge dan basic character (akhlak mulia) untuk memudahkan guru mengantar siswa mencapai prestasi.',
            link: '/program-pelatihan',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            ),
            title: 'Modul Matrikulasi',
            desc: 'Menyediakan modul pendukung matrikulasi untuk tingkat SD/MI dan SMP/MTs.',
            link: '/buku-modul',
        },
    ];

    return (
        <GuestLayout>
            <Head title="Beranda — Kaffah Education Partner" />

            {/* ═══════════════════ HERO ═══════════════════ */}
            <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
                {/* Decorative orbs */}
                <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-pulse-soft"></div>
                <div className="absolute bottom-10 left-[5%] w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl animate-pulse-soft stagger-3"></div>

                {/* Dot grid */}
                <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
                    backgroundSize: '40px 40px'
                }}></div>

                <div className="relative max-w-[1200px] mx-auto px-6 pt-20 pb-32 md:pt-0 md:pb-36">
                    <div className="max-w-[720px]">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
                            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                            <span className="text-white/80 text-sm font-medium">Khusus SD/MI & SMP/MTs</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6 animate-fade-up stagger-1">
                            Mitra Sekolah /<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-400">
                                Madrasah Berkualitas
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-[600px] animate-fade-up stagger-2">
                            Membantu Lembaga Pendidikan mencapai visinya melalui standarisasi mutu,
                            kurikulum yang efektif, dan penguatan karakter siswa.
                        </p>

                        <div className="flex flex-wrap gap-4 animate-fade-up stagger-3">
                            <Link
                                href="/program-pelatihan"
                                className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-white font-semibold rounded-full
                                           hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5
                                           transition-all duration-300 text-base"
                            >
                                Lihat Program Pelatihan
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                            </Link>
                            <a
                                href="https://wa.me/6281220745064?text=Halo%20KEP,%20saya%20ingin%20konsultasi%20mengenai%20program%20pendampingan."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 backdrop-blur-sm border border-white/25
                                           text-white font-semibold rounded-full
                                           hover:bg-white/20 hover:-translate-y-0.5
                                           transition-all duration-300 text-base"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                Konsultasi Sekarang
                            </a>
                        </div>

                        {/* Trust bar */}
                        <div className="mt-14 flex items-center gap-6 animate-fade-up stagger-4">
                            <div className="flex -space-x-3">
                                {['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'].map((c, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-primary-dark flex items-center justify-center text-white text-xs font-bold" style={{ background: c }}>
                                        {['MI', 'SD', 'SP', 'MT'][i]}
                                    </div>
                                ))}
                            </div>
                            <div className="text-white/60 text-sm">
                                <span className="text-white font-semibold">{mitraSD.length + mitraSMP.length}+</span> lembaga pendidikan telah bermitra
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom wave */}
                <div className="absolute bottom-0 left-0 w-full leading-none">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[70px] fill-white block">
                        <path d="M0,120V60c200-50,400,20,600,10s400-50,600,10V120Z" />
                    </svg>
                </div>
            </section>

            {/* ═══════════════════ RASIONALISASI ═══════════════════ */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">Rasionalisasi</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4 text-balance">
                            Mengapa Sekolah Membutuhkan Kami?
                        </h2>
                        <p className="text-gray-500 max-w-[600px] mx-auto">
                            Banyak lembaga pendidikan menghadapi tantangan fundamental yang menghambat pencapaian visi dan kualitas pembelajaran.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {rasionalisasi.map((item, i) => (
                            <div
                                key={i}
                                className={`relative bg-gradient-to-br ${item.color} rounded-2xl p-8 border ${item.border}
                                           hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group`}
                            >
                                <span className={`text-5xl font-black ${item.numColor} opacity-15 absolute top-4 right-6 select-none`}>
                                    {item.num}
                                </span>
                                <div className={`text-2xl font-black ${item.numColor} mb-4`}>{item.num}</div>
                                <h3 className="text-lg font-bold text-primary-dark mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════ PRODUK & LAYANAN ═══════════════════ */}
            <section className="py-20 md:py-28 px-6 bg-warm-bg">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">Layanan Kami</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                            4 Pilar Utama Kaffah Education Partner
                        </h2>
                        <p className="text-gray-500 max-w-[600px] mx-auto">
                            Program komprehensif untuk membantu lembaga pendidikan mencapai standar mutu terbaik.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pilar.map((item, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-2xl p-8 border border-gray-100
                                           hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5
                                           transition-all duration-500 text-center relative overflow-hidden"
                            >
                                {/* Hover accent line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent group-hover:scale-110 transition-transform duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-base font-bold text-primary-dark mb-3 leading-snug">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                                <Link
                                    href={item.link}
                                    className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm hover:text-accent-hover transition-colors duration-300 group/link"
                                >
                                    Pelajari
                                    <svg className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════ MITRA LEMBAGA ═══════════════════ */}
            <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>

                <div className="relative max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">Lembaga Mitra KEP</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Dipercaya oleh Puluhan Lembaga Pendidikan</h2>
                        <p className="text-white/50 max-w-[600px] mx-auto">
                            Kami bangga telah bermitra dengan {mitraSD.length + mitraSMP.length}+ lembaga pendidikan di seluruh Indonesia.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* MI / SD */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Tingkat MI / SD</h3>
                                    <span className="text-white/40 text-sm">{mitraSD.length} lembaga</span>
                                </div>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                                {mitraSD.map((name, i) => (
                                    <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-snug">
                                        <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-1.5"></span>
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* MTs / SMP */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Tingkat MTs / SMP</h3>
                                    <span className="text-white/40 text-sm">{mitraSMP.length} lembaga</span>
                                </div>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                                {mitraSMP.map((name, i) => (
                                    <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-snug">
                                        <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-1.5"></span>
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ CTA ═══════════════════ */}
            <section className="py-20 md:py-28 px-6 bg-warm-bg relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl"></div>

                <div className="relative max-w-[700px] mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-5 text-balance">
                        Siap Meningkatkan Kualitas Sekolah Anda?
                    </h2>
                    <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                        Jadwalkan konsultasi gratis untuk memetakan kebutuhan spesifik lembaga Anda bersama tim ahli kami.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/kontak"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-full
                                       hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5
                                       transition-all duration-300 text-lg"
                        >
                            Konsultasi Gratis
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </Link>
                        <a
                            href="https://wa.me/6281220745064"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full border-2 border-primary/10
                                       hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5
                                       transition-all duration-300 text-lg"
                        >
                            <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
