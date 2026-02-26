import { Head } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';
import PageHeader from '../Components/PageHeader';

export default function TentangKami() {
    const team = [
        { img: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'Budi Santoso', role: 'Founder & CEO' },
        { img: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Siti Aminah', role: 'Direktur Program' },
        { img: 'https://randomuser.me/api/portraits/men/65.jpg', name: 'Reza Pratama', role: 'Manajer Pemasaran' },
    ];

    const stats = [
        {
            value: '50+', label: 'Lembaga Mitra', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" /></svg>
            )
        },
        {
            value: '2000+', label: 'Guru Terlatih', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
            )
        },
        {
            value: '5+', label: 'Tahun Pengalaman', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
            )
        },
        {
            value: '10+', label: 'Program Aktif', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
            )
        },
    ];

    return (
        <GuestLayout>
            <Head title="Tentang Kami" />

            <PageHeader
                title="Tentang Kami"
                subtitle="Mengenal lebih dekat Kaffah Education Partner"
            />

            {/* Stats bar */}
            <section className="py-16 px-6 bg-warm-bg">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((s, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-accent">
                                    {s.icon}
                                </div>
                                <div className="text-3xl font-extrabold text-primary-dark">{s.value}</div>
                                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Profile */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
                        <div>
                            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">Profil</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">Siapa Kami?</h2>
                            <p className="text-gray-600 mb-5 leading-relaxed">
                                Kaffah Education Partner adalah perusahaan konsultan pendidikan yang berdedikasi untuk
                                meningkatkan kualitas pembelajaran di Indonesia. Kami fokus pada pengembangan kompetensi
                                dasar siswa, yakni literasi dan numerasi.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Sejak didirikan, kami telah bermitra dengan puluhan lembaga pendidikan, baik negeri maupun
                                swasta, untuk menghadirkan solusi pelatihan yang praktis, relevan, dan berdampak.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl -z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Office Culture"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Visi & Misi */}
            <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl"></div>
                <div className="relative max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">Filosofi</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Visi & Misi</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/10">
                            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Visi</h3>
                            <p className="text-white/70 italic text-lg leading-relaxed">
                                "Menjadi mitra terdepan dalam mencetak generasi emas Indonesia yang unggul dalam literasi dan numerasi."
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/10">
                            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Misi</h3>
                            <ul className="space-y-3">
                                {[
                                    'Menyediakan program pelatihan guru yang berkualitas.',
                                    'Menerbitkan buku dan modul ajar yang inovatif.',
                                    'Mendampingi sekolah dalam implementasi kurikulum.',
                                    'Membangun ekosistem pendidikan yang kolaboratif.',
                                ].map((m, j) => (
                                    <li key={j} className="flex items-start gap-3 text-white/70">
                                        <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2"></span>
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">Tim</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">Tim Kami</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {team.map((member, i) => (
                            <div key={i} className="group bg-white rounded-2xl p-8 text-center border border-gray-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-500"></div>
                                    <img src={member.img} alt={member.name} className="relative w-full h-full rounded-full object-cover border-4 border-white" />
                                </div>
                                <h4 className="font-bold text-primary-dark text-lg">{member.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
