import { Head, Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';
import PageHeader from '../Components/PageHeader';

export default function ProgramPelatihan() {
    return (
        <GuestLayout>
            <Head title="Program Pelatihan" />

            <PageHeader
                title="Program Training & Pendampingan"
                subtitle="Wujudkan VISI Sekolah Bersama Kaffa Edupart — Khusus SD/MI & SMP/MTS"
            />


            {/* 3 Program Pilar */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary-dark mb-4">Program Training & Pendampingan</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Wujudkan VISI Sekolah Bersama Kaffa Edupart melalui tiga pilar program unggulan kami.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Standard Mutu Sekolah */}
                        <div className="bg-white rounded-2xl p-10 text-center shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border-t-4 border-primary">
                            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">⚙️</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary-dark mb-4">Standard Mutu Sekolah</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Pendampingan peningkatan mutu sekolah melalui standarisasi proses pembelajaran,
                                manajemen sekolah, dan penjaminan mutu yang terukur sesuai standar nasional pendidikan.
                            </p>
                        </div>

                        {/* Reformasi Kurikulum */}
                        <div className="bg-white rounded-2xl p-10 text-center shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border-t-4 border-accent">
                            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">📖</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary-dark mb-4">Reformasi Kurikulum</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Penyusunan dan pengembangan kurikulum yang relevan dan inovatif,
                                disesuaikan dengan kebutuhan sekolah dan tuntutan Kurikulum Merdeka.
                            </p>
                        </div>

                        {/* Matrikulasi */}
                        <div className="bg-white rounded-2xl p-10 text-center shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border-t-4 border-primary">
                            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">🧮</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary-dark mb-4">Matrikulasi</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Program penyetaraan kemampuan dasar siswa dalam literasi dan numerasi
                                untuk memastikan kesiapan belajar di jenjang yang lebih tinggi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimoni / Quote */}
            <section className="py-20 px-6">
                <div className="max-w-[800px] mx-auto text-center">
                    <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
                        <div className="text-5xl text-accent mb-6">"</div>
                        <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-8">
                            Telah membantu puluhan lembaga pendidikan keluar dari krisis jumlah siswa
                            melalui strategi pembenahan mutu yang terukur.
                        </p>
                        <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Metodologi */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h2 className="text-3xl font-bold text-primary-dark mb-16">Metodologi Pelatihan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: '🎓', title: 'Workshop', desc: 'Penyampaian teori dan konsep dasar secara interaktif.' },
                            { icon: '✍️', title: 'Praktik', desc: 'Simulasi mengajar (Micro-teaching) dan pembuatan perangkat.' },
                            { icon: '💬', title: 'Diskusi', desc: 'Bedah kasus dan berbagi praktik baik antar peserta.' },
                            { icon: '🤝', title: 'Pendampingan', desc: 'Monitoring implementasi di kelas pasca-pelatihan.' },
                        ].map((item, i) => (
                            <div key={i} className="p-8">
                                <div className="text-5xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-primary-dark mb-2">{item.title}</h3>
                                <p className="text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Alur Kerja Sama */}
            <section className="py-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-3xl font-bold text-primary-dark text-center mb-16">Alur Kerja Sama</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            { num: '1. Konsultasi', desc: 'Diskusi awal untuk memetakan kebutuhan dan kondisi sekolah.', accent: false },
                            { num: '2. Proposal', desc: 'Kami menyusun rancangan program dan anggaran sesuai kebutuhan.', accent: false },
                            { num: '3. Pelaksanaan', desc: 'Eksekusi program pelatihan sesuai jadwal yang disepakati.', accent: false },
                            { num: '4. Evaluasi', desc: 'Laporan hasil kegiatan dan rekomendasi tindak lanjut.', accent: true },
                        ].map((item, i) => (
                            <div key={i} className={`flex-1 min-w-[250px] bg-white p-8 rounded-lg shadow-sm border-l-[5px] ${item.accent ? 'border-accent' : 'border-primary'}`}>
                                <h4 className="font-bold text-primary-dark mb-2">{item.num}</h4>
                                <p className="text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-primary text-center">
                <div className="max-w-[800px] mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">Dapatkan Analysis Kebutuhan Sekolah Secara Gratis!</h2>
                    <p className="text-white/80 mb-8">Tertarik dengan program kami? Hubungi kami untuk konsultasi awal tanpa biaya.</p>
                    <Link href="/kontak" className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 text-lg">
                        Konsultasi Sekarang
                    </Link>
                </div>
            </section>
        </GuestLayout>
    );
}
