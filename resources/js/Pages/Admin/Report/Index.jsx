import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { useRef, useState } from 'react';

export default function ReportIndex({ orders, filter, month, summary }) {
    const formatPrice = (num) => 'Rp ' + Number(num).toLocaleString('id-ID');
    const printRef = useRef();
    const [activeTab, setActiveTab] = useState('invoice'); // 'invoice' | 'buku'

    const paymentStatusMap = {
        lunas: { label: 'Lunas', color: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
        hutang: { label: 'Hutang', color: 'bg-red-50 text-red-600 border border-red-200' },
    };

    const handleFilter = (f) => {
        router.get('/admin/reports', { filter: f, month }, { preserveState: true });
    };

    const handleMonth = (m) => {
        router.get('/admin/reports', { filter, month: m }, { preserveState: true });
    };

    const monthLabel = month ? new Date(month + '-01').toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) : '';
    const filterLabel = filter === 'hutang' ? 'Hutang' : filter === 'lunas' ? 'Lunas' : 'Semua';

    const totalGrand = orders.reduce((s, o) => s + o.grand_total, 0);
    const totalPaid = orders.reduce((s, o) => s + o.total_paid, 0);
    const totalSisa = orders.reduce((s, o) => s + o.sisa_tagihan, 0);

    // Aggregate book items
    const bookSummary = {};
    orders.forEach(order => {
        (order.items || []).forEach(item => {
            const key = item.product_name;
            if (!bookSummary[key]) bookSummary[key] = { name: item.product_name, qty: 0, total: 0 };
            bookSummary[key].qty += item.quantity;
            bookSummary[key].total += item.price * item.quantity;
        });
    });
    const bookList = Object.values(bookSummary).sort((a, b) => b.qty - a.qty);

    // --- Export Functions ---
    const handlePrintPDF = () => {
        window.print();
    };

    const handleExportExcel = () => {
        let csv = '\uFEFF'; // UTF-8 BOM for Excel compatibility

        // Sheet 1: Rekap Buku
        csv += 'REKAP JENIS BUKU DIPESAN\n';
        csv += `Periode: ${monthLabel} | Filter: ${filterLabel}\n\n`;
        csv += 'No,Nama Buku,Total Kuantitas,Total Nilai\n';
        bookList.forEach((book, i) => {
            csv += `${i + 1},"${book.name}",${book.qty},${book.total}\n`;
        });
        csv += `,"TOTAL",${bookList.reduce((s, b) => s + b.qty, 0)},${bookList.reduce((s, b) => s + b.total, 0)}\n`;

        csv += '\n\n';

        // Sheet 2: Daftar Invoice
        csv += 'DAFTAR INVOICE\n\n';
        csv += 'No Invoice,Customer,Lembaga,Buku Dipesan,Qty,Grand Total,Dibayar,Sisa,Status,Tanggal\n';
        orders.forEach(order => {
            const items = (order.items || []);
            const bukuStr = items.map(i => `${i.product_name} (x${i.quantity})`).join('; ');
            const totalQty = items.reduce((s, i) => s + i.quantity, 0);
            const date = new Date(order.created_at).toLocaleDateString('id-ID');
            csv += `"${order.invoice_number}","${order.customer_name}","${order.institution}","${bukuStr}",${totalQty},${order.grand_total},${order.total_paid},${order.sisa_tagihan},"${order.payment_status === 'lunas' ? 'Lunas' : 'Hutang'}","${date}"\n`;
        });
        csv += `,"TOTAL (${orders.length} transaksi)",,,,${totalGrand},${totalPaid},${totalSisa},,\n`;

        // Download
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `laporan_${month}_${filterLabel.toLowerCase()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <AdminLayout>
            <Head title="Laporan — Admin KEP" />

            {/* Print Styles */}
            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    .print-area, .print-area * { visibility: visible; }
                    .print-area { position: absolute; left: 0; top: 0; width: 100%; padding: 16px; font-size: 11px; }
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    table { font-size: 10px; }
                    th, td { padding: 4px 8px !important; }
                }
                .print-only { display: none; }
            `}</style>

            {/* Header */}
            <div className="flex items-center justify-between mb-5 no-print">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Laporan</h2>
                    <p className="text-gray-400 text-sm mt-0.5">Rekap invoice dan status pembayaran</p>
                </div>
            </div>

            {/* Filters + Export */}
            <div className="flex flex-wrap items-center gap-3 mb-5 no-print">
                <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-gray-500">Bulan:</label>
                    <input type="month" value={month} onChange={(e) => handleMonth(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>

                <div className="flex gap-2">
                    {[
                        { key: 'all', label: 'Semua', count: summary.total, active: 'bg-gray-800 text-white border-gray-800', idle: 'bg-white border-gray-200 text-gray-600 hover:border-gray-400' },
                        { key: 'hutang', label: 'Hutang', count: summary.hutang, active: 'bg-red-600 text-white border-red-600', idle: 'bg-red-50 border-red-200 text-red-700 hover:border-red-400' },
                        { key: 'lunas', label: 'Lunas', count: summary.lunas, active: 'bg-emerald-600 text-white border-emerald-600', idle: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-400' },
                    ].map(f => (
                        <button key={f.key} onClick={() => handleFilter(f.key)}
                            className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${filter === f.key ? f.active : f.idle}`}>
                            {f.label} ({f.count})
                        </button>
                    ))}
                </div>

                <div className="ml-auto flex gap-2">
                    <button onClick={handlePrintPDF}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-800 text-white text-xs font-semibold rounded-xl hover:bg-black transition-colors cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 12h.008v.008h-.008V12z" /></svg>
                        PDF
                    </button>
                    <button onClick={handleExportExcel}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                        Excel
                    </button>
                </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-1 mb-4 no-print">
                <button onClick={() => setActiveTab('invoice')}
                    className={`px-4 py-2 text-xs font-semibold rounded-t-xl border border-b-0 transition-all cursor-pointer ${activeTab === 'invoice' ? 'bg-white text-gray-800 border-gray-200' : 'bg-gray-100 text-gray-400 border-transparent hover:text-gray-600'}`}>
                    📋 Daftar Invoice
                </button>
                <button onClick={() => setActiveTab('buku')}
                    className={`px-4 py-2 text-xs font-semibold rounded-t-xl border border-b-0 transition-all cursor-pointer ${activeTab === 'buku' ? 'bg-white text-gray-800 border-gray-200' : 'bg-gray-100 text-gray-400 border-transparent hover:text-gray-600'}`}>
                    📚 Rekap Buku
                </button>
            </div>

            {/* Printable Area */}
            <div className="print-area" ref={printRef}>
                {/* Print Header */}
                <div className="print-only mb-4 text-center">
                    <h1 className="text-lg font-bold">LAPORAN TRANSAKSI — KAFFAH EDUCATION PARTNER</h1>
                    <p className="text-xs text-gray-500">Periode: {monthLabel} | Filter: {filterLabel}</p>
                </div>

                {/* Tab: Invoice List */}
                {(activeTab === 'invoice') && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                        {orders.length === 0 ? (
                            <div className="p-12 text-center text-gray-400">Tidak ada data untuk filter ini.</div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Invoice</th>
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Customer</th>
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase min-w-[180px]">Buku Dipesan</th>
                                        <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Total</th>
                                        <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Bayar</th>
                                        <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Sisa</th>
                                        <th className="text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Status</th>
                                        <th className="text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Tgl</th>
                                        <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase no-print">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {orders.map((order) => {
                                        const ps = paymentStatusMap[order.payment_status] || paymentStatusMap.hutang;
                                        const items = order.items || [];
                                        return (
                                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors align-top">
                                                <td className="px-4 py-3">
                                                    <span className="font-mono text-xs font-semibold text-gray-800 leading-tight block">{order.invoice_number}</span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <p className="text-xs font-medium text-gray-800">{order.customer_name}</p>
                                                    <p className="text-[10px] text-gray-400">{order.institution}</p>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-wrap gap-1">
                                                        {items.map((item, i) => (
                                                            <span key={i} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                                                                {item.product_name}
                                                                <span className="bg-primary/15 text-primary font-bold px-1 rounded-full text-[9px]">×{item.quantity}</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-right text-xs font-semibold whitespace-nowrap">{formatPrice(order.grand_total)}</td>
                                                <td className="px-4 py-3 text-right text-xs font-semibold text-emerald-600 whitespace-nowrap">{formatPrice(order.total_paid)}</td>
                                                <td className={`px-4 py-3 text-right text-xs font-bold whitespace-nowrap ${order.sisa_tagihan > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatPrice(order.sisa_tagihan)}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-md ${ps.color}`}>{ps.label}</span>
                                                </td>
                                                <td className="px-4 py-3 text-center text-[10px] text-gray-400 whitespace-nowrap">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                                                <td className="px-4 py-3 text-right no-print">
                                                    <a href={`/admin/invoice/${order.invoice_number}`} target="_blank"
                                                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                                                        Cetak
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-gray-200 bg-gray-50 font-bold">
                                        <td colSpan="3" className="px-4 py-3 text-xs text-gray-700">TOTAL ({orders.length} transaksi)</td>
                                        <td className="px-4 py-3 text-right text-xs">{formatPrice(totalGrand)}</td>
                                        <td className="px-4 py-3 text-right text-xs text-emerald-600">{formatPrice(totalPaid)}</td>
                                        <td className={`px-4 py-3 text-right text-xs font-bold ${totalSisa > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatPrice(totalSisa)}</td>
                                        <td colSpan="3"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        )}
                    </div>
                )}

                {/* Tab: Book Summary */}
                {(activeTab === 'buku') && bookList.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase w-12">No</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase">Nama Buku</th>
                                    <th className="text-center px-5 py-3 text-xs font-semibold text-gray-400 uppercase">Total Kuantitas</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase">Total Nilai</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {bookList.map((book, idx) => (
                                    <tr key={book.name} className="hover:bg-gray-50/50">
                                        <td className="px-5 py-3 text-sm text-gray-400">{idx + 1}</td>
                                        <td className="px-5 py-3 text-sm font-medium text-gray-800">{book.name}</td>
                                        <td className="px-5 py-3 text-sm text-center">
                                            <span className="bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-lg">{book.qty}</span>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-right font-semibold">{formatPrice(book.total)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t-2 border-gray-200 bg-gray-50 font-bold">
                                    <td colSpan="2" className="px-5 py-3 text-sm text-gray-700">TOTAL</td>
                                    <td className="px-5 py-3 text-sm text-center">
                                        <span className="bg-primary/15 text-primary font-bold px-2.5 py-1 rounded-lg">{bookList.reduce((s, b) => s + b.qty, 0)}</span>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-right">{formatPrice(bookList.reduce((s, b) => s + b.total, 0))}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
