import { Head } from '@inertiajs/react';
import { useState } from 'react';
import GuestLayout from '../Layouts/GuestLayout';
import PageHeader from '../Components/PageHeader';

export default function Kontak() {
    const [form, setForm] = useState({ nama: '', lembaga: '', email: '', whatsapp: '', pesan: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const message = `Halo, saya ingin menghubungi Kaffah Education Partner.

*Nama:* ${form.nama}
*Lembaga:* ${form.lembaga || '-'}
*Email:* ${form.email}
*WhatsApp:* ${form.whatsapp}

*Pesan:*
${form.pesan || '-'}`;

        const waUrl = `https://wa.me/6281220745064?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');

        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setForm({ nama: '', lembaga: '', email: '', whatsapp: '', pesan: '' });
    };

    return (
        <GuestLayout>
            <Head title="Hubungi Kami" />

            <PageHeader
                title="Hubungi Kami"
                subtitle="Mari berdiskusi tentang bagaimana kami dapat membantu sekolah Anda berkembang."
            />

            {/* Contact Section */}
            <section className="py-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-bold text-primary-dark mb-8">Informasi Kontak</h2>

                            <div className="flex gap-4 mb-6">
                                <div className="text-2xl text-primary">📍</div>
                                <div>
                                    <h4 className="font-bold text-primary-dark mb-2">Alamat</h4>
                                    <p className="text-gray-500">Jl. Pendidikan No. 123, Kelurahan Semangat, Jakarta Selatan, DKI Jakarta 12345</p>
                                </div>
                            </div>

                            <div className="flex gap-4 mb-6">
                                <div className="text-2xl text-primary">📞</div>
                                <div>
                                    <h4 className="font-bold text-primary-dark mb-2">Telepon / WhatsApp</h4>
                                    <p className="text-gray-500">+62 812-3456-7890</p>
                                </div>
                            </div>

                            <div className="flex gap-4 mb-6">
                                <div className="text-2xl text-primary">✉️</div>
                                <div>
                                    <h4 className="font-bold text-primary-dark mb-2">Email</h4>
                                    <p className="text-gray-500">info@kaffah-education.com</p>
                                </div>
                            </div>

                            <div className="mt-12">
                                <h4 className="font-bold text-primary-dark mb-4">Ikuti Kami</h4>
                                <div className="flex gap-4">
                                    <a href="#" className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-dark transition-colors duration-300">IG</a>
                                    <a href="#" className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-dark transition-colors duration-300">FB</a>
                                    <a href="#" className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-dark transition-colors duration-300">LI</a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h3 className="text-xl font-bold text-primary-dark mb-6">Kirim Pesan</h3>

                            {submitted && (
                                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
                                    Terima kasih! Pesan Anda telah kami terima.
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium text-gray-700">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        placeholder="Nama Anda"
                                        value={form.nama}
                                        onChange={(e) => setForm({ ...form, nama: e.target.value })}
                                        className="w-full px-3 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium text-gray-700">Nama Lembaga / Sekolah</label>
                                    <input
                                        type="text"
                                        placeholder="Nama Sekolah"
                                        value={form.lembaga}
                                        onChange={(e) => setForm({ ...form, lembaga: e.target.value })}
                                        className="w-full px-3 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        placeholder="email@contoh.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-3 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium text-gray-700">Nomor WhatsApp</label>
                                    <input
                                        type="tel"
                                        placeholder="0812xxxx"
                                        value={form.whatsapp}
                                        onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                                        className="w-full px-3 py-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 font-medium text-gray-700">Pesan / Kebutuhan</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Jelaskan kebutuhan Anda..."
                                        value={form.pesan}
                                        onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                                        className="w-full px-3 py-3 border border-gray-200 rounded font-sans focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-pointer"
                                >
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
