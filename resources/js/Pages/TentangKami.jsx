import { Head } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';
import PageHeader from '../Components/PageHeader';

export default function TentangKami() {
    const team = [
        { img: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'Budi Santoso', role: 'Founder & CEO' },
        { img: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Siti Aminah', role: 'Direktur Program' },
        { img: 'https://randomuser.me/api/portraits/men/65.jpg', name: 'Reza Pratama', role: 'Manajer Pemasaran' },
    ];

    return (
        <GuestLayout>
            <Head title="Tentang Kami" />

            <PageHeader
                title="Tentang Kami"
                subtitle="Mengenal lebih dekat Kaffah Education Partner"
            />

            {/* Company Profile */}
            <section className="py-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
                        <div>
                            <h2 className="text-3xl font-bold text-primary-dark mb-6">Siapa Kami?</h2>
                            <p className="text-gray-500 mb-4">
                                Kaffah Education Partner adalah perusahaan konsultan pendidikan yang berdedikasi untuk
                                meningkatkan kualitas pembelajaran di Indonesia. Kami fokus pada pengembangan kompetensi
                                dasar siswa, yakni literasi dan numerasi.
                            </p>
                            <p className="text-gray-500">
                                Sejak didirikan, kami telah bermitra dengan puluhan lembaga pendidikan, baik negeri maupun
                                swasta, untuk menghadirkan solusi pelatihan yang praktis, relevan, dan berdampak.
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Office Culture"
                                className="rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Visi & Misi */}
            <section className="py-20 px-6 bg-gray-100">
                <div className="max-w-[1200px] mx-auto text-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-primary mb-4">Visi</h3>
                            <p className="italic text-gray-700">
                                "Menjadi mitra terdepan dalam mencetak generasi emas Indonesia yang unggul dalam literasi dan numerasi."
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <h3 className="text-xl font-bold text-primary mb-4">Misi</h3>
                            <ul className="text-left text-gray-500 list-disc pl-6 space-y-2">
                                <li>Menyediakan program pelatihan guru yang berkualitas.</li>
                                <li>Menerbitkan buku dan modul ajar yang inovatif.</li>
                                <li>Mendampingi sekolah dalam implementasi kurikulum.</li>
                                <li>Membangun ekosistem pendidikan yang kolaboratif.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-3xl font-bold text-primary-dark text-center mb-12">Tim Kami</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                        {team.map((member, i) => (
                            <div key={i}>
                                <div className="w-[150px] h-[150px] rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-bold text-primary-dark">{member.name}</h4>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
