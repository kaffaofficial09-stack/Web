import { useState } from 'react';
import { useCart } from '../Context/CartContext';

export default function CartDrawer({ isOpen, onClose }) {
    const { cart, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ nama: '', lembaga: '', noHp: '', alamat: '' });

    const formatPrice = (num) => 'Rp ' + num.toLocaleString('id-ID');

    const totalEksemplar = cart.reduce((sum, item) => sum + item.qty, 0);

    const handleCheckout = (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        let message = `*Kaffah Education Partner*\n\n`;
        message += `*Konfirmasi Order*\n`;
        message += `* Pemesan : ${form.nama} (${form.lembaga})\n`;
        message += `Buku:\n`;

        cart.forEach((item) => {
            const subtotal = item.priceNum * item.qty;
            message += `* ${item.title} = ${item.qty} eksemplar x ${item.priceNum.toLocaleString('id-ID')} = ${formatPrice(subtotal)}\n`;
        });

        message += `* Jumlah: ${totalEksemplar} eksemplar\n`;
        message += `* Belum termasuk ongkir\n\n`;

        message += `* Total barang: ${formatPrice(totalPrice)}\n\n`;

        message += `*Alamat pengiriman:*\n`;
        message += `* Nama: a.n ${form.nama}\n`;
        message += `* No HP: ${form.noHp}\n`;
        message += `* Alamat: ${form.alamat}\n\n`;

        message += `Mohon konfirmasi ketersediaan dan info pembayaran. Terima kasih!`;

        const waUrl = `https://wa.me/6281220745064?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    };

    const handleClose = () => {
        setShowForm(false);
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-2000 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={handleClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-2001 shadow-2xl
                            flex flex-col transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        {showForm ? (
                            <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
                                ←
                            </button>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                        )}
                        <h2 className="text-xl font-bold text-primary-dark">
                            {showForm ? 'Data Pemesan' : 'Keranjang'}
                        </h2>
                        {!showForm && totalItems > 0 && (
                            <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {showForm ? (
                        /* Checkout Form */
                        <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                            <p className="text-sm text-gray-500 mb-2">Isi data berikut untuk konfirmasi order via WhatsApp.</p>

                            <div>
                                <label className="block mb-1.5 text-sm font-medium text-gray-700">Nama Pemesan *</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Bu Sunifah"
                                    value={form.nama}
                                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                                    className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1.5 text-sm font-medium text-gray-700">Nama Lembaga / Sekolah *</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: SD Al-Azhaar Bandung, Tulungagung"
                                    value={form.lembaga}
                                    onChange={(e) => setForm({ ...form, lembaga: e.target.value })}
                                    className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1.5 text-sm font-medium text-gray-700">No HP / WhatsApp *</label>
                                <input
                                    type="tel"
                                    placeholder="Contoh: +62 856-xxxx-xxxx"
                                    value={form.noHp}
                                    onChange={(e) => setForm({ ...form, noHp: e.target.value })}
                                    className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1.5 text-sm font-medium text-gray-700">Alamat Pengiriman *</label>
                                <textarea
                                    rows="3"
                                    placeholder="Alamat lengkap untuk pengiriman..."
                                    value={form.alamat}
                                    onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                                    className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    required
                                ></textarea>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gray-50 rounded-xl p-4 mt-4">
                                <h4 className="font-semibold text-sm text-primary-dark mb-3">Ringkasan Pesanan</h4>
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>{item.title} x{item.qty}</span>
                                        <span className="font-medium">{formatPrice(item.priceNum * item.qty)}</span>
                                    </div>
                                ))}
                                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
                                    <span className="font-bold text-primary-dark">Total ({totalEksemplar} eksemplar)</span>
                                    <span className="font-bold text-primary-dark">{formatPrice(totalPrice)}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 italic">* Belum termasuk ongkir</p>
                            </div>
                        </form>
                    ) : (
                        /* Cart Items */
                        cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="text-7xl mb-4 opacity-30">🛒</div>
                                <h3 className="text-lg font-semibold text-gray-400 mb-2">Keranjang Kosong</h3>
                                <p className="text-gray-400 text-sm">Tambahkan buku atau modul dari katalog kami.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                                        {/* Thumbnail */}
                                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-3xl">{item.emoji}</span>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-primary-dark text-sm leading-snug truncate">{item.title}</h4>
                                            <p className="text-accent font-bold text-sm mt-1">{formatPrice(item.priceNum)}</p>

                                            <div className="flex items-center justify-between mt-2">
                                                {/* Qty controls */}
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => item.qty <= 1 ? removeItem(item.id) : updateQty(item.id, item.qty - 1)}
                                                        className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer transition-colors"
                                                    >
                                                        {item.qty <= 1 ? '🗑' : '−'}
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                                                    <button
                                                        onClick={() => updateQty(item.id, item.qty + 1)}
                                                        className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Subtotal */}
                                                <span className="text-sm font-bold text-primary-dark">
                                                    {formatPrice(item.priceNum * item.qty)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Clear cart */}
                                <button
                                    onClick={clearCart}
                                    className="w-full text-center text-sm text-red-500 hover:text-red-700 py-2 cursor-pointer transition-colors"
                                >
                                    Kosongkan Keranjang
                                </button>
                            </div>
                        )
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="border-t border-gray-100 p-6 space-y-4">
                        {!showForm && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Total ({totalItems} item)</span>
                                <span className="text-2xl font-extrabold text-primary-dark">{formatPrice(totalPrice)}</span>
                            </div>
                        )}
                        {showForm ? (
                            <button
                                type="submit"
                                form="checkout-form"
                                className="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl text-lg
                                           flex items-center justify-center gap-3
                                           hover:bg-[#1da851] hover:-translate-y-0.5 hover:shadow-lg
                                           transition-all duration-300 cursor-pointer"
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Kirim Order via WhatsApp
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowForm(true)}
                                className="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl text-lg
                                           flex items-center justify-center gap-3
                                           hover:bg-[#1da851] hover:-translate-y-0.5 hover:shadow-lg
                                           transition-all duration-300 cursor-pointer"
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Checkout via WhatsApp
                            </button>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
