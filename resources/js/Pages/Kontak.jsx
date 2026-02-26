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

    const contactInfo = [
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
            ),
            title: 'Alamat',
            detail: 'Jl. Pendidikan No. 123, Kelurahan Semangat, Jakarta Selatan, DKI Jakarta 12345',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            ),
            title: 'Telepon / WhatsApp',
            detail: '+62 812-2074-5064',
            link: 'tel:+6281220745064',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            ),
            title: 'Email',
            detail: 'info@kaffah-education.com',
            link: 'mailto:info@kaffah-education.com',
        },
    ];

    return (
        <GuestLayout>
            <Head title="Hubungi Kami" />

            <PageHeader
                title="Hubungi Kami"
                subtitle="Mari berdiskusi tentang bagaimana kami dapat membantu sekolah Anda berkembang."
            />

            {/* Contact Section */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">Kontak</span>
                                <h2 className="text-3xl font-bold text-primary-dark mb-4">Informasi Kontak</h2>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda mewujudkan sekolah berkualitas.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {contactInfo.map((item, i) => (
                                    <div key={i} className="flex gap-4 bg-warm-bg rounded-2xl p-5 hover:shadow-md transition-all duration-300">
                                        <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-primary-dark text-sm mb-1">{item.title}</h4>
                                            {item.link ? (
                                                <a href={item.link} className="text-gray-500 text-sm hover:text-accent transition-colors">{item.detail}</a>
                                            ) : (
                                                <p className="text-gray-500 text-sm">{item.detail}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4">
                                <h4 className="font-semibold text-primary-dark text-sm mb-4">Ikuti Kami</h4>
                                <div className="flex gap-3">
                                    {[
                                        { label: 'IG', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                                        { label: 'FB', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                                        { label: 'YT', path: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z' },
                                    ].map((s, j) => (
                                        <a key={j} href="#" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3 bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-primary/5 border border-gray-100">
                            <h3 className="text-xl font-bold text-primary-dark mb-2">Kirim Pesan</h3>
                            <p className="text-gray-500 text-sm mb-8">Isi formulir di bawah, kami akan merespons melalui WhatsApp.</p>

                            {submitted && (
                                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 flex items-center gap-3">
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Terima kasih! Pesan Anda telah kami terima.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Nama Lengkap *</label>
                                        <input
                                            type="text"
                                            placeholder="Nama Anda"
                                            value={form.nama}
                                            onChange={(e) => setForm({ ...form, nama: e.target.value })}
                                            className="w-full px-4 py-3 bg-warm-bg border border-gray-200 rounded-xl text-sm
                                                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Nama Lembaga</label>
                                        <input
                                            type="text"
                                            placeholder="Nama Sekolah"
                                            value={form.lembaga}
                                            onChange={(e) => setForm({ ...form, lembaga: e.target.value })}
                                            className="w-full px-4 py-3 bg-warm-bg border border-gray-200 rounded-xl text-sm
                                                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Email *</label>
                                        <input
                                            type="email"
                                            placeholder="email@contoh.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-warm-bg border border-gray-200 rounded-xl text-sm
                                                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Nomor WhatsApp *</label>
                                        <input
                                            type="tel"
                                            placeholder="0812xxxx"
                                            value={form.whatsapp}
                                            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                                            className="w-full px-4 py-3 bg-warm-bg border border-gray-200 rounded-xl text-sm
                                                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Pesan / Kebutuhan</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Jelaskan kebutuhan Anda..."
                                        value={form.pesan}
                                        onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                                        className="w-full px-4 py-3 bg-warm-bg border border-gray-200 rounded-xl text-sm font-sans
                                                   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl
                                               hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5
                                               transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    Kirim via WhatsApp
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
