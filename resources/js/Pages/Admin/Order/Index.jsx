import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { useState } from 'react';

export default function OrderIndex({ orders, statusCounts }) {
    const [search, setSearch] = useState('');
    const formatPrice = (num) => 'Rp ' + Number(num).toLocaleString('id-ID');

    const statusMap = {
        pending: { label: 'Pending', color: 'bg-amber-50 text-amber-700 border border-amber-200' },
        confirmed: { label: 'Dikonfirmasi', color: 'bg-blue-50 text-blue-700 border border-blue-200' },
        shipped: { label: 'Dikirim', color: 'bg-purple-50 text-purple-700 border border-purple-200' },
        completed: { label: 'Selesai', color: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
        cancelled: { label: 'Dibatalkan', color: 'bg-red-50 text-red-600 border border-red-200' },
    };

    const paymentStatusMap = {
        lunas: { label: 'Lunas', color: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
        hutang: { label: 'Hutang', color: 'bg-red-50 text-red-600 border border-red-200' },
    };

    const summaryCards = [
        { key: 'pending', label: 'Pending', count: statusCounts.pending, icon: '⏳', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700' },
        { key: 'confirmed', label: 'Dikonfirmasi', count: statusCounts.confirmed, icon: '✅', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700' },
        { key: 'shipped', label: 'Dikirim', count: statusCounts.shipped, icon: '🚚', bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700' },
        { key: 'completed', label: 'Selesai', count: statusCounts.completed, icon: '🎉', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700' },
        { key: 'cancelled', label: 'Dibatalkan', count: statusCounts.cancelled, icon: '❌', bg: 'bg-red-50 border-red-200', text: 'text-red-600' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/orders', { search }, { preserveState: true });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get('/admin/orders', {}, { preserveState: true });
    };

    return (
        <AdminLayout>
            <Head title="Kelola Pesanan — Admin KEP" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Pesanan</h2>
                    <p className="text-gray-400 text-sm mt-0.5">Kelola semua pesanan masuk dari customer</p>
                </div>
                <div className="text-sm text-gray-400">
                    {orders.length} pesanan
                </div>
            </div>

            {/* Status Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                {summaryCards.map((card) => (
                    <div key={card.key} className={`rounded-xl border p-4 ${card.bg}`}>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{card.icon}</span>
                            <span className={`text-xs font-semibold ${card.text}`}>{card.label}</span>
                        </div>
                        <div className={`text-2xl font-extrabold ${card.text}`}>{card.count}</div>
                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-4">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari invoice, nama customer, atau lembaga..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                    </div>
                    <button type="submit" className="px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors cursor-pointer">
                        Cari
                    </button>
                    {search && (
                        <button type="button" onClick={handleClearSearch} className="px-4 py-2.5 bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer">
                            Reset
                        </button>
                    )}
                </div>
            </form>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {orders.length === 0 ? (
                    <div className="p-16 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                        </div>
                        <p className="font-medium text-gray-500">Belum ada pesanan</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">No Invoice</th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Total</th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Pembayaran</th>
                                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tanggal</th>
                                <th className="text-right px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.map((order) => {
                                const st = statusMap[order.status] || statusMap.pending;
                                const ps = paymentStatusMap[order.payment_status] || paymentStatusMap.hutang;
                                return (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm font-semibold text-gray-800">{order.invoice_number}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-800">{order.customer_name}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{order.institution}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-gray-800">{formatPrice(order.grand_total)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-lg ${st.color}`}>
                                                {st.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-lg ${ps.color}`}>
                                                {ps.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">
                                            {new Date(order.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/orders/${order.id}`}
                                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors border border-primary/10"
                                            >
                                                Detail
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    );
}
