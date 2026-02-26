import { useState } from 'react';
import { router } from '@inertiajs/react';
import { useCart } from '../Context/CartContext';

export default function CartDrawer({ isOpen, onClose }) {
    const { cart, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ nama: '', lembaga: '', noHp: '', email: '', alamat: '' });
    const [submitting, setSubmitting] = useState(false);

    const formatPrice = (num) => 'Rp ' + num.toLocaleString('id-ID');

    const totalEksemplar = cart.reduce((sum, item) => sum + item.qty, 0);

    const handleCheckout = (e) => {
        e.preventDefault();
        if (cart.length === 0 || submitting) return;

        setSubmitting(true);

        router.post('/checkout', {
            customer_name: form.nama,
            institution: form.lembaga,
            phone: form.noHp,
            email: form.email,
            address: form.alamat,
            items: cart.map((item) => ({
                product_name: item.title,
                price: item.priceNum,
                quantity: item.qty,
            })),
        }, {
            onBefore: () => {
                // Clear cart before redirect — Inertia::location() navigates away
                clearCart();
            },
            onFinish: () => setSubmitting(false),
            onError: () => {
                // If error, don't clear (cart already cleared above, user can re-add)
                setSubmitting(false);
            },
        });
    };

    const handleClose = () => {
        setShowForm(false);
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-2000 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={handleClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-2001 shadow-2xl
                            flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
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
                            <p className="text-sm text-gray-500 mb-2">Isi data berikut untuk membuat invoice pesanan Anda.</p>

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
                                <label className="block mb-1.5 text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    placeholder="Contoh: email@gmail.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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
                                <div className="border-t border-gray-200 mt-3 pt-3 space-y-1.5">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal ({totalEksemplar} eksemplar)</span>
                                        <span className="font-medium">{formatPrice(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Ongkir (Rp 30rb / 2jt)</span>
                                        <span className="font-medium">{formatPrice(totalPrice > 0 ? Math.ceil(totalPrice / 2000000) * 30000 : 0)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                                        <span className="font-bold text-primary-dark">Total</span>
                                        <span className="font-bold text-primary-dark">{formatPrice(totalPrice + (totalPrice > 0 ? Math.ceil(totalPrice / 2000000) * 30000 : 0))}</span>
                                    </div>
                                </div>
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
                                disabled={submitting}
                                className="w-full py-4 bg-[#1A3C34] text-white font-bold rounded-xl text-lg
                                           flex items-center justify-center gap-3
                                           hover:bg-[#15322b] hover:-translate-y-0.5 hover:shadow-lg
                                           transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                🧾
                                {submitting ? 'Memproses...' : 'Buat Invoice'}
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowForm(true)}
                                className="w-full py-4 bg-[#1A3C34] text-white font-bold rounded-xl text-lg
                                           flex items-center justify-center gap-3
                                           hover:bg-[#15322b] hover:-translate-y-0.5 hover:shadow-lg
                                           transition-all duration-300 cursor-pointer"
                            >
                                🧾 Lanjutkan Checkout
                            </button>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
