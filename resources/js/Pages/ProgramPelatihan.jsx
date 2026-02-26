import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';
import PageHeader from '../Components/PageHeader';

export default function ProgramPelatihan() {
    const programs = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
            ),
            title: 'Standard Mutu Sekolah',
            desc: 'Pendampingan peningkatan mutu sekolah melalui standarisasi proses pembelajaran, manajemen sekolah, dan penjaminan mutu yang terukur sesuai standar nasional pendidikan.',
            accent: 'primary',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            ),
            title: 'Reformasi Kurikulum',
            desc: 'Penyusunan dan pengembangan kurikulum yang relevan dan inovatif, disesuaikan dengan kebutuhan sekolah dan tuntutan Kurikulum Merdeka.',
            accent: 'accent',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
            ),
            title: 'Matrikulasi',
            desc: 'Program penyetaraan kemampuan dasar siswa dalam literasi dan numerasi untuk memastikan kesiapan belajar di jenjang yang lebih tinggi.',
            accent: 'primary',
        },
    ];

    const metodologi = [
        { icon: '🎓', title: 'Workshop', desc: 'Penyampaian teori dan konsep dasar secara interaktif.' },
        { icon: '✍️', title: 'Praktik', desc: 'Simulasi mengajar (Micro-teaching) dan pembuatan perangkat.' },
        { icon: '💬', title: 'Diskusi', desc: 'Bedah kasus dan berbagi praktik baik antar peserta.' },
        { icon: '🤝', title: 'Pendampingan', desc: 'Monitoring implementasi di kelas pasca-pelatihan.' },
    ];

    const alur = [
        { step: '01', title: 'Konsultasi', desc: 'Diskusi awal untuk memetakan kebutuhan dan kondisi sekolah.', accent: false },
        { step: '02', title: 'Proposal', desc: 'Kami menyusun rancangan program dan anggaran sesuai kebutuhan.', accent: false },
        { step: '03', title: 'Pelaksanaan', desc: 'Eksekusi program pelatihan sesuai jadwal yang disepakati.', accent: false },
        { step: '04', title: 'Evaluasi', desc: 'Laporan hasil kegiatan dan rekomendasi tindak lanjut.', accent: true },
    ];

    return (
        <GuestLayout>
            <Head title="Program Pelatihan" />

            <PageHeader
                title="Program Training & Pendampingan"
                subtitle="Wujudkan VISI Sekolah Bersama Kaffa Edupart — Khusus SD/MI & SMP/MTS"
            />

            {/* 3 Program Pilar */}
            <section className="py-20 md:py-28 px-6 bg-warm-bg">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">Program Unggulan</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Program Training & Pendampingan</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Wujudkan VISI Sekolah Bersama Kaffa Edupart melalui tiga pilar program unggulan kami.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {programs.map((prog, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-2xl p-10 text-center border border-gray-100
                                           hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5
                                           transition-all duration-500 relative overflow-hidden"
                            >
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${prog.accent === 'accent' ? 'from-accent to-yellow-400' : 'from-primary to-primary-light'
                                    } scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>

                                <div className={`w-20 h-20 ${prog.accent === 'accent' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                                    } rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    {prog.icon}
                                </div>
                                <h3 className="text-xl font-bold text-primary-dark mb-4">{prog.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{prog.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimoni / Quote */}
            <section className="py-20 md:py-24 px-6">
                <div className="max-w-[800px] mx-auto text-center">
                    <div className="relative bg-white rounded-3xl p-12 md:p-16 shadow-xl shadow-primary/5 border border-gray-100">
                        {/* Decorative quote */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" /></svg>
                        </div>
                        <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-8 mt-4">
                            Telah membantu puluhan lembaga pendidikan keluar dari krisis jumlah siswa
                            melalui strategi pembenahan mutu yang terukur.
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Metodologi */}
            <section className="py-20 md:py-28 px-6 bg-warm-bg">
                <div className="max-w-[1200px] mx-auto text-center">
                    <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">Pendekatan Kami</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-16">Metodologi Pelatihan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {metodologi.map((item, i) => (
                            <div key={i} className="group bg-white rounded-2xl p-8 border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
                                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                <h3 className="text-xl font-bold text-primary-dark mb-3">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Alur Kerja Sama */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">Proses</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">Alur Kerja Sama</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {alur.map((item, i) => (
                            <div
                                key={i}
                                className={`relative bg-white p-8 rounded-2xl border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group`}
                            >
                                <div className={`text-4xl font-black mb-4 ${item.accent ? 'text-accent' : 'text-primary'} opacity-20`}>{item.step}</div>
                                <h4 className="font-bold text-primary-dark text-lg mb-2">{item.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>

                                {/* Connector arrow */}
                                {i < alur.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-gray-300">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 md:py-24 px-6 bg-gradient-to-br from-primary-dark via-primary to-primary-light text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl"></div>
                <div className="max-w-[700px] mx-auto relative">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Dapatkan Analysis Kebutuhan Sekolah Secara Gratis!</h2>
                    <p className="text-white/60 mb-10 text-lg">Tertarik dengan program kami? Hubungi kami untuk konsultasi awal tanpa biaya.</p>
                    <Link href="/kontak" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 text-lg">
                        Konsultasi Sekarang
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </Link>
                </div>
            </section>
        </GuestLayout>
    );
}
