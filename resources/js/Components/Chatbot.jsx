import { useState, useRef, useEffect } from 'react';

const FAQ_DATA = [
    {
        question: 'Apa itu Kaffah Education Partner?',
        answer: 'Kaffah Education Partner (KEP) adalah perusahaan yang bergerak di bidang pendidikan, menyediakan buku pembelajaran, modul, dan program pelatihan untuk meningkatkan kualitas pendidikan di Indonesia.',
    },
    {
        question: 'Buku apa saja yang tersedia?',
        answer: 'Kami menyediakan berbagai buku pembelajaran seperti Ayo Berhitung (A, B, C, D), Aku Membaca Tanpa Mengeja, Buku Menulis, Modul Literasi, dan Modul Numerasi. Silakan kunjungi halaman Buku & Modul untuk info lengkap.',
    },
    {
        question: 'Bagaimana cara memesan buku?',
        answer: 'Anda bisa memesan langsung melalui website kami:\n1. Buka halaman Buku & Modul\n2. Pilih buku dan masukkan ke keranjang\n3. Klik Checkout dan isi data pemesanan\n4. Pesanan akan diproses oleh tim kami',
    },
    {
        question: 'Berapa harga buku?',
        answer: 'Harga buku bervariasi mulai dari Rp 20.000 - Rp 25.000 per buku. Untuk pemesanan dalam jumlah besar, tersedia diskon khusus. Hubungi kami untuk penawaran terbaik!',
    },
    {
        question: 'Apakah ada program pelatihan?',
        answer: 'Ya! KEP menyediakan program pelatihan guru meliputi:\n• Pelatihan Literasi & Numerasi\n• Workshop Kurikulum Merdeka\n• Pendampingan Sekolah\n• Standar Mutu Sekolah\nKunjungi halaman Program untuk info lebih lanjut.',
    },
    {
        question: 'Bagaimana cara pembayaran?',
        answer: 'Pembayaran dapat dilakukan via:\n• Transfer Bank BRI (6313-0102-5486-539 a/n MOH SHORIH ALKHOLID)\n• Cash / Tunai\nKonfirmasi pembayaran ke: 0856-4625-2020',
    },
    {
        question: 'Berapa lama pengiriman?',
        answer: 'Pengiriman biasanya memakan waktu 2-5 hari kerja tergantung lokasi Anda. Ongkir akan diinformasikan setelah konfirmasi pesanan.',
    },
    {
        question: 'Bagaimana cara menghubungi KEP?',
        answer: 'Anda bisa menghubungi kami melalui:\n📱 WhatsApp: 0812-2074-5064\n📧 Email: kaffaofficial09@gmail.com\n📍 Lamongan, Jawa Timur\nAtau klik tombol WhatsApp hijau di pojok kanan bawah.',
    },
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Halo! 👋 Saya asisten virtual KEP. Ada yang bisa saya bantu? Pilih pertanyaan di bawah atau ketik pesan Anda.' },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const findAnswer = (query) => {
        const q = query.toLowerCase();
        // Simple keyword matching
        const keywords = [
            { keys: ['apa', 'kep', 'kaffah', 'tentang'], index: 0 },
            { keys: ['buku', 'tersedia', 'jenis', 'macam'], index: 1 },
            { keys: ['pesan', 'cara pesan', 'order', 'beli'], index: 2 },
            { keys: ['harga', 'biaya', 'berapa'], index: 3 },
            { keys: ['pelatihan', 'training', 'program', 'workshop'], index: 4 },
            { keys: ['bayar', 'pembayaran', 'transfer', 'rekening'], index: 5 },
            { keys: ['kirim', 'pengiriman', 'ongkir', 'lama'], index: 6 },
            { keys: ['hubungi', 'kontak', 'telepon', 'email', 'alamat', 'whatsapp'], index: 7 },
        ];

        for (const entry of keywords) {
            if (entry.keys.some(k => q.includes(k))) {
                return FAQ_DATA[entry.index].answer;
            }
        }

        return 'Maaf, saya belum bisa menjawab pertanyaan tersebut. 😅\nSilakan hubungi kami langsung via WhatsApp di 0812-2074-5064 untuk bantuan lebih lanjut.';
    };

    const sendMessage = (text) => {
        if (!text.trim()) return;
        const userMsg = { from: 'user', text: text.trim() };
        const botReply = { from: 'bot', text: findAnswer(text) };
        setMessages(prev => [...prev, userMsg, botReply]);
        setInput('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleQuickReply = (faq) => {
        const userMsg = { from: 'user', text: faq.question };
        const botReply = { from: 'bot', text: faq.answer };
        setMessages(prev => [...prev, userMsg, botReply]);
    };

    return (
        <div className="fixed bottom-8 left-8 z-[100]">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 left-0 w-[360px] max-h-[520px] bg-white rounded-2xl shadow-2xl shadow-black/15 border border-gray-200 flex flex-col overflow-hidden animate-slide-up">
                    {/* Header */}
                    <div className="bg-[#1A3C34] px-5 py-4 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Asisten KEP</p>
                                <p className="text-white/50 text-[10px]">Biasanya membalas instan</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50 min-h-[200px] max-h-[320px]">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.from === 'user'
                                        ? 'bg-[#1A3C34] text-white rounded-br-md'
                                        : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-md'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    <div className="px-4 py-2 bg-white border-t border-gray-100 flex-shrink-0">
                        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                            {FAQ_DATA.slice(0, 5).map((faq, i) => (
                                <button key={i} onClick={() => handleQuickReply(faq)}
                                    className="whitespace-nowrap px-3 py-1.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full hover:bg-[#1A3C34] hover:text-white transition-colors flex-shrink-0 cursor-pointer">
                                    {faq.question.length > 25 ? faq.question.slice(0, 25) + '…' : faq.question}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="px-4 py-3 bg-white border-t border-gray-100 flex gap-2 flex-shrink-0">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ketik pertanyaan..."
                            className="flex-1 px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1A3C34]/20 focus:border-[#1A3C34] outline-none transition-all"
                        />
                        <button type="submit"
                            className="bg-[#1A3C34] text-white px-3 py-2 rounded-xl hover:bg-[#0E2621] transition-colors cursor-pointer flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button onClick={() => setIsOpen(!isOpen)}
                className="group relative cursor-pointer">
                {!isOpen && <span className="absolute inset-0 rounded-full bg-[#1A3C34] animate-ping opacity-15"></span>}
                <div className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen
                        ? 'bg-gray-600 hover:bg-gray-700 shadow-gray-400/30'
                        : 'bg-[#1A3C34] hover:scale-110 shadow-[#1A3C34]/30 hover:shadow-xl hover:shadow-[#1A3C34]/40'
                    }`}>
                    {isOpen ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
                    )}
                </div>
            </button>
        </div>
    );
}
