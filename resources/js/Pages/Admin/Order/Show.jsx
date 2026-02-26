import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { useState } from 'react';

export default function Show({ order }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status,
        notes: order.notes || '',
        discount_percent: order.discount_percent || 0,
        shipping_cost: order.shipping_cost || 0,
    });

    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentData, setPaymentData] = useState({ method: 'Transfer', amount: '' });
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    const formatPrice = (num) => 'Rp ' + Number(num).toLocaleString('id-ID');
    const formatDate = (str) => new Date(str).toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Dikonfirmasi' },
        { value: 'shipped', label: 'Dikirim' },
        { value: 'completed', label: 'Selesai' },
        { value: 'cancelled', label: 'Dibatalkan' },
    ];

    const statusMap = {
        pending: 'bg-amber-50 text-amber-700 border border-amber-200',
        confirmed: 'bg-blue-50 text-blue-700 border border-blue-200',
        shipped: 'bg-purple-50 text-purple-700 border border-purple-200',
        completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        cancelled: 'bg-red-50 text-red-600 border border-red-200',
    };

    const handleUpdateStatus = (e) => {
        e.preventDefault();
        patch(`/admin/orders/${order.id}/status`, { preserveScroll: true });
    };

    const handlePayment = (e) => {
        e.preventDefault();
        setPaymentProcessing(true);
        router.post(`/admin/orders/${order.id}/payments`, paymentData, {
            preserveScroll: true,
            onSuccess: () => {
                setShowPaymentForm(false);
                setPaymentData({ method: 'Transfer BRI', amount: '' });
            },
            onFinish: () => setPaymentProcessing(false),
        });
    };

    const sisaTagihan = order.sisa_tagihan;

    return (
        <AdminLayout>
            <Head title={`Pesanan ${order.invoice_number} — Admin KEP`} />

            {/* Back + Title */}
            <div className="mb-6">
                <Link href="/admin/orders" className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-gray-600 transition-colors mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Kembali ke Daftar Pesanan
                </Link>
                <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-bold text-gray-800">{order.invoice_number}</h2>
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-lg ${statusMap[order.status] || ''}`}>
                        {statusOptions.find(s => s.value === order.status)?.label || order.status}
                    </span>
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-lg ${order.payment_status === 'lunas' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                        {order.payment_status === 'lunas' ? '💰 Lunas' : '⚠️ Hutang'}
                    </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{formatDate(order.created_at)}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                            Info Pemesan
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><p className="text-xs text-gray-400 mb-0.5">NAMA</p><p className="font-semibold text-gray-800">{order.customer_name}</p></div>
                            <div><p className="text-xs text-gray-400 mb-0.5">LEMBAGA</p><p className="font-semibold text-gray-800">{order.institution}</p></div>
                            <div><p className="text-xs text-gray-400 mb-0.5">NO HP / WHATSAPP</p><p className="font-semibold text-gray-800">{order.phone}</p></div>
                            <div><p className="text-xs text-gray-400 mb-0.5">EMAIL</p><p className="font-semibold text-gray-800">{order.email || '-'}</p></div>
                        </div>
                        <div className="mt-4"><p className="text-xs text-gray-400 mb-0.5">ALAMAT PENGIRIMAN</p><p className="font-semibold text-gray-800">{order.address}</p></div>
                    </div>

                    {/* Items */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                            Item Pesanan
                        </h3>
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-gray-100">
                                <th className="text-left py-2 text-xs font-semibold text-gray-400">PRODUK</th>
                                <th className="text-center py-2 text-xs font-semibold text-gray-400">QTY</th>
                                <th className="text-right py-2 text-xs font-semibold text-gray-400">HARGA</th>
                                <th className="text-right py-2 text-xs font-semibold text-gray-400">SUBTOTAL</th>
                            </tr></thead>
                            <tbody>
                                {order.items.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-50">
                                        <td className="py-3 font-medium text-gray-800">{item.product_name}</td>
                                        <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                                        <td className="py-3 text-right text-gray-600">{formatPrice(item.price)}</td>
                                        <td className="py-3 text-right font-semibold text-gray-800">{formatPrice(item.price * item.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Totals */}
                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="font-semibold">{formatPrice(order.subtotal)}</span></div>
                            {order.discount_percent > 0 && (
                                <div className="flex justify-between text-sm"><span className="text-gray-500">Diskon {order.discount_percent}%</span><span className="font-semibold text-green-600">- {formatPrice(Math.round(order.subtotal * order.discount_percent / 100))}</span></div>
                            )}
                            <div className="flex justify-between text-sm"><span className="text-gray-500">Ongkir</span><span className="font-semibold">{formatPrice(order.shipping_cost)}</span></div>
                            <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-100"><span>Grand Total</span><span className="text-primary">{formatPrice(order.grand_total)}</span></div>
                            <div className="flex justify-between text-base font-bold"><span>Total Dibayar</span><span className="text-emerald-600">{formatPrice(order.total_paid)}</span></div>
                            <div className={`flex justify-between text-lg font-extrabold pt-2 border-t border-gray-200 ${sisaTagihan > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                <span>Sisa Tagihan</span>
                                <span>{formatPrice(sisaTagihan)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Log */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
                                Log Pembayaran
                            </h3>
                            {sisaTagihan > 0 && (
                                <button
                                    onClick={() => setShowPaymentForm(!showPaymentForm)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                    Bayar Tagihan
                                </button>
                            )}
                        </div>

                        {/* Payment Form */}
                        {showPaymentForm && (
                            <form onSubmit={handlePayment} className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4 space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Metode Pembayaran</label>
                                        <select
                                            value={paymentData.method}
                                            onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                        >
                                            <option value="Transfer">Transfer</option>
                                            <option value="Cash">Cash / Tunai</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Jumlah Bayar (Rp)</label>
                                        <input
                                            type="number"
                                            value={paymentData.amount}
                                            onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                                            placeholder={`Max: ${sisaTagihan.toLocaleString('id-ID')}`}
                                            max={sisaTagihan}
                                            min={1}
                                            required
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button type="submit" disabled={paymentProcessing} className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-50">
                                        {paymentProcessing ? 'Menyimpan...' : 'Simpan Pembayaran'}
                                    </button>
                                    <button type="button" onClick={() => setShowPaymentForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
                                        Batal
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Payment History Table */}
                        {order.payments && order.payments.length > 0 ? (
                            <table className="w-full text-sm">
                                <thead><tr className="border-b border-gray-100">
                                    <th className="text-left py-2 text-xs font-semibold text-gray-400">TANGGAL</th>
                                    <th className="text-left py-2 text-xs font-semibold text-gray-400">METODE</th>
                                    <th className="text-right py-2 text-xs font-semibold text-gray-400">JUMLAH</th>
                                </tr></thead>
                                <tbody>
                                    {order.payments.map((p) => (
                                        <tr key={p.id} className="border-b border-gray-50">
                                            <td className="py-3 text-gray-600">{new Date(p.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                                            <td className="py-3 font-medium text-gray-800">{p.method}</td>
                                            <td className="py-3 text-right font-semibold text-emerald-600">{formatPrice(p.amount)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-sm text-gray-400 text-center py-4">Belum ada pembayaran</p>
                        )}
                    </div>
                </div>

                {/* Right Column — Update Status */}
                <div className="space-y-6">
                    <form onSubmit={handleUpdateStatus} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                            Update Status & Biaya
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Status Pesanan</label>
                                <select value={data.status} onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
                                    {statusOptions.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Diskon (%)</label>
                                    <input type="number" value={data.discount_percent} onChange={(e) => setData('discount_percent', e.target.value)} min="0" max="100"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Ongkir (Rp)</label>
                                    <input type="number" value={data.shipping_cost} onChange={(e) => setData('shipping_cost', e.target.value)} min="0"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Catatan Internal</label>
                                <textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows="3" placeholder="Catatan untuk admin..."
                                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm resize-y" />
                            </div>
                            <button type="submit" disabled={processing}
                                className="w-full px-4 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 text-sm"
                                style={{ cursor: 'pointer', border: 'none', appearance: 'none' }}>
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>

                    {/* Actions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Aksi</h3>
                        <div className="space-y-2">
                            <a href={`/admin/invoice/${order.invoice_number}`} target="_blank"
                                className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                                Lihat Invoice
                            </a>
                            <a href={`https://wa.me/${order.phone?.replace(/\D/g, '')}`} target="_blank"
                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white text-sm font-medium rounded-xl hover:bg-[#1da851] transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
                                Hubungi via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
